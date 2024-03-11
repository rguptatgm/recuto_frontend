import PageContainer from "../../components/layout.components/page.container.component/page.container.component";
import MainLayout from "../../components/layout.components/main.layout/main.layout";
import { inject, observer } from "mobx-react";
import OrganizationStore from "../../stores/organization.store.ts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import OutlinedTextInput
    from "../../components/input.components/outlined.text.input.component/outlined.text.input.component.tsx";
import FilledButton from "../../components/input.components/filled.button.component/filled.button.component.tsx";
import { OrganizationSchema} from "../../schemas/organization.schemas/organization.schemas.ts";

interface HomePageProps {
    organizationStore?: OrganizationStore;
}

const OrganizationCreate = ({
    organizationStore,
}: HomePageProps) => {
    const {
        register,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(OrganizationSchema),
        mode: 'onTouched',
        reValidateMode: 'onChange',
        defaultValues: {
            title: ''
        },
    });

    const onSubmit = async (data: any): Promise<void> => {
        console.log(data)

        const newOrganization = organizationStore?.addOrganization({
            ...data
        });

        console.log(newOrganization);

    };


    return (
        <MainLayout>

            <PageContainer>
                    <form
                        id="organization-create-form"
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: '70%', maxWidth: '400px' }} // Adjust the width of the form
                    >

                        {/* Organization details */}
                        <OutlinedTextInput
                            type="text"
                            label='Interview Titel'
                            placeholder={'Organizations Namen'}
                            inputRef={register('title')}
                        />
                        <FilledButton
                            color="primary"
                            type="submit"
                            label={'Organization Erstellen'}
                            className="mt-15 mb-15 full-width"
                            onClick={handleSubmit(onSubmit)}

                        />
                    </form>
            </PageContainer>
        </MainLayout>
    );
};

export default inject("organizationStore")(observer(OrganizationCreate));
