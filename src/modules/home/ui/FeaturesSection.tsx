const features = [
  {
    title: "🔐 API Keys & Auth",
    description:
      "Every project gets secure public/secret keys and isolated uploads.",
  },
  {
    title: "☁️ Presigned Uploads",
    description:
      "Use our API to generate signed URLs and upload directly to S3 or R2.",
  },
  {
    title: "📊 Admin Dashboard",
    description: "View uploads, manage settings, regenerate keys, and more.",
  },
  {
    title: "🧩 Dev SDK & Examples",
    description: "Use our UploadButton or drop in cURL, fetch, or tRPC.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white py-16 text-black">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-10 text-center text-3xl font-bold">Why uploadev?</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature, idx) => (
            <div key={idx} className="rounded-lg border p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
