import { api, HydrateClient } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();

  void api.project.getMany.prefetch();

  if (!userId) return redirectToSignIn();

  return (
    <HydrateClient>
      <h1>Project page</h1>
    </HydrateClient>
  );
}
