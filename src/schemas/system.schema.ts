import * as yup from "yup";

export const systemSchema = yup.object().shape({
  createdAt: yup.date().required(),
  modifiedAt: yup.date().required(),
  archived: yup.boolean(),
  archivedAt: yup.date().nullable(),
});

export interface System extends yup.InferType<typeof systemSchema> {}
