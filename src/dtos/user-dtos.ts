/**
 * IMPORTS
 */

type IUserInfo = {

    celular: string;
    cpf: string;
    created_at: string;
    deleted_at: null,
    email: string;
    email_verified_at: boolean;
    empresa_id: number;
    endereco: string;
    endereco_bairro: string;
    endereco_cep: string;
    endereco_cidade: string;
    endereco_complemento: string;
    endereco_completo: string;
    endereco_estado: string;
    endereco_logradouro: string;
    endereco_numero: string;
    experiencias: string;
    first_access: number;
    formacao: string;
    foto:string;
    foto_documento: string;
    id: number;
    lat: number | string;
    link_foto: string;
    link_foto_documento: string;
    long: number | string;
    nome: string;
    nota_media: null,
    papel_id: number;
    password: string;
    remember_token: string;
    rg: string;
    sobre: string;
    sobre_consulta: string;
    token_access: string;
    ultimo_acesso: string;
    updated_at: string;
};
type IUserInfoResponseApi = {
  data: {
    celular: string;
    cpf: string;
    created_at: string;
    deleted_at: null,
    email: string;
    email_verified_at: boolean;
    empresa_id: number;
    endereco: string;
    endereco_bairro: string;
    endereco_cep: string;
    endereco_cidade: string;
    endereco_complemento: string;
    endereco_completo: string;
    endereco_estado: string;
    endereco_logradouro: string;
    endereco_numero: string;
    experiencias: string;
    first_access: number;
    formacao: string;
    foto:string;
    foto_documento: string;
    id: number;
    lat: number | string;
    link_foto: string;
    link_foto_documento: string;
    long: number | string;
    nome: string;
    nota_media: null,
    papel_id: number;
    password: string;
    remember_token: string;
    rg: string;
    sobre: string;
    sobre_consulta: string;
    token_access: string;
    ultimo_acesso: string;
    updated_at: string;

  }
};
/**
 * EXPORTS
 */
export type{
  IUserInfo,
  IUserInfoResponseApi
}