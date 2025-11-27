import { z } from "zod";

export const agentsInsertSchema = z.object({
  name: z
    .string()
    .trim() // Removes whitespace from start/end
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name cannot exceed 100 characters" }), // Database safety
    
  instructions: z
    .string()
    .trim()
    .min(10, { message: "Instruction must be at least 10 characters" }) // Enforce quality input
    .max(2000, { message: "Instruction is too long" }),
});

