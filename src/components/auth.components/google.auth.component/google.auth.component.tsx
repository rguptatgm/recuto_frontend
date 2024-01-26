/* eslint-disable @typescript-eslint/no-misused-promises */
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { inject, observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Logging } from "../../../globals/helpers/logging.helper";
import { GoogleSignInCredentials } from "../../../services/http.clients/http.auth.client";
import UserStore from "../../../stores/user.store";

interface GoogleAuthProps {
  userStore?: UserStore;
  className?: string;
}

const GoogleAuth = ({ userStore, className }: GoogleAuthProps): JSX.Element => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async (response: any): Promise<void> => {
    try {
      const accessToken = response.credential as string;

      const credentials: GoogleSignInCredentials = {
        kind: "GOOGLE",
        socialVerifyToken: accessToken,
      };

      const user = await userStore?.signUp(credentials);

      if (user != null) {
        navigate("/");
      }
    } catch (err) {
      Logging.error({
        className: "GoogleAuth",
        methodName: "handleGoogleSignIn",
        message: "Google Login Fehlgeschlagen",
        exception: err,
        showAlert: true,
      });
    }
  };

  return (
    <GoogleLogin
      size="medium"
      onSuccess={async (credentialResponse) => {
        await handleGoogleSignIn(credentialResponse);
      }}
      onError={() => {
        toast.error("Google Login Fehlgeschlagen");
      }}
    />
  );
};

export default inject("userStore")(observer(GoogleAuth));
