import { z } from "zod";
import validator from "validator";

export const habbitSchema = z.object({
    title: z
        .string()
        .min(2, "Title must be at least 2 characters")
        .transform((val) => validator.escape(val.trim())),
    description: z
        .string()
        .min(2, "Description must be at least 2 characters")
        .transform((val) => validator.escape(val.trim())),
    frequency: z.enum(["daily", "weekly", "monthly"]),
});

export type HabbitFormValues = z.infer<typeof habbitSchema>;