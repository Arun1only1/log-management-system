import { z } from "zod";
import { VALID_MSG } from "@/constants";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, VALID_MSG.EMAIL_REQUIRED)
    .email(VALID_MSG.INVALID_EMAIL),

  password: z
    .string()
    .min(1, VALID_MSG.PASSWORD_REQUIRED)
    .min(6, VALID_MSG.PASSWORD_MIN_LENGTH),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
