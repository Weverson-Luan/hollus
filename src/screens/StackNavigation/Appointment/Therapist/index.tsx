import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//icons vector-icons
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

//components
import { Button } from "../../../components/Button";

//styled-components
import {
  Container,
  Content,
  ImageTherapist,
  WrapperInfo,
  Title,
  WrapperHeader,
  WrapperLocation,
  WrapperLocationHeader,
  WrapperLocationIcon,
  TitleLocationMap,
  SubTitleLocation,
  WrapperButton,
  ContentButton,
} from "./styles";
import { View, Text } from "react-native";
import { ModalCancelScheduling } from "../../../../components/ModalCancelScheduling";
import { Api } from "../../../../services/api";
import { ActivityIndication } from "../../../../components/Spinner";

export function AppointmentTherapist() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [consulta, setConsulta] = useState();
  const fetchInfo = async () => {
    const res = await Api.get("/v1/consulta/info/" + params?.consulta);
    setConsulta(res.data.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <>
      <Container>
        {loading ? (
          <ActivityIndication />
        ) : (
          <Content>
            <ImageTherapist
              source={{
                uri: consulta?.usuario_paciente.link_foto,
              }}
            />
            <WrapperInfo>
              <WrapperHeader>
                <Title>{consulta?.usuario_paciente.nome}</Title>
              </WrapperHeader>

              <WrapperLocation>
                <WrapperLocationHeader>
                  <WrapperLocationIcon>
                    <FontAwesome
                      name="calendar"
                      size={18}
                      color={theme.colors.gray_150}
                    />
                    <SubTitleLocation>Dia da Consulta:</SubTitleLocation>
                  </WrapperLocationIcon>

                  <TitleLocationMap>
                    {consulta?.data_hora.substring(8, 10)}/
                    {consulta?.data_hora.substring(5, 7)}/
                    {consulta?.data_hora.substring(0, 4)}
                  </TitleLocationMap>
                </WrapperLocationHeader>

                <WrapperLocationHeader>
                  <WrapperLocationIcon>
                    <FontAwesome5
                      name="clock"
                      size={18}
                      color={theme.colors.gray_80}
                    />
                    <SubTitleLocation>Horário da Consulta:</SubTitleLocation>
                  </WrapperLocationIcon>

                  <TitleLocationMap>
                    {consulta?.data_hora.substring(11, 16)}
                  </TitleLocationMap>
                </WrapperLocationHeader>

                {/* <WrapperLocationHeader>
                <WrapperLocationIcon>
                  <Entypo
                    name="location-pin"
                    size={18}
                    color={theme.colors.gray_80}
                  />
                  <SubTitleLocation>Espaço Terapeuta Soluar</SubTitleLocation>
                </WrapperLocationIcon>
              </WrapperLocationHeader> */}

                <SubTitleLocation>
                  {consulta?.usuario_terapeuta.endereco}
                </SubTitleLocation>
              </WrapperLocation>
            </WrapperInfo>
          </Content>
        )}
      </Container>

      {loading ? (
        <ActivityIndication />
      ) : (
        <WrapperButton>
          <ContentButton>
            <ModalCancelScheduling
              isModalCancel={isModalCancel}
              data={consulta}
              onIsModalCancel={() => setIsModalCancel(true)}
              disabled={consulta?.status !== "aguardando"}
              disabledText={
                consulta?.status === "finalizada"
                  ? "Finalizada"
                  : consulta?.status === "cancelada"
                  ? "Cancelada"
                  : consulta?.status === "Confirmada"
                  ? "Confirmada"
                  : null
              }
            />
          </ContentButton>
        </WrapperButton>
      )}
    </>
  );
}
