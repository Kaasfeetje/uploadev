import { Button } from "@/components/ui/button";

const LandingHero = () => {
  return (
    <section className="bg-gradient-to-br from-black to-gray-900 py-20 text-center text-white">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="mb-4 text-5xl font-bold">🚀 uploadev</h1>
        <p className="mb-6 text-xl">
          The easiest way to add uploads to your app. Auth, keys, API, S3, and
          dashboard – all in one.
        </p>
        <Button variant="secondary" className="px-6 py-4 text-lg">
          Get Early Access
        </Button>
      </div>
    </section>
  );
};

export default LandingHero;
