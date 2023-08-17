import React, { useEffect, useRef, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

//icons
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

//components
import { Button } from "../../../../components/Button";

//styled-components
import {
  Container,
  Content,
  ImageTherapist,
  WrapperInfo,
  Title,
  WrapperHeader,
  ContentPonts,
  TitlePonts,
  WrapperLocation,
  WrapperLocationHeader,
  WrapperLocatinIcon,
  TitleLocationMap,
  SubTitleLocation,
  WrapperButton,
  ContentButton,
  TextButton,
  OpenMapText,
} from "./styles";
import {
  cancelAppointment,
  getAppointment,
} from "../../../../context/hooks/Appointment/useAppointment";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { Alert, Linking, Text, View, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { ActivityIndication } from "../../../../components/Spinner";
import useAlert from "../../../../context/hooks/Alert/useAlert";
import { ContentSpots, TitleSpots } from "../../Therapist/styles";
import MandalaSVG from "../../../../assets/svg/mandala.svg";
import {
  CategoriaRow,
  CategoriaIcon,
  CategoriaInfoContainer,
  CategoriaInfoRow,
  CategoriaTitle,
  CategoriaInfoTitle,
  CategoriaInfoValue,
} from "../../ScheduleAppointment/styles";

export function AppointmentClient({ route, navigation }) {
  const theme = useTheme();
  const [appointment, setAppointment] = useState({});
  const isFocused = useIsFocused();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [loading, setLoading] = useState(true);
  const { setAlert } = useAlert();

  const fecthAppointment = async () => {
    const res = await getAppointment(route.params.id);
    setAppointment(res.data);
    setLoading(false);
  };

  const handleCancel = async () => {
    setLoading(true);
    const res = await cancelAppointment(appointment?.id);
    setAlert(
      "Cancelamento de consulta",
      res.success ? "Consulta cancelada com sucesso!" : res.data.message
    );
    navigation.navigate("Consultas");
    // Alert.alert(
    //   "Cancelamento de consulta",
    //   res.success ? "Consulta cancelada com sucesso!" : res.data.message,
    //   [
    //     {
    //       text: "OK",
    //       onPress: () => navigation.navigate("Consultas"),
    //     },
    //   ]
    // );
  };

  const formatTempo = (tempo) => {
    if (tempo >= 60) {
      const h = Math.floor(tempo / 60);
      const m = tempo % 60;
      return `${h}h ${m}min.`;
    }
    return `${tempo} minutos`;
  };

  useEffect(() => {
    fecthAppointment();
  }, [isFocused]);

  return (
    <>
      {loading ? (
        <ActivityIndication />
      ) : (
        <>
          <Container>
            {appointment?.status !== "finalizada" ? (
              <ActionSheet gestureEnabled closable ref={actionSheetRef}>
                <View
                  style={{
                    flexDirection: "column",
                    marginHorizontal: RFValue(30),
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      textAlign: "center",
                      marginBottom: RFValue(30),
                    }}
                  >
                    Cancelamento de Consulta
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: "justify",
                      marginBottom: RFValue(30),
                    }}
                  >
                    Tem certeza que deseja{" "}
                    <Text style={{ fontWeight: "bold" }}>cancelar</Text> a
                    consulta com {appointment?.usuario_terapeuta.nome} no dia{" "}
                    {appointment?.data_hora?.slice(8, 10)}/
                    {appointment?.data_hora?.slice(5, 7)}/
                    {appointment?.data_hora?.slice(0, 4)} às{" "}
                    {appointment?.data_hora?.slice(11, 16)}?
                  </Text>
                  <Button
                    width="100%"
                    height="50px"
                    background_color={theme.colors.red}
                    border
                    onPress={() => {
                      handleCancel();
                    }}
                  >
                    <TextButton>Confirmar cancelamento</TextButton>
                  </Button>
                </View>
              </ActionSheet>
            ) : null}
            <Content>
              <ImageTherapist
                source={{
                  uri: appointment?.usuario_terapeuta?.link_foto,
                }}
              />
              <WrapperInfo>
                <WrapperHeader>
                  <Title>{appointment?.usuario_terapeuta?.nome}</Title>

                  <ContentSpots>
                    {/* <TitleSpots>{therapistInfo?.nota_media}</TitleSpots> */}
                    <TitleSpots>3</TitleSpots>
                    {/* <AntDesign
                  name="star"
                  size={14}
                  color={theme.colors.orange_100}
                /> */}
                    <MandalaSVG width={RFValue(20)} height={RFValue(20)} />
                    <MandalaSVG width={RFValue(20)} height={RFValue(20)} />
                    <MandalaSVG width={RFValue(20)} height={RFValue(20)} />
                  </ContentSpots>
                </WrapperHeader>

                <WrapperLocation>
                  <WrapperLocationHeader>
                    <WrapperLocatinIcon>
                      <FontAwesome
                        name="calendar"
                        size={18}
                        color={theme.colors.gray_80}
                      />
                      <SubTitleLocation>Dia da Consulta:</SubTitleLocation>
                    </WrapperLocatinIcon>

                    <TitleLocationMap>
                      {appointment?.data_hora?.slice(8, 10)}/
                      {appointment?.data_hora?.slice(5, 7)}/
                      {appointment?.data_hora?.slice(0, 4)}
                    </TitleLocationMap>
                  </WrapperLocationHeader>

                  <WrapperLocationHeader>
                    <WrapperLocatinIcon>
                      <FontAwesome5
                        name="clock"
                        size={18}
                        color={theme.colors.gray_80}
                      />
                      <SubTitleLocation>Horário da Consulta:</SubTitleLocation>
                    </WrapperLocatinIcon>

                    <TitleLocationMap>
                      {appointment?.data_hora?.slice(11, 16)}
                    </TitleLocationMap>
                  </WrapperLocationHeader>
                  <WrapperLocationHeader>
                    <WrapperLocatinIcon>
                      <Entypo
                        name="location-pin"
                        size={18}
                        color={theme.colors.gray_80}
                      />
                      {appointment?.usuario_terapeuta?.lat !== null &&
                      appointment?.usuario_terapeuta?.long !== null ? (
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(
                              `google.navigation:q=${appointment?.usuario_terapeuta?.lat}+${appointment?.usuario_terapeuta?.long}`
                            ).catch(() =>
                              setAlert(
                                "Erro ao abrir o mapa",
                                "Verifique se o dispositivo possui um aplicativo de navegação instalado."
                              )
                            )
                          }
                        >
                          <OpenMapText>Ver no mapa</OpenMapText>
                        </TouchableOpacity>
                      ) : null}
                      <SubTitleLocation>
                        {appointment?.usuario_terapeuta?.espaco}
                      </SubTitleLocation>
                    </WrapperLocatinIcon>
                  </WrapperLocationHeader>

                  <SubTitleLocation>
                    {appointment?.usuario_terapeuta?.endereco_completo}
                  </SubTitleLocation>
                </WrapperLocation>
                <CategoriaRow onPress={() => console.log(appointment)} selected={true}>
                  <CategoriaIcon
                    source={{
                      uri: appointment.categoria.link_foto,
                    }}
                    resizeMode="cover"
                  />
                  <CategoriaInfoContainer>
                    <CategoriaInfoRow>
                      <CategoriaTitle selected={true}>
                        {appointment.categoria.nome}
                      </CategoriaTitle>
                    </CategoriaInfoRow>
                    <CategoriaInfoRow>
                      <CategoriaInfoTitle selected={true}>
                        Valor:
                      </CategoriaInfoTitle>
                      <CategoriaInfoValue selected={true}>
                        R${appointment.categoria.valor}
                      </CategoriaInfoValue>
                    </CategoriaInfoRow>
                    <CategoriaInfoRow>
                      <CategoriaInfoTitle selected={true}>
                        Tempo:
                      </CategoriaInfoTitle>
                      <CategoriaInfoValue selected={true}>
                        {formatTempo(appointment.categoria.temp)}
                      </CategoriaInfoValue>
                    </CategoriaInfoRow>
                  </CategoriaInfoContainer>
                </CategoriaRow>
              </WrapperInfo>
            </Content>
          </Container>
          <WrapperButton>
            <ContentButton>
              <Button
                width="100%"
                height="50px"
                background_color={theme.colors.orange_100}
                border
                onPress={() => {
                  navigation.navigate("ScheduleConsultation", {
                    therapist: appointment?.usuario_terapeuta,
                    category: appointment?.categoria,
                    appointment_id: appointment?.id,
                    changeAppointment: true,
                  });
                }}
              >
                <TextButton>Alterar consulta</TextButton>
              </Button>
              {appointment?.status !== "finalizada" ? (
                <Button
                  width="100%"
                  height="50px"
                  background_color={theme.colors.red}
                  border
                  onPress={() => {
                    actionSheetRef.current.show();
                  }}
                >
                  <TextButton>Cancelar consulta</TextButton>
                </Button>
              ) : null}
            </ContentButton>
          </WrapperButton>
        </>
      )}
    </>
  );
}
