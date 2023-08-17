/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { ITherapies } from "../../../dtos/therepies-dto";

// components
import { Button } from "../../../components/Button";
import { ActivityIndication } from "../../../components/Spinner";
import { QueryData } from "../../../components/QueryData";
import { ServiceLocation } from "../../../components/ServiceLocation";

// theme
import theme from "../../../styles/colors/theme";

import {
  Container,
  WrapperActivityIndication,
  WrapperText,
  Title,
  WrapperInfoScheduling,
  InfoLineScheduling,
  ContentIcon,
  TextInfoValueScheduling,
  TextScheduling,
  ContentIconCheck,
  TextInfoValueSchedulingCheck,
  TextSchedulingCheck,
  ContentIconDie,
  TextInfoValueSchedulingDie,
  TextSchedulingDie,
  WrapperButton,
  TextTitleButton,
  WrapperResume,
  InfoLineSchedulingMoney,
  ContentIconMoney,
  TextInfoValueSchedulingMoney,
  TextSchedulingMoney,
  InfoLineSchedulingStatus,
  BallStatus,
  ContentIconStatus,
  TextInfoValueSchedulingStatus,
  TextSchedulingStatus,
  InfoLineSchedulingClock,
  ContentIconClock,
  TextInfoValueSchedulingClock,
  TextSchedulingClock,
} from "./styles";
import { Card } from "../../../components/Card";
import { IUserTherapists } from "../../../dtos/therepies-user-dto";
import { Api } from "../../../services/api";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export function Dashboard() {
  const navigation = useNavigation();
  // const [ therapists, setTherapists ] = useState<IUserTherapists>();
  const [atendimentos, setAtendimentos] = useState();
  const [atendimentosLoading, setAtendimentosLoading] = useState(false);
  const [dadosConsulta, setDadosConsulta] = useState();
  const [consultaLoading, setConsultaLoading] = useState(false);
  const [spaces, setSpaces] = useState();
  const [spacesLoading, setSpacesLoading] = useState(false);

  const isFocused = useIsFocused();

  const fetchAtendimentos = async () => {
    setAtendimentosLoading(true);
    const res = await Api.get("v1/home/historico-atendimento-mes");
    setAtendimentos(res.data.data);
    setAtendimentosLoading(false);
  };
  const fetchDadosConsulta = async () => {
    setConsultaLoading(true);
    const res = await Api.get("/v1/home/dados-consulta");
    // console.log(res.data.data);
    setDadosConsulta(res.data.data);
    setConsultaLoading(false);
  };
  const fetchSpaces = async () => {
    setSpacesLoading(true);
    const res = await Api.get("v1/home/locais-atendimento");
    setSpaces(res.data.data);
    setSpacesLoading(false);
  };
  useEffect(() => {
    if (isFocused) {
      fetchAtendimentos();
      fetchDadosConsulta();
      fetchSpaces();
    }
  }, [isFocused]);
  // useEffect(()=> {
  //   async function handleUsers(){
  //     await axios.get('/api/spaces-therapists')
  //     .then((response)=> {
  //       setTherapists(response.data);
  //       setIsLoading(!isLoading);
  //       console.log(therapists?.therapists);
  //     })
  //     .catch((error)=> console.log('error em buscar users', error));
  //   }

  //   handleUsers();

  // }, []);
  return (
    <>
      {/* Container Main */}
      <Container>
        <WrapperText>
          <Title>Histórico de atendimento no mês</Title>
        </WrapperText>

        {atendimentosLoading ? (
          <ActivityIndication />
        ) : (
          <WrapperInfoScheduling>
            <InfoLineScheduling>
              <ContentIcon>
                <AntDesign
                  name="clockcircleo"
                  size={16}
                  color={theme.colors.gray_200}
                />
                <TextScheduling>Quantidade de agendamentos</TextScheduling>
              </ContentIcon>
              <TextInfoValueScheduling>
                {atendimentos?.quantidade_agendamentos}
              </TextInfoValueScheduling>
            </InfoLineScheduling>

            <InfoLineScheduling>
              <ContentIconCheck>
                <AntDesign name="check" size={20} color={theme.colors.green} />
                <TextSchedulingCheck>
                  Agendamentos concluídos
                </TextSchedulingCheck>
              </ContentIconCheck>
              <TextInfoValueSchedulingCheck>
                {atendimentos?.agendamentos_concluidos}
              </TextInfoValueSchedulingCheck>
            </InfoLineScheduling>

            <InfoLineScheduling>
              <ContentIconDie>
                <AntDesign name="close" size={20} color={theme.colors.red} />
                <TextSchedulingCheck>
                  Agendamentos cancelados
                </TextSchedulingCheck>
              </ContentIconDie>
              <TextInfoValueSchedulingDie>
                {atendimentos?.agendamentos_cancelados}
              </TextInfoValueSchedulingDie>
            </InfoLineScheduling>

            <WrapperButton>
              <Button
                width="100%"
                height="40px"
                background_color="#FFF"
                border={true}
                onPress={() => navigation.navigate("Consultas")}
              >
                <TextTitleButton>Histórico completo</TextTitleButton>
              </Button>
            </WrapperButton>
          </WrapperInfoScheduling>
        )}

        <QueryData />
        {consultaLoading ? (
          <ActivityIndication />
        ) : dadosConsulta?.categorias.length === 0 ? (
          <></>
        ) : (
          <WrapperResume>
            <InfoLineSchedulingMoney>
              <ContentIconMoney>
                <MaterialIcons
                  name="attach-money"
                  size={18}
                  color={theme.colors.gray_150}
                />
                <TextInfoValueSchedulingMoney>
                  Valor:
                </TextInfoValueSchedulingMoney>
              </ContentIconMoney>
              <TextSchedulingMoney>
                R$ {dadosConsulta?.categorias[0].terapeutas[0].pivot?.valor}
              </TextSchedulingMoney>
            </InfoLineSchedulingMoney>

            {/* <InfoLineSchedulingStatus>
              <ContentIconStatus>
                <BallStatus />
                <TextInfoValueSchedulingStatus>Status de desconto:</TextInfoValueSchedulingStatus>
              </ContentIconStatus>
              <TextSchedulingStatus>Desconto inativo</TextSchedulingStatus>
            </InfoLineSchedulingStatus> */}

            <InfoLineSchedulingClock>
              <ContentIconClock>
                <AntDesign name="clockcircleo" size={16} color="black" />
                <TextInfoValueSchedulingClock>
                  Tempo de duração
                </TextInfoValueSchedulingClock>
              </ContentIconClock>
              <TextSchedulingClock>
                {dadosConsulta?.categorias[0].terapeutas[0].pivot?.tempo}{" "}
                minutos
              </TextSchedulingClock>
            </InfoLineSchedulingClock>
          </WrapperResume>
        )}

        <ServiceLocation />
        <FlatList
          data={spaces?.empresas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card data={item} />}
        />
      </Container>
    </>
  );
}
