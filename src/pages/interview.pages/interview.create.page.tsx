import React from 'react';
import MainLayout from '../../components/layout.components/main.layout/main.layout';
import PageContainer from '../../components/layout.components/page.container.component/page.container.component';
import OutlinedTextInput from '../../components/input.components/outlined.text.input.component/outlined.text.input.component';
import FilledButton from '../../components/input.components/filled.button.component/filled.button.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { Interview, interviewSchema } from '../../schemas/interview.schema';
import InterviewStore from '../../stores/interview.store';
import { inject, observer } from 'mobx-react';

interface InterviewFormProps {
    interviewStore?: InterviewStore;
}

const InterviewForm = ({
    interviewStore,
}: InterviewFormProps): JSX.Element => {
    const {
        register,
        control,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(interviewSchema),
        mode: 'onTouched',
        reValidateMode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
            welcomeText: '',
            questions: [{
                actualQuestion: '',
                thinkingTime: undefined,
                maxAnswerTime: undefined,
                maxRetakes: undefined,
                isVideoAnswerRequired: false,
            }],
            farewellText: ''
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    });

    const onSubmit = async (data: any): Promise<void> => {
        console.log(interviewStore);
        try {
            const newInterview = await interviewStore?.createInterview(data);
            console.log(newInterview);
        } catch (err) {
            console.error("Fehler beim Erstellen des Interviews:", err)
        }
    };

    return (
        <MainLayout>
            <PageContainer>
                <form
                    id="interview-create-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Interview details */}
                    <OutlinedTextInput
                        type="text"
                        label='Interview Titel'
                        placeholder={'Interview Titel'}
                        inputRef={register('title')}
                    />
                    <OutlinedTextInput
                        type="text"
                        label='Interview Beschreibung'
                        placeholder={'Interview Beschreibung'}
                        inputRef={register('description')}
                    />
                    <OutlinedTextInput
                        type="text"
                        label='Willkommenstext'
                        placeholder={'Willkommenstext'}
                        inputRef={register('welcomeText')}
                    />
                    <OutlinedTextInput
                        type="text"
                        label='Abschiedstext'
                        placeholder={'Abschiedstext'}
                        inputRef={register('farewellText')}
                    />
                    {fields.map((question, index) => (
                        <div key={question.id} className="question-card">
                            <OutlinedTextInput
                                type="text"
                                label={`Frage ${index + 1}`}
                                placeholder={'Frage'}
                                inputRef={register(`questions.${index}.actualQuestion`)}
                            />
                            <OutlinedTextInput
                                type="number"
                                label='Überlegungszeit'
                                placeholder={'Überlegungszeit (in Minuten)'}
                                inputRef={register(`questions.${index}.thinkingTime`)}
                            />
                            <OutlinedTextInput
                                type="number"
                                label='Antwortzeit'
                                placeholder={'Antwortzeit (in Minuten)'}
                                inputRef={register(`questions.${index}.maxAnswerTime`)}
                            />
                            <OutlinedTextInput
                                type="number"
                                label='Maximale Wiederholungen'
                                placeholder={'Maximale Wiederholungen'}
                                inputRef={register(`questions.${index}.maxRetakes`)}
                            /> 
                            <div className="video-required">
                                <input
                                    type="checkbox"
                                    {...register(`questions.${index}.isVideoAnswerRequired`)}
                                />
                                <label>Videoaufnahme nötig?</label>
                            </div>
                            {index < fields.length - 1}
                        </div>
                    ))}
                    <FilledButton
                        type="button"
                        label={"Frage hinzufügen"}
                        onClick={() => append({
                            actualQuestion: '',
                            thinkingTime: 0,
                            maxAnswerTime: 0,
                            maxRetakes: 0,
                            isVideoAnswerRequired: false,
                        })}
                    />
                    {fields.length > 0 && (
                        <FilledButton
                            type="button"
                            label={"Frage Entfernen"}
                            onClick={() => remove(fields.length - 1)}
                        />
                    )}
                    <FilledButton
                        color="primary"
                        type="submit"
                        label={'Interview Erstellen'}
                        className="mt-15 mb-15 full-width"
                    />
                    </form>
                    <style>
                        {`
                            .question-card {
                                background-color: #f8f9fa;
                                border-radius: 5px;
                                padding: 20px;
                                margin-top: 20px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .video-required {
                                display: flex;
                                align-items: center;
                            }
                            .video-required input[type="checkbox"] {
                                margin-right: 10px;
                            }
                        `}
                    </style>
                </PageContainer>
            </MainLayout>
    );
};
    
export default inject("interviewStore")(observer(InterviewForm));
