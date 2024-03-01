import * as yup from "yup";
import { questionSchema } from "./question.schema";

export const questionsSchema = yup.object().shape({
    questions:yup.array().of(questionSchema)
});
export interface Questions extends yup.InferType<typeof questionsSchema>{
}
