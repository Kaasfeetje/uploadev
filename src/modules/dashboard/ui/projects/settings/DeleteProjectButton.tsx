"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";

const DeleteProjectButton = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const utils = api.useUtils();
  router.prefetch("/dashboard");
  const deleteProjectMutation = api.project.delete.useMutation({
    onSuccess: () => {
      void utils.project.getMany.invalidate();
      router.push(`/dashboard`);
    },
  });

  return (
    <Button
      variant="link"
      className="w-fit cursor-pointer text-red-500"
      onClick={() => deleteProjectMutation.mutate({ projectId: id })}
    >
      Delete project
    </Button>
  );
};

export default DeleteProjectButton;
