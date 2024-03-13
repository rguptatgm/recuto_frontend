import * as yup from "yup";

export const interviewSchema = yup.object().shape({
    _id:yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    welcomeText: yup.string().notRequired(),
    questions: yup.array().of(
        yup.object().shape({
            actualQuestion: yup.string().required(),
            thinkingTime: yup.number().required(),
            maxAnswerTime: yup.number().required(),
            maxRetakes: yup.number().required(),
            isVideoAnswerRequired: yup.boolean().required()
        })
    ).required(),
    farewellText: yup.string().notRequired(),
});

export interface Interview extends yup.InferType<typeof interviewSchema> {}
