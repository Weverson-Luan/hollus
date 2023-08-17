import {Api} from '../../../services/api';

export const getCards = async () => {
  try {
    const res = await Api.get('/v1/cartao/pesquisar');
    return res.data;
  } catch (error) {
    return error;
  }
};
export const postPayment = async (consulta_id: number) => {
  try {
    const res = await Api.post(
      'v1/consulta/finalizar-pagamento/' + consulta_id,
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const postSaveCard = async (cardInfo: any) => {
  try {
    const res = await Api.post('v1/cartao/salvar', {
      numero: cardInfo.number,
      validade: cardInfo.expiry,
      cvv: cardInfo.cvv,
      nome_completo: cardInfo.name,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteCard = async (id: number) => {
  try {
    const res = await Api.delete('v1/cartao/deletar/' + id);
    return res.data;
  } catch (error) {
    return error;
  }
};
