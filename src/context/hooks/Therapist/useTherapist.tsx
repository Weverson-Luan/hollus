/**
 * IMPORTS
 */
import {useContext} from 'react';
import {Api} from '../../../services/api';
import {AuthContext} from '../../AuthProvider';

const useTherapist = () => {
  const context = useContext(AuthContext);

  return context;
};

export const getTherapistData = async (id: number) => {
  try {
    const res = await Api.get(`/v1/consulta/terapeuta-info/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

/**
 * EXPORTS
 */
export {useTherapist};
