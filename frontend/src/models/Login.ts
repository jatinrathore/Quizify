import Joi from "joi";

export interface LoginFormData {
  email: string;
  password: string;
}

// schema validation of input fields
const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .min(15)
    .required()
    .trim()
    .label("Email")
    .messages({
      "string.empty": "Email address is required",
      "string.email": "Please enter a valid email address",
      "string.min": "Email must be at least {#limit} characters",
      "any.required": "Email address is required",
    }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$"))
    .required()
    .label("Password")
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),
});

export const validateLoginInput = (
  data: LoginFormData,
  { abortEarlyProp = true } = {}
) => {
  const { error } = schema.validate(data, { abortEarly: abortEarlyProp });

  if (!error) {
    return {};
  }

  const validationErrors: { [key: string]: string } = {};
  for (const detail of error.details) {
    validationErrors[detail.path[0]] = detail.message;
  }

  return validationErrors;
};
