import "./sign.in.page.scss";
import { inject, observer } from "mobx-react";
import UserStore from "../../../stores/user.store";
import Headline from "../../../components/text.components/headline.component/headline.component";
import Row from "../../../components/layout.components/row.component/row.component";
import AuthForm from "../../../components/auth.components/auth.form.component/auth.form.component";
import CompanyLogo from "../../../components/general.components/company.logo.component/company.logo.component";

interface SignInPageProps {
  userStore?: UserStore;
}

const SignInPage = ({ userStore }: SignInPageProps): JSX.Element => {
  const _buildPreview = (): JSX.Element => {
    return (
      <div className="sign-in-form-preview-container">
        <CompanyLogo className="mb-30" />
        <Headline className="sign-in-header">{`ReactJS Template`}</Headline>
      </div>
    );
  };

  return (
    <Row className="sign-in-page">
      <div className="sign-in-page-wrapper">
        {_buildPreview()}
        <div className="auth-form-wrapper">
          <AuthForm />
        </div>
      </div>
    </Row>
  );
};

export default inject("userStore")(observer(SignInPage));
