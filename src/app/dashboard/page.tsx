import Projects from "@/modules/dashboard/ui/Projects";
import Footer from "@/modules/home/ui/Footer";
import Navbar from "@/modules/home/ui/Navbar";
import { api, HydrateClient } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();

  void api.project.getMany.prefetch();

  if (!userId) return redirectToSignIn();

  return (
    <HydrateClient>
      <Navbar />
      <main>
        <Projects />
      </main>
      <Footer />
    </HydrateClient>
  );
}
