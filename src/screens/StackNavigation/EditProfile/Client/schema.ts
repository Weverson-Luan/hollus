import * as Yup from 'yup';

const EditProfileSchema = Yup.object().shape({
    email: Yup.string().email("E-mail inválido").required("Insira um e-mail").required("Insira um e-mail"),
    emailConfirmation: Yup.string().when('email', {
        is: (email) => email >= 1 ,
        then: Yup.string().oneOf([Yup.ref("email"), null], 'Os e-mails não são iguais').required("Confirme o novo e-mail"),
        otherwise: Yup.string()
    }),
    nome: Yup.string().min(4, "Insira um nome válido").required("Insira um nome"),
    celular: Yup.string().min(11, "Insira um celular válido").required('Insira um número'),
    password: Yup.string().length(8, "A senha deve ter no mínimo 8 caracteres"),
    passwordConfirmation: Yup.string().when('password', {
        is: (password) => password >= 8 ,
        then: Yup.string().oneOf([Yup.ref("password"), null], 'As senhas não são iguais').required("Confirme a nova senha"),
        otherwise: Yup.string()
    }),
    cpf: Yup.string().min(11, "Insira um CPF válido").required("Insira seu CPF"),
    rg: Yup.string().min(5, "Insira um RG válido").required("Insira seu RG"),
})

export {EditProfileSchema};