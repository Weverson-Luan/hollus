import {Api} from '../../../services/api';

export const getCategories = async () => {
  try {
    const res = await Api.get('/v1/home/listar-categorias');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getProductCategories = async () => {
  try {
    const res = await Api.get('/v1/cadastros/pesquisar-categorias-produtos');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getGeneralInfo = async () => {
  try {
    const res = await Api.get('/v1/home/pesquisa-geral-info');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getFilteredSearch = async (
  category_id = '',
  searchTerm = '',
  orderBy = '',
  orderDistance = '',
) => {
  try {
    const res = await Api.get('/v1/home/pesquisa-geral', {
      params: {
        search: searchTerm,
        categoria_id: category_id,
        order: orderBy,
        orderDistance: orderDistance,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
