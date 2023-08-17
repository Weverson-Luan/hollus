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

const AuthContext = createContext<IContext>({} as IContext);
const AuthProvider = ({children}: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  const [therapies, setTherapies] = useState<ITherapies>(
    therapiesMocked as any,
  );
  const [products, setProducts] = useState<any>(productsMocked as any);
  const [successLogin, setSuccessLogin] = useState(false);

  const handlePersistLogin = async () => {
    // console.log("trying to fetch token");
    const res = await handlePersistLoginRequest();
    // console.log(res.user);
    if (res.success) {
      setUser(res.user);
      return res.success;
    }
    return res.success;
  };

  useEffect(() => {
    const handleUser = async () => {
      const user = await handleGetUserLocalStorage();

      if (user) {
        setUser(user);
        const tryLogin = await handlePersistLogin();
        // console.log(`persist ${tryLogin}`);
        tryLogin ? setSuccessLogin(true) : setSuccessLogin(false);
      }
    };
    handleUser();
    // console.log("auth context");
  }, []);

  const handleGetUser = () => {
    // console.log("get user");
    return user;
  };

  const handleAuthentication = async (email: string, password: string) => {
    try {
      const response = await handleLoginRequest(email, password);
      if (response.token) {
        setUser(response.usuario);
        handleSetUserLocalStorage(response);
        setSuccessLogin(true);
        // console.log(response);
      }
      return response;
    } catch (error) {
      return;
    }
  };

  const handleLogout = async () => {
    Api.defaults.headers.common['Authorization'] = '';
    setUser(null);
    setSuccessLogin(false);
    // handleSetUserLocalStorage(null);
    await AsyncStorageLib.removeItem('token');
    await AsyncStorageLib.removeItem('user');
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * EXPORTS
 */
export {AuthContext, AuthProvider};
