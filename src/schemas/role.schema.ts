import * as yup from "yup";
import { permissionSchema } from "./permission.schema";

export const roleSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  permissions: yup.array().of(permissionSchema).required(),
});

export interface Role extends yup.InferType<typeof roleSchema> {}
