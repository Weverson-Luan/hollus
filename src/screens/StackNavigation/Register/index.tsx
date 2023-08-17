import React from "react";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

// assets
import RegisterSVG from "../../../assets/svg/cadastro.svg";

// components
import { Button } from "../../../components/Button";

// style-components
import {
  Container,
  WrapperImageSVG,
  WrapperDescription,
  Title,
  SubTitle,
  WrapperButtons,
  TitleSearchTherapy,
  TitleAm,
  TitleSpace,
} from "./styles";

export function Register() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Container>
      <WrapperImageSVG>
        <RegisterSVG width={350} height={300} />
      </WrapperImageSVG>

      <WrapperDescription>
        <Title>olá,</Title>
        <SubTitle>
          Para iniciarmos, escolha abaixo a opção que você se encaixa melhor
        </SubTitle>
      </WrapperDescription>

      <WrapperButtons>
        <Button
          width="100%"
          height="45px"
          background_color={theme.colors.orange}
          border
          onPress={() => navigation.navigate("RegisterSeptOne")}
        >
          <TitleSearchTherapy>Busco uma terapia</TitleSearchTherapy>
        </Button>

        <Button
          width="100%"
          height="45px"
          background_color={theme.colors.white}
          border
          onPress={() => navigation.navigate("RegisterTherapist")}
          // onPress={() => navigation.navigate("RegisterTherapistStep2")}
        >
          <TitleAm>Sou um profissional</TitleAm>
        </Button>

        <Button
          width="100%"
          height="45px"
          background_color={theme.colors.white}
          border
        >
          <TitleSpace>Sou um espaço ou empresa</TitleSpace>
        </Button>
      </WrapperButtons>
    </Container>
  );
}
