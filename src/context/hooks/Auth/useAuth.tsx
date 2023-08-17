/**
 * IMPORTS
 */
import { useContext } from "react";
import { Api } from "../../../services/api";
import { AuthContext } from "../../AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export const useRegister = async (
  values: any
) => {
  // console.log(values)
  const res = await Api.post("register", values).then(res => console.log(res)).catch(err => console.log(err));
  return res;
};

/**
 * EXPORTS
 */
export { useAuth };
