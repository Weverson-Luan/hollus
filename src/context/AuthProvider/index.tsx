/**
 * IMPORTS
 */
import React, {createContext, useState, useEffect} from 'react';

//data-mocked
import {therapiesMocked, productsMocked} from '../../services/mocked';

//typings
import {IAuthProvider, IContext, IUser} from './types';
import {ITherapies} from '../../dtos/therepies-dto';

//utils
import {
  handleGetUserLocalStorage,
  handleLoginRequest,
  handlePersistLoginRequest,
  handleSetUserLocalStorage,
} from '../hooks/Auth/util';
import {handleGetTherapist} from '../hooks/Therapist/util';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {Api} from '../../services/api';
import {parse} from 'react-native-svg';

const AuthContext = createContext<IContext>({} as IContext);

const AuthProvider = ({children}: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();
  const [token, setToken] = useState('');

  const [therapies, setTherapies] = useState<ITherapies>(
    therapiesMocked as any,
  );
  const [products, setProducts] = useState<any>(productsMocked as any);
  const [successLogin, setSuccessLogin] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const handlePersistLogin = async () => {
    try {
      const res = await handlePersistLoginRequest();

      if (res?.success) {
        setUser(res?.user);
        setLoading(false);
        return res.success;
      }
      return res.success;
    } catch (error) {
      //tratamento de error
    }
  };

  const handleUser = async () => {
    try {
      const user: any = await AsyncStorageLib.getItem('user');

      if (user !== null) {
        const formatedUser = JSON.parse(user);
        setUser(user);
        setToken(formatedUser.token);
        const response = await handlePersistLogin();

        if (response) {
          setLoading(false);
          setSuccessLogin(true);
        } else {
          setSuccessLogin(false);
        }
      }
      setLoading(false);
    } catch (error) {
      //tratamento de error
    }
  };

  useEffect(() => {
    handleUser();
  }, []);

  const handleGetUser = () => {
    return user;
  };

  const handleAuthentication = async (email: string, password: string) => {
    try {
      const response = await handleLoginRequest(email, password);

      if (response?.token) {
        setToken(response.token);
        setUser(response.usuario);
        handleSetUserLocalStorage(response);
        setSuccessLogin(true);
      }
      return response;
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Api.defaults.headers.common['Authorization'] = '';
    setUser(null);
    setSuccessLogin(false);
    // handleSetUserLocalStorage(null);
    await AsyncStorageLib.removeItem('token');
    await AsyncStorageLib.removeItem('user');
    setToken('');
  };

  return (
    <AuthContext.Provider
      value={{
        ...user,
        handleAuthentication,
        handleLogout,
        handleGetTherapist,
        therapies,
        products,
        handleGetUser,
        successLogin,
        isLoading,
        token,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * EXPORTS
 */
export {AuthContext, AuthProvider};
