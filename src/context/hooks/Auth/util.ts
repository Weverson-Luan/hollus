/**
 * IMPORTS
 */
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { Api } from '../../../services/api';
import { IUser } from '../../AuthProvider/types';


const handleLoginRequest = async (email: string, password: string) => {
  try {
    const request = await Api.post("login", { email, password});
    await AsyncStorageLib.setItem('token', request.data.token);
    Api.defaults.headers.common['Authorization'] ='Bearer ' + request.data.token;
    return request.data;
  } catch (error) {
    return error;
  }
};

const handlePersistLoginRequest = async () => {
  try {
    const user = JSON.parse(await AsyncStorageLib.getItem('user'));
    // console.log(user.token);
    if(user !== null){
      // console.log('token found');
      Api.defaults.headers.common['Authorization'] ='Bearer ' + user.token;
      // console.log('persist login test');
      const res = await Api.get("v1/user/my-info");
      if(res.status === 200){
        return {
          success: true,
          user: res.data.data
        };
     }
     return {
      success: false
     };
    }
    // console.log('no token found');
    return {
      success: false
     };
  } catch (error) {
    return {
      success: false
     };
  }
};

const handleSetUserLocalStorage = async (user: IUser | null) => {
  const formatted = JSON.stringify(user);
  await AsyncStorageLib.setItem('user', formatted);
};

const handleGetUserLocalStorage = async () => {
  const responseJson = await AsyncStorageLib.getItem('user');
  // console.log('getting user');
  if(!responseJson){
    return null;
  }else{
    const user = JSON.parse(responseJson);

    return user;
  }

 
};
const handleGetToken = async ()=> {
  const responseJson = await AsyncStorageLib.getItem('token');
  // console.log('getting user');
  if(!responseJson){
    return null;
  };
  return responseJson;
}
const handleLogoutInterceptor = async () => {
  // handleSetUserLocalStorage(null);
  await AsyncStorageLib.removeItem("token");
  await AsyncStorageLib.removeItem("user");
};


/**
 * EXPORTS
 */
export { handleLoginRequest, handleGetToken, handlePersistLoginRequest, handleSetUserLocalStorage, handleGetUserLocalStorage, handleLogoutInterceptor };