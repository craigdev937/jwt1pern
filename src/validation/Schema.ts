import { z } from "zod";

export const RSchema = z.object({
    first: z.string().trim().min(1).max(100, {
        message: "First name must be 100 or less!"
    }),
    last: z.string().trim().min(1).max(100, {
        message: "Last name must be 100 or less!"
    }),
    email: z.email({ pattern: z.regexes.html5Email })
        .min(1, { message: "Email is required!" }),
    password: z.string().min(6, {
        message: "Must be at least 6 characters."
    }),
});

export type RType = z.infer<typeof RSchema>;

export const LSchema = z.object({
    email: z.email({ pattern: z.regexes.html5Email })
        .min(1, { message: "Email is required!" }),
    password: z.string()
        .min(6, { message: "Must be at least 6 characters." })
});

export type LType = z.infer<typeof LSchema>;


