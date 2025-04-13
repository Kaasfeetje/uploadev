import { HydrateClient } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { UploadFile } from "uploadev-npm";

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <HydrateClient>
      <h1>Project page</h1>
      <UploadFile />
    </HydrateClient>
  );
}
