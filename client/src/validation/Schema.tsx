import { z } from "zod";

export const LSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});

export type LType = z.infer<typeof LSchema>;


