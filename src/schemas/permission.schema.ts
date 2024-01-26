import * as yup from "yup";

export const permissionSchema = yup.object().shape({
  alias: yup.string().required(),
  description: yup.string(),
  type: yup.string().required(),
  system: yup.object().nullable().shape({
    name: yup.string().required(),
    version: yup.string().required(),
  }),
});

export interface Permission extends yup.InferType<typeof permissionSchema> {}
