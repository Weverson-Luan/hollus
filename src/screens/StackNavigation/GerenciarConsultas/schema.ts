import * as Yup from 'yup';

const EditProfileSchema = Yup.object().shape({
    nome: Yup.string().nullable().required('Insira seu nome'),
    celular: Yup.string().required('Insira seu celular'),
    sobre: Yup.string().nullable().required("Insira uma informação sobre você"),
    formacao: Yup.string().nullable().required('Insira sua formação'),
    experiencias: Yup.string().nullable().required("Insira suas experiências"),
    endereco_cep: Yup.string().nullable().min(9, 'CEP inválido').max(9, 'CEP inválido').required("Obrigatório"),
    endereco: Yup.string().nullable(),
    endereco_numero: Yup.string().nullable().min(1).max(9).required("Obrigatório"),
    endereco_complemento: Yup.string().nullable().min(1).max(20).nullable(),
    // lat: Yup.string().required("Obrigatório"),
    // long: Yup.string().required("Obrigatório"),
})

export {EditProfileSchema};