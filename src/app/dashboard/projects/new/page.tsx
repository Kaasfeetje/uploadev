import ProjectForm from "@/modules/dashboard/ui/ProjectForm";
import Footer from "@/modules/home/ui/Footer";
import Navbar from "@/modules/home/ui/Navbar";
import { HydrateClient } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <HydrateClient>
      <Navbar />
      <main>
        <ProjectForm />
      </main>
      <Footer />
    </HydrateClient>
  );
}
