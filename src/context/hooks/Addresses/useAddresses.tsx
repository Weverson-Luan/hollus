import { Api } from "../../../services/api";

export const getMyAddresses = async () => {
  try {
    const res = await Api.get("/v1/endereco/pesquisar");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteAddress = async (id) => {
    try {
      const res = await Api.delete("/v1/endereco/deletar/" + id);
      return res.data;
    } catch (error) {
      return error;
    }
  };

export const postSaveAddress = async (
  logradouro,
  numero,
  complemento,
  cep,
  bairro,
  cidade,
  uf
) => {
  try {
    const res = await Api.post("/v1/endereco/salvar", {
      logradouro: logradouro,
      numero: numero,
      complemento: complemento,
      cep: cep,
      bairro: bairro,
      cidade: cidade,
      estado: uf
    });
    // console.log(res);
    return res.data;
  } catch (error) {
    return error;
  }
};
