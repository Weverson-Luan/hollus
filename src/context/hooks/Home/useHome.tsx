import {Api} from '../../../services/api';

export const getNextAppointment = async () => {
  try {
    const res = await Api.get('/v1/home/pesquisar-proxima-consulta');
    // console.log(res.data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getRecommended = async () => {
  try {
    const res = await Api.get('/v1/home/pesquisar-recomendados');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getNews = async () => {
  try {
    const res = await Api.get('/v1/home/pesquisar-noticias');
    return res.data;
  } catch (error) {
    return error;
  }
};
