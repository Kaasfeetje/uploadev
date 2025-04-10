"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zProjectSchema } from "@/lib/validation";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: string;
}

const ProjectForm = () => {
  const router = useRouter();
  const utils = api.useUtils();
  const createProjectMutation = api.project.create.useMutation({
    onSuccess: (data) => {
      void utils.project.getMany.invalidate();
      router.push(`/dashboard/projects/${data?.id}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(zProjectSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    createProjectMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg border bg-white p-6 shadow-lg"
      >
        <h1 className="mb-4 text-2xl font-semibold">Create Project</h1>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name
          </label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Enter project name"
            className="mt-2"
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <Button type="submit" className="mt-4 w-full">
          Create Project
        </Button>
      </form>
    </div>
  );
};

export default ProjectForm;
