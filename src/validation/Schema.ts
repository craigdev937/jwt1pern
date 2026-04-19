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
export interface RUser extends RType {
    user_id: string
}

export const LSchema = z.object({
    email: z.email({ pattern: z.regexes.html5Email })
        .min(1, { message: "Email is required!" }),
    password: z.string()
        .min(6, { message: "Must be at least 6 characters." })
});

export type LType = z.infer<typeof LSchema>;

export const PSchema = z.object({
    user_id: z.number()
        .min(1, { message: "User_ID is Required!" }),
    name: z.string()
        .min(3, { message: "Player Name is required!" }),
    description: z.string(),
    image: z.string()
});

export type PType = z.infer<typeof PSchema>;


