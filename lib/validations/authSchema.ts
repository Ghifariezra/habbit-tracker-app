import { z } from "zod";
import validator from "validator";

export const authSchema = z.object({
    email: z
        .string()
        .email("Invalid email format")
        .transform((val) => validator.normalizeEmail(val.trim()) || ""),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .refine((val) => validator.isStrongPassword(val, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }), {
            message: "Password must include uppercase, lowercase, number, and symbol"
        })
        .transform((val) => validator.escape(val.trim())),
});

export type AuthFormValues = z.infer<typeof authSchema>;