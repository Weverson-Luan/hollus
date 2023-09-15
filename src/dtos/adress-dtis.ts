/**
 * IMPORTS
 */

type AddressProps = {
  data: {
    bairro: string;
    cep: string;
    cidade:string;
    complemento: string;
    created_at: string;
    endereco_completo: string;
    estado: string;
    id: number;
    logradouro: string;
    numero: string;
    updated_at: string;
    usuario_id: number;
  }[]
}
/**
 * EXPORTS
 */
export type {
  AddressProps
}