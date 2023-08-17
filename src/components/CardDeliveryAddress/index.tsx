/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useTheme } from "styled-components";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { Modal } from "../Modal";
import {
  Container,
  Header,
  Title,
  WrapperEdit,
  TitleEdit,
  TitleDeliveryAddress,
  WrapperAddress,
  TitleAddress,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export function CardDeliveryAddress({ address }) {
  const theme = useTheme();
  const [visible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <Container>
      <Header>
        <TitleDeliveryAddress>Endereço de entrega</TitleDeliveryAddress>

        {/* <WrapperEdit
          onPress={() => navigation.navigate("Enderecos", { select: true })}
        >
          <FontAwesome
            name="pencil"
            size={18}
            color={theme.colors.orange_100}
          />
          <TitleEdit>Editar</TitleEdit>
        </WrapperEdit> */}
      </Header>
      <WrapperAddress>
        <Entypo name="location-pin" size={22} color={theme.colors.gray_80} />
        <TitleAddress>{address}</TitleAddress>
      </WrapperAddress>
      {/* <Header>
        <Title>Valor do frete :</Title>

        <Title>R$ 12,00</Title>
      </Header> */}
    </Container>
  );
}
