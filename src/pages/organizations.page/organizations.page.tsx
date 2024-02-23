import PageContainer from "../../components/layout.components/page.container.component/page.container.component";
import PageHeadline from "../../components/navigation.components/page.headline.component/page.headline.component";
import MainLayout from "../../components/layout.components/main.layout/main.layout";
import { inject, observer } from "mobx-react";
import ProjectStore from "../../stores/project.store";
import OrganizationStore from "../../stores/organization.store.ts";
import {ModalSize, ModalStore, ModalType} from "../../stores/modal.store.ts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import OutlinedTextInput
    from "../../components/input.components/outlined.text.input.component/outlined.text.input.component.tsx";
import FilledButton from "../../components/input.components/filled.button.component/filled.button.component.tsx";
import {OrganizationSchema} from "../../schemas/organization.schemas/organization.schemas.ts";

interface HomePageProps {
    projectStore?: ProjectStore;
    organizationStore?: OrganizationStore;
    modalStore?: ModalStore;
}

const OrganizationCreate = ({ projectStore,modalStore,organizationStore }: HomePageProps) => {
    const projectTitle = projectStore?.currentProject?.name;
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
        const newOrganization = await organizationStore?.createOrganization({
            ...data
        });

        console.log(newOrganization);
    };

    return (
        <MainLayout topBars={[<PageHeadline title={projectTitle ?? "-"} />]}>

            <PageContainer>
                    <form
                        id="organization-create-form"
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: '70%', maxWidth: '400px' }} // Adjust the width of the form
                    >
                        <FilledButton
                            label="Create Organization"
                            onClick={() => {
                                modalStore?.openModal(ModalType.CONFIRM_MODAL, ModalSize.SMALL, {
                                    confirmLabel: "Confirm",
                                    title: "Organization Erstellen",
                                    description:
                                        "Diese Seite dient zur Erstellung von Organizationen",
                                });
                            }}
                        />
                        <p />
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

export default inject("projectStore", "modalStore")(observer(OrganizationCreate));
