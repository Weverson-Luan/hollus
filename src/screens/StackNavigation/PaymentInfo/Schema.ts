import * as Yup from "yup";

export const CCSchema = Yup.object().shape({
  number: Yup.string().required(),
  brand: Yup.string().required().required(),
  name: Yup.string().required().required(),
  cvv: Yup.string().required(),
  expiry: Yup.string().required("Código de segurança obrigatório."),
});