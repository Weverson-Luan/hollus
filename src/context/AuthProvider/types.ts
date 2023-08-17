import { ITherapies } from "../../dtos/therepies-dto";

/**
 * IMPORTS
 */
interface IUser {
  email?: string;
  token?: string;
  therapies: ITherapies;
  products: any;
};

interface IContext extends IUser {
  handleAuthentication: (email: string, password: string) => Promise<void>;
  handleLogout: () => any;
  handleGetUser: () => any;
  handleGetTherapist: () => Promise<void>;
  successLogin: any;
};

interface IAuthProvider {
  children: JSX.Element;
}


/**
 * EXPORT
 */
export { IUser, IContext, IAuthProvider };




