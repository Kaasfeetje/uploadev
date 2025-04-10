import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;

    switch (eventType) {
      case "user.created":
        {
          const { data } = evt;
          const email = data.email_addresses[0]?.email_address ?? "";
          await db.insert(users).values({
            clerkId: data.id,
            email,
            imageUrl: data.image_url,
          });
        }
        break;
      case "user.updated":
        {
          const { data } = evt;
          const email = data.email_addresses[0]?.email_address ?? "";
          await db
            .update(users)
            .set({
              email,
              imageUrl: data.image_url,
            })
            .where(eq(users.clerkId, data.id));
        }
        break;
      case "user.deleted":
        {
          const { data } = evt;
          if (!data.id) {
            return new Response("Missing user id", { status: 400 });
          }
          await db.delete(users).where(eq(users.clerkId, data.id));
        }
        break;
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
