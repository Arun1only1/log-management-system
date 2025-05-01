import { IValidationMessage } from "@/interface";

const validationMessage: IValidationMessage = {
  EMAIL_REQUIRED: "Email is required.",
  FIRST_NAME_MAX_LENGTH: "First name must not exceed 255 characters.",
  FIRST_NAME_REQUIRED: "First name is required.",
  INVALID_EMAIL: "Must be a valid email address.",
  LAST_NAME_MAX_LENGTH: "Last name must not exceed 255 characters.",
  LAST_NAME_REQUIRED: "Last name is required.",
  PASSWORD_MIN_LENGTH: "Password must include at least 6 characters.",
  PASSWORD_REQUIRED: "Password is required.",
};

export { validationMessage as VALID_MSG };
