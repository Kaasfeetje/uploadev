import Files from "@/modules/dashboard/ui/data/Files";
import { api, HydrateClient } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Home({ params }: Props) {
  const { userId, redirectToSignIn } = await auth();
  const { id } = await params;

  void api.files.getMany.prefetch({ projectId: id });

  if (!userId) return redirectToSignIn();

  return (
    <HydrateClient>
      <h1>Project data</h1>
      <Files />
    </HydrateClient>
  );
}
