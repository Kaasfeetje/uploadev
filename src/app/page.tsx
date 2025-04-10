import AuthButton from "@/modules/auth/ui/AuthButton";
import CallToAction from "@/modules/home/ui/CallToAction";
import FeaturesSection from "@/modules/home/ui/FeaturesSection";
import Footer from "@/modules/home/ui/Footer";
import LandingHero from "@/modules/home/ui/LandingHero";
import Navbar from "@/modules/home/ui/Navbar";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <Navbar />
      <main>
        <LandingHero />
        <FeaturesSection />
        <CallToAction />
      </main>
      <Footer />
    </HydrateClient>
  );
}
