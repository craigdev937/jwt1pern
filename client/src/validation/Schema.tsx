import { z } from "zod";

export const RSchema = z.object({
    first: z.string().min(2),
    last: z.string().min(2),
    email: z.email(),
    password: z.string().min(6)
});

export type RType = z.infer<typeof RSchema>;

export const LSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});

export type LType = z.infer<typeof LSchema>;


