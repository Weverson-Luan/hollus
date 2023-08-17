/**
 * IMPORTS
 */
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthProvider";
import useAlert from "../context/hooks/Alert/useAlert";
import { useAuth } from "../context/hooks/Auth/useAuth";
import { rootNavigationRef } from "../routes/RootNavigation";

const Api = axios.create({
   baseURL: "https://api-hollus.worktabsystems.com.br/api",
  // baseURL: "http://192.168.1.3:8000/api",
});
const AxiosInterceptor = ({ children, auth }: any) => {
  const { setAlert } = useAlert();
  useEffect(() => {
    const resInterceptor = (response: any) => {
      return response;
    };
    const errInterceptor = (error: any) => {
      if (error.response.status === 401 && auth.successLogin) {
        auth.handleLogout();
        setAlert(
          "Aviso",
          "Você foi desconectado da sessão. Por favor, tente fazer login novamente."
        );
        // Alert.alert("Aviso", "Você foi desconectado da sessão. Por favor, tente fazer login novamente.",
        //   [
        //     {
        //       text: "OK",
        //       onPress: () => null
        //     }
        //   ]
        // )
      }

      return Promise.reject(error);
    };

    const interceptor = Api.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => Api.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

/**
 * EXPORTS
 */
export { Api, AxiosInterceptor };
