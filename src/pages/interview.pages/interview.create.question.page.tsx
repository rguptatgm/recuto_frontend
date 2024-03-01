import { yupResolver } from "@hookform/resolvers/yup";
import { inject, observer } from "mobx-react";
import { useForm, useFieldArray } from "react-hook-form";
import QuestionStore from "../../stores/question.store";
import MainLayout from "../../components/layout.components/main.layout/main.layout";
import PageContainer from "../../components/layout.components/page.container.component/page.container.component";
import OutlinedTextInput from "../../components/input.components/outlined.text.input.component/outlined.text.input.component";
import FilledButton from "../../components/input.components/filled.button.component/filled.button.component";
import { Questions, questionsSchema } from "../../schemas/questions.schema";
import InterviewStore from "../../stores/interview.store";

interface QuestionFormProps {
    interviewStore:InterviewStore;
    questionStore: QuestionStore;
}

const QuestionForm = ({
    questionStore,
    interviewStore,
}: QuestionFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    control,
  } = useForm<Questions>({
    resolver: yupResolver(questionsSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: Questions): Promise<void> => {

    console.log("data")

    const questions = data.questions ?? [];

    for(let i = 0;i < questions.length;i++){
      questions[i].sort = i+1;  
    }

    questions?.forEach(async question =>{
      await questionStore?.createQuestion(question);
    }) 

    console.log(data);
  };

  return (
    <MainLayout>
      <PageContainer>
        <form id="question-create-form" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((question, index) => (
            <div key={question.id} className="question-container">
              <OutlinedTextInput
                type="text"
                label={`Fragen Titel ${index + 1}`}
                placeholder={`Fragen Titel ${index + 1}`}
                inputRef={register(`questions.${index}.title` as const)}
              />

              <OutlinedTextInput
                type="text"
                label={`Frage ${index + 1}`}
                placeholder={`Frage ${index + 1}`}
                inputRef={register(`questions.${index}.fullQuestion` as const)}
              />

            <OutlinedTextInput
                type="text"
                label="Art"
                placeholder="Art"
                inputRef={register(`questions.${index}.type`)}
              />

              <OutlinedTextInput
                type="text"
                label="Überlegungszeit"
                placeholder="Überlegungszeit (in min)"
                inputRef={register(`questions.${index}.thinkingTime`)}
              />

              <OutlinedTextInput
                type="text"
                label="Antwortzeit"
                placeholder="Antwortzeit (in min)"
                inputRef={register(`questions.${index}.maxAnswerTime`)}
              />

              <OutlinedTextInput
                type="text"
                label="Wiederholungen"
                placeholder="Wiederholungen"
                inputRef={register(`questions.${index}.maxRetakes`)}
              />

                {index < fields.length - 1 && <hr />}
            </div>
          ))}

          <FilledButton
            color="primary"
            type="button"
            label={'Frage hinzufügen'}
            onClick={() => append({
                _id:'', title: '', fullQuestion: '', type:'', videoUrl:'', thinkingTime:0, maxAnswerTime: 0, maxRetakes: 0,
                sort: 0, interviewID: interviewStore?.interview?._id ?? '',
            })}
          />

          <FilledButton
            color="primary"
            type="submit"
            label={'Fragen Erstellen'}
            className="mt-15 mb-15 full-width"
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </PageContainer>
    </MainLayout>
  );
};

export default inject("questionStore")(observer(QuestionForm));
