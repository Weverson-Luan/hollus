import { ModalProps } from "react-native";

interface IModalProps extends ModalProps {
  visible?: boolean;
  onChangeCep?: ((text: string) => void) | undefined;
  handleFetchCepAPI?: ()=> void;

  //values
  valueCep: string;
  onChangeCity: ((text: string) => void) | undefined;
  valueCity: string;
  valueLogadouro: string;
  onChangeLogadouro: ((text: string) => void) | undefined;
  valueDistrict: string;
  onChangeDistrict: ((text: string) => void) | undefined;
  valueNumber: string;
  onChangeNumber: ((text: string) => void) | undefined;
  valueComplement: string;
  onChangeComplement: ((text: string) => void) | undefined;

  //handle save andress
  handleSaveAndress: ()=> void;
  handleOnCloseModal: ()=> void;

}

/**
 * EXPORTS
 */
export { IModalProps };
