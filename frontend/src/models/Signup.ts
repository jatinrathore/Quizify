import Joi from "joi";

export interface UserFormData {
  name: string;
  email: string;
  password: string;
}

// schema validation of input fields
const schema = Joi.object({
  name: Joi.string().min(4).max(50).required().trim(),
  email: Joi.string().email({ tlds: false }).min(20).required().trim(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$"))
    .required(),
});

export const validateSignupInput = (
  data: UserFormData,
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
