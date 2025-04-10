import { projects, users } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { zProjectSchema } from "@/lib/validation";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(zProjectSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.clerkId, ctx.auth.userId));
      if (!user[0]) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Could not find user.",
        });
      }
      const [newProject] = await ctx.db
        .insert(projects)
        .values({
          name: input.name,
          userId: user[0].id,
        })
        .returning();

      return newProject;
    }),
  getMany: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(projects);
  }),
  delete: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(projects).where(eq(projects.id, input.projectId));
      return { projectId: input.projectId };
    }),
});
