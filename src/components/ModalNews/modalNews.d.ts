import { ModalProps } from "react-native";

interface IModalProps extends ModalProps {
  visible: boolean;
  noticia: object;
  close: Function;
}

/**
 * EXPORTS
 */
export { IModalProps };
