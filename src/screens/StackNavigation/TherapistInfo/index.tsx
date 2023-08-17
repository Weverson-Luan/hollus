/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import {
  Container,
  Content,
  ImageTherapist,
  WrapperInfo,
  Title,
  WrapperHeader,
  ContentPonts,
  TitlePonts,
  WrapperAbout,
  TitleAbout,
  SubTitleAbout,
  WrapperExperience,
  TitleExperience,
  SubTitleExperience,
  WrapperAcademicFormation,
  TitleAcademicFormation,
  SubTitleAcademicFormation,
  WrapperLocation,
  WrapperLocationHeader,
  WrapperLocatinIcon,
  TitleLocationMap,
  TitleLocation,
  SubTitleLocation,
  WrapperAboutQuery,
  TitleAboutQuery,
  SubTitleAboutQuery,
  WrapperClassification,
  TitleClassification,
  WrapperClassificationHeader,
  ContentClassification,
  WrapperClassificationIcon,
  SubTitleClassification,
  SubTitleClassificationPont,
  TitleComment,
  WrapperComment,
  WrapperCommentHeader,
  ImageUserComment,
  WrapperCommentInfo,
  SubTitleComment,
  WrapperDescription,
  DesctiptionTextComment,
  WrapperButton,
  TextButton,
} from "./styles";
import { Button } from "../../../components/Button";
import { ActivityIndication } from "../../../components/Spinner";
import { Alert, Linking, TouchableOpacity } from "react-native";
import { Api } from "../../../services/api";
import useAlert from "../../../context/hooks/Alert/useAlert";
import { TitleSpots } from "../Therapist/styles";
import MandalaSVG from "../../../assets/svg/mandala.svg";
import { RFValue } from "react-native-responsive-fontsize";

export function TherapistInfo() {
  const route = useRoute();
  const [myInfo, setMyInfo] = useState();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { setAlert } = useAlert();
  const fetchMyInfo = async () => {
    setLoading(true);
    const { data } = await Api.get("v1/user/my-info");
    setMyInfo(data.data);
    // console.log(data.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchMyInfo();
  }, []);
  return (
    <Container>
      {loading ? (
        <ActivityIndication />
      ) : (
        <Content>
          <ImageTherapist
            source={{
              uri: myInfo?.link_foto,
            }}
          />
          <WrapperInfo>
            <WrapperHeader>
              <Title>{myInfo?.nome}</Title>

              <ContentPonts>
                <TitleSpots>3</TitleSpots>
                <MandalaSVG width={RFValue(20)} height={RFValue(20)} />
                <MandalaSVG width={RFValue(20)} height={RFValue(20)} />
                <MandalaSVG width={RFValue(20)} height={RFValue(20)} />
              </ContentPonts>
            </WrapperHeader>

            <WrapperAbout>
              <TitleAbout>Sobre o terapeuta</TitleAbout>
              <SubTitleAbout>{myInfo?.sobre}</SubTitleAbout>
            </WrapperAbout>

            <WrapperExperience>
              <TitleExperience>Experiências</TitleExperience>
              <SubTitleExperience>{myInfo?.experiencias}</SubTitleExperience>
            </WrapperExperience>

            <WrapperAcademicFormation>
              <TitleAcademicFormation>Formação</TitleAcademicFormation>
              <SubTitleAcademicFormation>
                {myInfo?.formacao}
              </SubTitleAcademicFormation>
            </WrapperAcademicFormation>

            <WrapperLocation>
              <WrapperLocationHeader>
                <TitleLocation>Localização</TitleLocation>
                {myInfo?.lat && myInfo?.long ? (
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        `google.navigation:q=${myInfo?.lat}+${myInfo?.long}`
                      ).catch(() =>
                        setAlert(
                          "Erro ao abrir o mapa",
                          "Verifique se o dispositivo possui um aplicativo de navegação instalado."
                        )
                      )
                    }
                    // onPress={() => {
                    //   const scheme = Platform.select({
                    //     ios: "maps:0,0?q=",
                    //     android: "geo:0,0?q=",
                    //   });
                    //   const latLng = `${therapistInfo?.lat},${therapistInfo?.long}`;
                    //   const label = "Hollus";
                    //   const url = Platform.select({
                    //     ios: `${scheme}${label}@${latLng}`,
                    //     android: `${scheme}${latLng}(${label})`,
                    //   });
                    //   linkTo(url);
                    // }}
                  >
                    <TitleLocationMap>Ver no mapa</TitleLocationMap>
                  </TouchableOpacity>
                ) : null}
              </WrapperLocationHeader>

              <WrapperLocatinIcon>
                <Entypo
                  name="location-pin"
                  size={16}
                  color={theme.colors.gray_80}
                />
                {/* <SubTitleLocation></SubTitleLocation> */}
              </WrapperLocatinIcon>
              <SubTitleLocation>{`${myInfo?.endereco_logradouro}${
                myInfo?.endereco_numero
                  ? ", número " + myInfo?.endereco_numero
                  : ""
              }${
                myInfo?.endereco_complemento
                  ? ", " + myInfo?.endereco_complemento + ","
                  : ","
              } ${myInfo?.endereco_bairro}, ${myInfo?.endereco_cidade} - ${
                myInfo?.endereco_estado
              }`}</SubTitleLocation>
            </WrapperLocation>

            <WrapperAboutQuery>
              <TitleAboutQuery>Sobre a consulta</TitleAboutQuery>
              <SubTitleAboutQuery>{myInfo?.sobre_consulta}</SubTitleAboutQuery>
            </WrapperAboutQuery>

            <WrapperClassification>
              <TitleClassification>Classificação</TitleClassification>

              <WrapperClassificationHeader>
                <ContentClassification>
                  <WrapperClassificationIcon>
                    <SubTitleClassificationPont>
                      {myInfo?.nota_media}
                    </SubTitleClassificationPont>
                  </WrapperClassificationIcon>

                  <SubTitleClassification>30 avaliações</SubTitleClassification>
                </ContentClassification>
              </WrapperClassificationHeader>
            </WrapperClassification>
            {/* <TitleComment>Comentários</TitleComment>
            <WrapperCommentInfo>
              <WrapperComment>
                <ImageUserComment
                  source={{
                    uri: "https://s3-sa-east-1.amazonaws.com/doctoralia.com.br/doctor/b54941/b5494173c4942a21e97bd0baf3fdc756_large.jpg",
                  }}
                />

                <WrapperCommentHeader>
                  <TitleComment>Luann Sousa</TitleComment>
                  <SubTitleComment>Avaliação em 18/02/2022</SubTitleComment>
                </WrapperCommentHeader>
              </WrapperComment>

              <WrapperDescription>
                <DesctiptionTextComment>
                  O profissional Pedro Gabriel e um fantástico, me ajudou a
                  curar todas as minhas dores nas costas. Recomendo uma consulta
                  com ele para todos.
                </DesctiptionTextComment>
              </WrapperDescription>
            </WrapperCommentInfo> */}
          </WrapperInfo>

          <WrapperButton>
            <Button
              width="100%"
              height="40px"
              background_color={theme.colors.gray_50}
              disabled
            >
              <TextButton>Agendar consulta</TextButton>
            </Button>
          </WrapperButton>
        </Content>
      )}
    </Container>
  );
}
