import { ITherapies } from "../../dtos/therepies-dto";

/**
 * IMPORTS
 */
interface ITherapist {
  therapie: any;
};

interface IContextTherapist extends ITherapist {
  handleGetTherapistInfo: (token?: string) => Promise<void>;
  isLoading: boolean;
};

interface ITherapistProvider {
  children: JSX.Element;
}


/**
 * EXPORT
 */
export type { ITherapist, IContextTherapist, ITherapistProvider };




