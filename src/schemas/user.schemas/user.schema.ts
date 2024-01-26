import * as yup from "yup";

export const userSchema = yup.object().shape({
  _id: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string(),
  dateOfBirth: yup.date(),
  email: yup.string().email().required(),
  profileImageUrl: yup.string(),
  setupCompleted: yup.boolean().required(),
});

export interface User extends yup.InferType<typeof userSchema> {}
