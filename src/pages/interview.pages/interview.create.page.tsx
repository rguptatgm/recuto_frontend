import MainLayout from '../../components/layout.components/main.layout/main.layout';
import PageContainer from '../../components/layout.components/page.container.component/page.container.component';
import OutlinedTextInput from '../../components/input.components/outlined.text.input.component/outlined.text.input.component';
import FilledButton from '../../components/input.components/filled.button.component/filled.button.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
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
        handleSubmit,
    } = useForm({
        resolver: yupResolver(interviewSchema),
        mode: 'onTouched',
        reValidateMode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const onSubmit = async (data: Interview): Promise<void> => {
        const newInterview = await interviewStore?.createInterview({
            ...data
        });

        console.log(newInterview);
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
                        type="number"
                        label='Überlegungszeit'
                        placeholder={'Überlegungszeit (in Minuten)'}
                        inputRef={register('thinkingTime')}
                    />
                    <OutlinedTextInput
                        type="number"
                        label='Antwortzeit'
                        placeholder={'Antwortzeit (in Minuten)'}
                        inputRef={register('maxAnswerTime')}
                    />
                    <OutlinedTextInput
                        type="number"
                        label='Maximale Wiederholungen'
                        placeholder={'Maximale Wiederholungen'}
                        inputRef={register('maxRetakes')}
                    />

                    <hr />
{/* 
                    
                    {fields.map((question, index) => (
                        <div key={question.id} className="question-container">
                            <OutlinedTextInput
                                type="text"
                                infoLabel={`Frage ${index + 1}`}
                                placeholder={'Titel'}
                                inputRef={register(`questions.${index}.questionTitle`)}
                            />
                            <OutlinedTextInput
                                type="text"
                                placeholder={'Frage'}
                                inputRef={register(`questions.${index}.actualQuestion`)}
                            />                            

                            {index < fields.length - 1 && <hr />}
                        </div>
                    ))}

                    
                    <FilledButton
                        type="button"
                        label={"Frage hinzufügen"}
                        onClick={() => append({ questionTitle: '', actualQuestion: '', questionType: 'QUESTION' })}
                    />

                    
                    {fields.length > 0 && (
                        <FilledButton
                            type="button"
                            label={"Frage Entfernen"}
                            onClick={() => remove(fields.length - 1)}
                        />
                    )}
*/}
                    
                    <FilledButton
                        color="primary"
                        type="submit"
                        label={'Interview Erstellen'}
                        className="mt-15 mb-15 full-width"
                        onClick={handleSubmit(onSubmit)}
                    />
                </form>
            </PageContainer>
        </MainLayout>
    );
};

export default inject("interviewStore")(observer(InterviewForm));
