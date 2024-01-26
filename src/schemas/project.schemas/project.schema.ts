import * as yup from "yup";
import { systemSchema } from "../system.schema";

export const projectSchema = yup.object().shape({
  _id: yup.string().required(),
  name: yup.string().required(),
  // system: systemSchema.notRequired().nullable(),
});

export interface Project extends yup.InferType<typeof projectSchema> {}
