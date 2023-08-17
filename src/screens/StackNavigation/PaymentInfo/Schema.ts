import * as Yup from "yup";

export const CCSchema = Yup.object().shape({
  number: Yup.string(),
  brand: Yup.string().required(),
  name: Yup.string().required(),
  cvv: Yup.string(),
  expiry: Yup.string(),
});