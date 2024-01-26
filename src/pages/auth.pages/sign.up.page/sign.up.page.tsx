import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./sign.up.page.scss";
import { inject, observer } from "mobx-react";
import { yupResolver } from "@hookform/resolvers/yup";
import UserStore from "../../../stores/user.store";
import { authenticationSchema } from "../../../schemas/authentication.schema";
import { SignUpCredentials } from "../../../services/http.clients/http.auth.client";
import Headline from "../../../components/text.components/headline.component/headline.component";
import { RunningText } from "../../../components/text.components/running.text.component/running.text.component";
import OutlinedTextInput from "../../../components/input.components/outlined.text.input.component/outlined.text.input.component";
import FilledButton from "../../../components/input.components/filled.button.component/filled.button.component";
import Center from "../../../components/layout.components/center.component/center.component";
import Spacer from "../../../components/layout.components/spacer.component/spacer.component";
import Row from "../../../components/layout.components/row.component/row.component";
import CompanyLogo from "../../../components/general.components/company.logo.component/company.logo.component";
import GoogleAuth from "../../../components/auth.components/google.auth.component/google.auth.component";

interface SignUpPageProps {
  userStore?: UserStore;
}

const SignUpPage = ({ userStore }: SignUpPageProps): JSX.Element => {
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
  });

  const handleSignUp = async (data: any): Promise<void> => {
    setIsLoading(true);
    const credentials: SignUpCredentials = { ...data, kind: "INTERNAL" };

    const user = await userStore?.signUp(credentials);

    if (user != null) {
      navigate("/");
    }

    setIsLoading(false);
  };

  const _buildForm = (): JSX.Element => {
    return (
      <div className="sign-up-form-container">
        <div className="sign-up-form-wrapper">
          <Headline>Sign up</Headline>
          <RunningText className="mb-20">Please signup to continue</RunningText>
          <form
            className="sign-up-form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(handleSignUp)}
            noValidate
          >
            <OutlinedTextInput
              type="email"
              placeholder="Email"
              inputRef={register("email")}
              validationMessage={errors.email?.message?.toString()}
            />
            <OutlinedTextInput
              className="mt-15"
              type="password"
              placeholder="Password"
              inputRef={register("password")}
              validationMessage={errors.password?.message?.toString()}
            />
            <FilledButton
              type="submit"
              label="Sign up now"
              isLoading={isLoading}
              className="mt-15 mb-15 full-width"
            />

            <Center className="mb-15">
              <Spacer width="90%" />
            </Center>

            <Center className="mb-15 mt-15">
              <GoogleAuth />
            </Center>
            <div className="additional-actions">
              <RunningText navLink="/sign-in" className=" mt-10">
                Already have an account? Sign in
              </RunningText>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const _buildPreview = (): JSX.Element => {
    return (
      <div className="sign-up-form-preview-container">
        <CompanyLogo className="mb-30" />
        <Headline className="sign-up-header">ReactJS Template</Headline>
      </div>
    );
  };

  return (
    <Row className="sign-up-page">
      <div className="sign-up-page-wrapper">
        {_buildPreview()}
        <div className="auth-form-wrapper">{_buildForm()}</div>
      </div>
    </Row>
  );
};

export default inject("userStore")(observer(SignUpPage));
