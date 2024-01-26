/* eslint-disable @typescript-eslint/no-misused-promises */
import { inject, observer } from "mobx-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./auth.form.component.scss";
import GoogleAuth from "../google.auth.component/google.auth.component";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import UserStore from "../../../stores/user.store";
import { SignInCredentials } from "../../../services/http.clients/http.auth.client";
import Headline from "../../text.components/headline.component/headline.component";
import { RunningText } from "../../text.components/running.text.component/running.text.component";
import OutlinedTextInput from "../../input.components/outlined.text.input.component/outlined.text.input.component";
import FilledButton from "../../input.components/filled.button.component/filled.button.component";
import Center from "../../layout.components/center.component/center.component";
import Spacer from "../../layout.components/spacer.component/spacer.component";
import Column from "../../layout.components/column.component/column.component";
import { authenticationSchema } from "../../../schemas/authentication.schema";

interface AuthFormProps {
  title?: string;
  subTitle?: string;
  userStore?: UserStore;
  prefillEmail?: string;
}

const AuthForm = ({
  title,
  subTitle,
  userStore,
  prefillEmail,
}: AuthFormProps): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authenticationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      email: prefillEmail || undefined,
      password: "" || undefined,
    },
  });

  const handleSignIn = async (data: any): Promise<void> => {
    setIsLoading(true);

    const credentials: SignInCredentials = { ...data, kind: "INTERNAL" };

    const user = await userStore?.signIn(credentials);

    setIsLoading(false);

    if (user != null) {
      navigate("/");
    }
  };

  return (
    <div className="sign-in-form-container">
      <div className="sign-in-form-wrapper">
        <Headline>{title ?? t("auth.welcomeBack")}</Headline>
        <RunningText className="mb-20">
          {subTitle ?? t("auth.signInToContinue")}
        </RunningText>

        <form
          className="sign-in-form mt-20"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <OutlinedTextInput
            type="email"
            placeholder={t("auth.email") ?? "Email"}
            initialValue={prefillEmail ?? ""}
            inputRef={register("email")}
            validationMessage={errors.email?.message?.toString()}
          />
          <OutlinedTextInput
            className="mt-15"
            type="password"
            placeholder={t("auth.password") ?? "Password"}
            inputRef={register("password")}
            validationMessage={errors.password?.message?.toString()}
          />
          <FilledButton
            isLoading={isLoading}
            color="primary"
            type="submit"
            label={t("auth.signIn")}
            className="mt-15 mb-15 full-width"
          />

          <Center className="mb-15">
            <Spacer width="90%" />
          </Center>

          <Center className="mb-15 mt-15">
            <GoogleAuth />
          </Center>
          <div className="additional-actions">
            <Column alignItems="center">
              <RunningText navLink="/sign-up" className="mt-10">
                {t("auth.noAccount")}
              </RunningText>
              <RunningText navLink="/forgot-password" className="mt-5 ml-10">
                {t("auth.forgotPassword")}
              </RunningText>
            </Column>
          </div>
        </form>
      </div>
    </div>
  );
};

export default inject("userStore")(observer(AuthForm));
