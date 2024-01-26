import * as yup from "yup";

export const authenticationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ungültiges Format")
    .required("E-Mail ist erforderlich"),
  password: yup
    .string()
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
    .required("Passwort ist erforderlich"),
});

export interface Authentication
  extends yup.InferType<typeof authenticationSchema> {}
