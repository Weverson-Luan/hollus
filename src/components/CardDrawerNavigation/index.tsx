import { useNavigation } from "@react-navigation/native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

export function CardDrawerNavigation({ data }: any) {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate(data.route)}>
      <FontAwesome
        name={data.name_Icon}
        size={18}
        color={theme.colors.orange_100}
      />
      <Title style={{}}>{data.name}</Title>
    </Container>
  );
}
