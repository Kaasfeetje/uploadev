"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";

const Projects = () => {
  const [data] = api.project.getMany.useSuspenseQuery();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-gray-900">Projects</h1>
      </header>

      {/* Projects List Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/projects/new">
          <Button className="rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-md transition-all hover:bg-indigo-700">
            Create New Project
          </Button>
        </Link>
        {data && data.length > 0 ? (
          data.map((project) => (
            <div
              key={project.id}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
            >
              <Link href={`/dashboard/projects/${project.id}`}>
                <h2 className="mb-2 text-xl font-medium text-gray-800">
                  {project.name}
                </h2>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No projects available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
