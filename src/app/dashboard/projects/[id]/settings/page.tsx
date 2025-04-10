import DeleteProjectButton from "@/modules/dashboard/ui/projects/settings/DeleteProjectButton";
import { api, HydrateClient } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();

  void api.project.getMany.prefetch();

  if (!userId) return redirectToSignIn();

  return (
    <HydrateClient>
      <h1>Project page settings</h1>

      <DeleteProjectButton />
    </HydrateClient>
  );
}
