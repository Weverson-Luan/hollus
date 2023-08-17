import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  nome: Yup.string().min(2, "Nome muito curto").required("Obrigatório"),
  sobrenome: Yup.string().min(2, "Sobrenome muito curto").required("Obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Obrigatório"),
  emailConfirmation: Yup.string()
    .email("E-mail inválido")
    .oneOf([Yup.ref("email"), null], "Os e-mails não são iguais")
    .required("Confirme seu e-mail"),
  celular: Yup.string().required("Insira seu telefone"),
  rg: Yup.string().required("Insira seu RG"),
  cpf: Yup.string().required("Insira seu CPF"),
  password: Yup.string().min(8, "Senha muito curta").required("Obrigatório"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas não são iguais")
    .required("Confirme sua senha"),
  policiesAccept: Yup.bool()
    .oneOf([true], "Aceite os termos de uso!")
    .required("Aceite os termos de uso"),
});
