import React, { useState } from "react";
import { Modal as ModalNative } from "react-native";
import { useTheme } from "styled-components";
import { Button } from "../Button";
import { Input } from "../Input";
import { IModalProps } from "./modal";

import {
  Wrapper,
  Title,
  WrapperModal,
  LabelText,
  WrapperButton,
} from "./styles";

export function Modal({ visible, ...rest }: IModalProps) {
  const theme = useTheme();
  return (
    <ModalNative {...rest} visible={visible}>
      <Wrapper>
        <Title>Edite suas informaçãos </Title>

        <WrapperModal>
          <LabelText>Cidade</LabelText>
          <Input
            color="white"
            height="50px"
            width="100%"
            placeholder="Informe sua cidade"
          />

          <LabelText>Rua</LabelText>
          <Input
            color="white"
            height="50px"
            width="100%"
            placeholder="Informe sua rua"
          />

          <LabelText>Bairro</LabelText>
          <Input
            color="white"
            height="50px"
            width="100%"
            placeholder="Informe seu bairro"
          />

          <LabelText>Numero</LabelText>
          <Input
            color="white"
            height="50px"
            width="100%"
            placeholder="Informe seu número"
          />

          <LabelText>Complemento</LabelText>
          <Input
            color="white"
            height="50px"
            width="100%"
            placeholder="Complemento ex: Bloco 01"
          />
        </WrapperModal>

        <WrapperButton>
          <Button
            width="100%"
            height="40px"
            background_color={theme.colors.orange_100}
          >
            <LabelText>Alterar iformações</LabelText>
          </Button>
        </WrapperButton>
      </Wrapper>
    </ModalNative>
  );
}
