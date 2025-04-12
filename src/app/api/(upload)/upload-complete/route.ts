import { db } from "@/server/db";
import { apiKeys, files, projects } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

// Validation schema
const bodySchema = z.object({
  key: z.string(),
});

export async function PUT(req: NextRequest) {
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

  const { key } = parsed.data;

  // Save file to database
  await db.update(files).set({ status: "success" }).where(eq(files.key, key));

  return NextResponse.json({ message: "Completed upload" }, { status: 200 });
}
