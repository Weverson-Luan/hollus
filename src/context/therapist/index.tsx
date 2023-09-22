/**
 * IMPORTS
 */
import React, {createContext, useState} from 'react';

//typings
import {ITherapistProvider, IContextTherapist} from './types';
import {ITherapies} from '../../dtos/therepies-dto';

import useAlert from '../hooks/Alert/useAlert';
import {handleGetTherapistCategories} from '../../domain/use-cases/therapies';
import {useAuth} from '../hooks/Auth/useAuth';
import {handleParseErrors} from '../../utils/passeError';

const TherapistContext = createContext<IContextTherapist>(
  {} as IContextTherapist,
);

const TherapistProvider = ({children}: ITherapistProvider) => {
  const {setAlert} = useAlert();
  const auth = useAuth();

  const [therapies, setTherapies] = useState<ITherapies>({} as ITherapies);

  const [isLoading, setIsLoading] = useState(true);

  const handleGetTherapistInfo = async (token?: string) => {
    try {
      const {data} = await handleGetTherapistCategories(
        token ? String(token) : String(auth.token),
      );

      setTherapies(data);
    } catch (error) {
      setAlert(
        'Erro',
        handleParseErrors('Não foi possível buscar as categorias!'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TherapistContext.Provider
      value={{
        therapie: therapies,
        handleGetTherapistInfo,
        isLoading,
      }}>
      {children}
    </TherapistContext.Provider>
  );
};

/**
 * EXPORTS
 */
export {TherapistContext, TherapistProvider};
