import { files } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const fileRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(files)
        .where(eq(files.projectId, input.projectId));
    }),
});
