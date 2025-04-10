import { z } from "zod";

export const zProjectSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Project name must be at least 3 characters long" })
    .regex(/^[a-zA-Z0-9 ]*$/, {
      message: "Project name must only contain letters, numbers, and spaces",
    })
    .nonempty({ message: "Project name is required" }),
});
