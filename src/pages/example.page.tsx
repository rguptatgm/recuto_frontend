import { inject, observer } from "mobx-react";
import { ModalSize, ModalStore, ModalType } from "../stores/modal.store";
import MainLayout from "../components/layout.components/main.layout/main.layout";
import PageContainer from "../components/layout.components/page.container.component/page.container.component";
import PageHeadline from "../components/navigation.components/page.headline.component/page.headline.component";
import FilledButton from "../components/input.components/filled.button.component/filled.button.component";
import { useState } from "react";
import OutlinedTextInput from "../components/input.components/outlined.text.input.component/outlined.text.input.component";
import Column from "../components/layout.components/column.component/column.component";
import SizedContainer from "../components/layout.components/sized.container.component/sized.container.component";
import { ContainerSizes } from "../globals/enums/global.enum";
import UserStore from "../stores/user.store";
import { LargeText } from "../components/text.components/large.text.component/large.text.component";
import SmallHeadline from "../components/text.components/small.headline.component/small.headline.component";

interface HomePageProps {
  modalStore?: ModalStore;
  userStore?: UserStore;
}

const ExamplePage = ({ modalStore, userStore }: HomePageProps) => {
  const [permissionAlias, setPermissionAlias] =
    useState<string>("USER_PROFILE_MENU");
  const [userHasPermission, setUserHasPermission] = useState<
    boolean | undefined
  >(undefined);

  return (
    <MainLayout topBars={[<PageHeadline title="Example Page" />]}>
      <PageContainer>
        <FilledButton
          label="Open Confirm Modal"
          onClick={() => {
            modalStore?.openModal(ModalType.CONFIRM_MODAL, ModalSize.SMALL, {
              confirmLabel: "Confirm",
              title: "Modal Title",
              description:
                "This is a modal description that can be used to display information.",
            });
          }}
        />

        <SizedContainer size={ContainerSizes.M} className="mt-20">
          <Column>
            <SmallHeadline>Permission-Check example:</SmallHeadline>
            <LargeText
              className={!userHasPermission ? "color-error" : "color-primary"}
            >
              {userHasPermission == null
                ? "Please enter a permission alias"
                : userHasPermission
                ? "The user has the permission."
                : "The user does not have the permission."}
            </LargeText>

            <FilledButton
              label={"check if user has client permission: " + permissionAlias}
              onClick={() => {
                const hasPermission = userStore?.checkIfUserHasPermission({
                  alias: permissionAlias,
                });

                setUserHasPermission(hasPermission);
              }}
            />
            <OutlinedTextInput
              value={permissionAlias}
              onChange={(value) => {
                if (value != null) {
                  setPermissionAlias(value);
                }
              }}
            />
          </Column>
        </SizedContainer>
      </PageContainer>
    </MainLayout>
  );
};

export default inject("modalStore", "userStore")(observer(ExamplePage));
