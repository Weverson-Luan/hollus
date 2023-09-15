import {Api} from '../../../services/api';

export const getMyAddresses = async () => {
  try {
    const res = await Api.get('/v1/endereco/pesquisar');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteAddress = async (id: number | string) => {
  try {
    const res = await Api.delete('/v1/endereco/deletar/' + id);
    return res.data;
  } catch (error) {
    return error;
  }
};

interface IAddressProps {
  logradouro: string;
  numero: string | number;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
}
export const postSaveAddress = async ({
  cep,
  cidade,
  complemento,
  bairro,
  uf,
  numero,
  logradouro,
}: IAddressProps) => {
  try {
    const res = await Api.post('/v1/endereco/salvar', {
      logradouro: logradouro,
      numero: numero,
      complemento: complemento,
      cep: cep,
      bairro: bairro,
      cidade: cidade,
      estado: uf,
    });
    // console.log(res);
    return res.data;
  } catch (error) {
    return error;
  }
};
