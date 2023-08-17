import React, { useEffect } from "react";
import { Pressable, Text, TouchableWithoutFeedback } from "react-native";
import useAlert from "../../context/hooks/Alert/useAlert";

import {
  Button,
  ButtonsRow,
  ButtonText,
  ModalBackground,
  ModalContainer,
  ModalText,
  ModalTitle,
  ModalWindow,
} from "./styles";
import { IModalProps } from "./types";

export function CustomAlert() {
  const { text, title, setAlert } = useAlert();
  const close = () => {
    setAlert("", "");
  };

  if (text && title) {
    return (
      <ModalBackground transparent animationType="fade" onRequestClose={close}>
        <ModalContainer onPress={close}>
          <Pressable>
            <ModalWindow>
              <ModalTitle>{title}</ModalTitle>
              <ModalText>{text}</ModalText>
              <ButtonsRow>
                <Button onPress={close}>
                  <ButtonText>OK</ButtonText>
                </Button>
                {/* {cancelAction ? (
                  <Button onPress={cancelAction}>
                    <ButtonText>Cancelar</ButtonText>
                  </Button>
                ) : null} */}
              </ButtonsRow>
            </ModalWindow>
          </Pressable>
        </ModalContainer>
      </ModalBackground>
    );
  } else {
    return <></>;
  }
}
