"use client";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import DataTable from "./DataTable";
import { columns } from "./FileColumns";

const Files = () => {
  const { id } = useParams<{ id: string }>();
  const [files] = api.files.getMany.useSuspenseQuery({ projectId: id });

  return (
    <div className="">
      <DataTable columns={columns} data={files} />
    </div>
  );
};

export default Files;
