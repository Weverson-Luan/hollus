import React, { useState } from "react";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

// components
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";

// services
import { TherapiesAvailable } from "../../../services/api.fake.terapias-disponiveis";

// styled-components
import {
  Container,
  WrapperHeader,
  WrapperDescription,
  Title,
  SubTitle,
  WrapperTherapy,
  TitleTherapy,
  SubTitleTherapy,
  WrapperButtons,
  TitleSearchTherapy,
} from "./styles";

export function RegisterSepThree() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [therapiesAvailable, setTherapiesAvailable] = useState(false);
  const [therapiesAvailableTwo, setTherapiesAvailableTwo] = useState(false);
  const [therapiesAvailableThree, setTherapiesAvailableThree] = useState(false);
  const [therapiesAvailableFour, setTherapiesAvailableFour] = useState(false);

  function handleTherapies() {
    setTherapiesAvailable(!therapiesAvailable);
  }
  function handleTherapiesTwo() {
    setTherapiesAvailableTwo(!therapiesAvailableTwo);
  }
  function handleTherapiesAvailableThree() {
    setTherapiesAvailableThree(!therapiesAvailableThree);
  }
  function handleTherapiesAvailableFour() {
    setTherapiesAvailableFour(!therapiesAvailableFour);
  }
  return (
    <>
      <WrapperHeader>
        <Header
          background_color1={theme.colors.orange_100}
          background_color2={theme.colors.orange_100}
          background_color3={theme.colors.orange_100}
          text_color3={theme.colors.orange_100}
        />
      </WrapperHeader>
      <Container>
        <WrapperDescription>
          <Title>Preferências</Title>
          <SubTitle>
            Escolha abaxio o que procura na plataforma e iremos indicar
            recomendações baseadas nas suas escolhas.
          </SubTitle>
        </WrapperDescription>

        <TitleTherapy style={{}}>Tipos de terapia</TitleTherapy>

        <WrapperTherapy>
          <Button
            width="24%"
            height="40px"
            background_color={
              therapiesAvailable ? theme.colors.orange_100 : theme.colors.white
            }
            border
            onPress={() => handleTherapies()}
          >
            <SubTitleTherapy text_select={therapiesAvailable}>
              Corporal
            </SubTitleTherapy>
          </Button>

          <Button
            width="30%"
            height="40px"
            background_color={
              therapiesAvailableTwo
                ? theme.colors.orange_100
                : theme.colors.white
            }
            border
            onPress={() => handleTherapiesTwo()}
          >
            <SubTitleTherapy text_select={therapiesAvailableTwo}>
              Mindfuliness
            </SubTitleTherapy>
          </Button>

          <Button
            width="40%"
            height="40px"
            background_color={
              therapiesAvailableThree
                ? theme.colors.orange_100
                : theme.colors.white
            }
            border
            onPress={() => handleTherapiesAvailableThree()}
          >
            <SubTitleTherapy text_select={therapiesAvailableThree}>
              Tratamentos
            </SubTitleTherapy>
          </Button>

          <Button
            width="20%"
            height="40px"
            background_color={theme.colors.white}
            border
            onPress={() => handleTherapiesAvailableFour()}
          >
            <SubTitleTherapy text_select={therapiesAvailableFour}>
              Coach
            </SubTitleTherapy>
          </Button>
        </WrapperTherapy>

        {therapiesAvailable && (
          <>
            <TitleTherapy>Terapias disponíveis</TitleTherapy>

            <WrapperTherapy>
              {TherapiesAvailable.map((therapies) => (
                <Button
                  height="40px"
                  background_color={theme.colors.white}
                  border
                  onPress={() => handleTherapies()}
                  key={therapies.id}
                >
                  <SubTitleTherapy>{therapies.name_terapia}</SubTitleTherapy>
                </Button>
              ))}
            </WrapperTherapy>
          </>
        )}
      </Container>
      <WrapperButtons>
        <Button
          width="100%"
          height="45px"
          background_color={theme.colors.orange}
          border
          onPress={() => navigation.navigate("RegisterSeptFour")}
        >
          <TitleSearchTherapy>Próximo</TitleSearchTherapy>
        </Button>
      </WrapperButtons>
    </>
  );
}
