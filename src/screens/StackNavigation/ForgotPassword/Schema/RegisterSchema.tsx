import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("Obrigatório"),
});
