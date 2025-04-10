import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CallToAction = () => {
  return (
    <div>
      <section className="bg-gray-100 py-20 text-center">
        <div className="container mx-auto max-w-xl px-4">
          <h2 className="mb-4 text-3xl font-bold">Join the beta</h2>
          <p className="mb-6 text-gray-600">
            Be the first to try uploadev and get early access to new features.
          </p>
          <div className="flex justify-center gap-2">
            <Input placeholder="you@example.com" className="max-w-xs" />
            <Button>Request Access</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
