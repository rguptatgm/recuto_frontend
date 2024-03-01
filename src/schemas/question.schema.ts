import * as yup from "yup";

export const questionSchema = yup.object().shape({
    _id:yup.string().required(),
    title: yup.string().required(),
    fullQuestion: yup.string().required(),
    type:yup.string().required(),
    videoUrl:yup.string().required(),
    thinkingTime: yup.number().required(),
    maxAnswerTime:yup.number().required(),
    maxRetakes:yup.number().required(),
    sort:yup.number().required(),
    interviewID:yup.string().required(),
    //organizationsID:yup.string().required(),
});

export interface Question extends yup.InferType<typeof questionSchema> {}
