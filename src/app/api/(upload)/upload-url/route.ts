// pages/api/upload-url.ts
import { env } from "@/env";
import { db } from "@/server/db";
import { apiKeys, files, projects } from "@/server/db/schema";
import {
  PutObjectCommand,
  S3Client,
  type S3ClientConfigType,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const config = {
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
} satisfies S3ClientConfigType;

const s3 = new S3Client(config);

// Validation schema
const bodySchema = z.object({
  filename: z.string(),
  contentType: z.string(),
  size: z.number(),
});

export async function POST(req: NextRequest) {
  try {
    // TODO: extract this to middleware
    const apiKeyHeader = req.headers.get("x-api-key");
    if (!apiKeyHeader) {
      return NextResponse.json({ error: "Missing API key" }, { status: 401 });
    }

    const apiKey = (
      await db.select().from(apiKeys).where(eq(apiKeys.key, apiKeyHeader))
    )[0];

    if (!apiKey) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    const project = (
      await db.select().from(projects).where(eq(projects.apiKeyId, apiKey.id))
    )[0];

    if (!project) {
      return NextResponse.json(
        { error: "Could not find project" },
        { status: 400 },
      );
    }

    const parsed = bodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.format() },
        { status: 400 },
      );
    }

    const { filename, contentType, size } = parsed.data;
    const key = `uploads/${project.id}/${Date.now()}_${filename}`;

    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

    await db.insert(files).values({
      contentType,
      filename,
      key,
      projectId: project.id,
      size,
    });

    return NextResponse.json({ url, key });
  } catch (err) {
    console.error("Upload URL Error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
