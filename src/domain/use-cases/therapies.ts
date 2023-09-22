

/**
 * IMPORTS
 */
import AxiosService from "../../infra/http/axios/api-product";


/**
 * BUSACAR CONSOLTAS
 */
const handleGetTherapistCategories = async (
  accessToken: string,
) => {
  
  const Instance = AxiosService.createAxiosInstance(accessToken);
  const responseTherapies = await (
    await Instance
  ).get(`v1/user/pesquisar-minhas-categorias`);
  return responseTherapies.data;
};


/**
 * BUSCAR CATEGORIAS DISPONIVEIS
 */
const handleGetTherapistCategoriesList = async (
  accessToken: string,
  therapist_id?: number
) => {
  
  const Instance = AxiosService.createAxiosInstance(accessToken);
  const responseTherapies = await (
    await Instance
  ).get(`v1/user/pesquisar-categorias`);
  return responseTherapies.data;
};


/**
 * ADICIONAR NOVO HORARIO A UMA CONSULTA
 */
const handleGetTherapistAddHours = async (
  accessToken: string,
  dataHours?: any
) => {
  
  const Instance = AxiosService.createAxiosInstance(accessToken);
  const responseTherapiesHours = await (
    await Instance
  ).post(`v1/user/horario/adicionar`,{dataHours});
  return responseTherapiesHours.data;
};




/**
 * EXPORTS
 */
export {
  handleGetTherapistCategories,
  handleGetTherapistCategoriesList,
  handleGetTherapistAddHours
}