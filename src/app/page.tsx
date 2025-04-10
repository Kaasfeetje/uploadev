import AuthButton from "@/modules/auth/ui/AuthButton";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main>
        <AuthButton />
      </main>
    </HydrateClient>
  );
}
