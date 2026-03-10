import { z } from "zod";

export const USchema = z.object({
    first: z.string().min(2),
    last: z.string().min(2),
    email: z.email(),
    password: z.string().min(6)
});

export type UType = z.infer<typeof USchema>;


