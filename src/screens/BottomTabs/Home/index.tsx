import React, {useState, useEffect, useRef, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'styled-components';

//icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

//typings
import {ITherapies} from '../../../dtos/therepies-dto';

//components
import {ActivityIndication} from '../../../components/Spinner';
import {HeaderDrawer} from '../../../components/HeaderDrawer';

//services
import {useTherapist} from '../../../context/hooks/Therapist/useTherapist';

import {
  Container,
  ImageLogo,
  WrapperActivityIndication,
  WrapperCardQuery,
  WrapperIcon,
  ContenInfoMain,
  ContentInfo,
  WrapperInfo,
  WrapperInfoProfile,
  WrapperInfoDescriptionLocation,
  WrapperInfoDescription,
  ImageProfile,
  TitleQuery,
  SubTitle,
  WrapperText,
  Title,
  TitleName,
  TitleMore,
  FlatListImage,
  BoxImage,
  WrapperImage,
  Image,
  TextImgageDescription,
  WrapperCardQueryRow,
  BorderRow,
} from './styles';
import {Api} from '../../../services/api';
import axios from 'axios';
import {
  getNews,
  getNextAppointment,
  getRecommended,
} from '../../../context/hooks/Home/useHome';
import {ModalNews} from '../../../components/ModalNews';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import useAlert from '../../../context/hooks/Alert/useAlert';
import {DotsThreeOutlineVertical} from 'phosphor-react-native';

export function Home({navigation}: any) {
  const theme = useTheme();
  const [news, setNews] = useState();
  const [appointment, setAppointment] = useState<any>();
  const [rec, setRec] = useState();
  const therapies = useTherapist() as any;
  const [recommendedLoading, setRecommendedLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [appointmentLoading, setAppointmentLoading] = useState(true);
  const [noticia, selectNoticia] = useState<any>();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const isFocused = useIsFocused();
  const {setAlert} = useAlert();

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const checkDayOfTheWeek = () => {
    const today = new Date().getDay();
    const weekday = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sàbado',
    ];
    const appDay =
      weekday[new Date(appointment?.data_hora.replace(' ', 'T')).getDay()];
    //@ts-ignore
    return today === appDay - 1 ? 'Amanhã' : appDay;
  };
  async function handleGetAppointments() {
    const response = await getNextAppointment();

    response.success && setAppointment(response.data);
    setAppointmentLoading(false);
  }
  async function handleGetNews() {
    const response = await getNews();
    response.success ? setNews(response.data) : null;
    setNewsLoading(false);
  }
  async function handleGetRecommended() {
    const response = await getRecommended();
    response.success && setRec(response.data);
    setRecommendedLoading(false);
  }

  async function getData() {
    checkDayOfTheWeek();
    await handleGetRecommended().then(
      async () =>
        await handleGetNews().then(async () => await handleGetAppointments()),
    );
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  return (
    <>
      {/* <HeaderDrawer notification /> */}
      <Container>
        {typeof appointment !== 'undefined' && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Appointment', {
                id: appointment?.id,
              })
            }>
            {appointmentLoading ? (
              <ActivityIndication />
            ) : (
              <WrapperCardQueryRow>
                <WrapperCardQuery>
                  <WrapperInfoProfile>
                    <ImageProfile
                      resizeMode="contain"
                      source={{
                        uri: appointment?.usuario_terapeuta?.link_foto,
                      }}
                    />
                    <WrapperInfoDescription>
                      <TitleName>
                        {appointment?.usuario_terapeuta?.nome}
                      </TitleName>
                    </WrapperInfoDescription>
                  </WrapperInfoProfile>

                  <ContentInfo>
                    <TitleQuery>
                      Dia da semana: {checkDayOfTheWeek()}
                    </TitleQuery>
                    <TitleQuery>
                      Data agendamento: {appointment?.data_hora?.slice(8, 10)}/
                      {appointment?.data_hora?.slice(5, 7)}/
                      {appointment?.data_hora?.slice(0, 4)}
                    </TitleQuery>
                  </ContentInfo>
                </WrapperCardQuery>

                <WrapperIcon>
                  <DotsThreeOutlineVertical color="black" size={32} />
                </WrapperIcon>
              </WrapperCardQueryRow>
            )}
          </TouchableOpacity>
        )}

        <BorderRow />
        <WrapperText>
          <Title>Recomendados</Title>
          {/* <TitleMore> Ver mais</TitleMore> */}
        </WrapperText>

        {recommendedLoading ? (
          <ActivityIndication />
        ) : (
          <BoxImage>
            <FlatListImage
              horizontal={true}
              data={rec}
              keyExtractor={(item: any) => item?.id}
              renderItem={({item}: any) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Pesquisar', {
                      cat: item,
                    })
                  }
                  style={{marginBottom: RFValue(15)}}>
                  <WrapperImage>
                    <Image
                      source={{
                        uri: item?.link_foto,
                      }}
                    />
                    <TextImgageDescription>{item?.nome}</TextImgageDescription>
                  </WrapperImage>
                </TouchableOpacity>
              )}
            />
          </BoxImage>
        )}

        <WrapperText>
          <Title>Notícias</Title>
          {/* <TitleMore> Ver mais</TitleMore> */}
        </WrapperText>
        <ActionSheet gestureEnabled closable ref={actionSheetRef}>
          <View
            style={{
              flexDirection: 'column',
              paddingRight: 17,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
              }}>
              {noticia?.titulo}
            </Text>
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                marginVertical: 10,
                paddingHorizontal: 10,
              }}>
              <Text>{noticia?.usuario.nome}</Text>
              <Text>
                {noticia?.created_at.substring(8, 10)} de{' '}
                {months[noticia?.created_at.substring(6, 7) - 1]} de{' '}
                {noticia?.created_at.substring(0, 4)}
              </Text>
            </View>
            <Image
              style={{
                marginVertical: 10,
                alignSelf: 'center',
                width: '100%',
                height: 200,
              }}
              source={{
                uri: noticia?.link_foto,
              }}
            />
            <Text
              style={{
                textAlign: 'justify',
                marginLeft: 20,
                marginRight: 10,
              }}>
              {noticia?.descricao}
            </Text>
          </View>
        </ActionSheet>
        {newsLoading ? (
          <ActivityIndication />
        ) : (
          <BoxImage>
            <FlatListImage
              horizontal={true}
              data={news}
              keyExtractor={(item: any) => item?.id}
              renderItem={({item}: any) => (
                <TouchableOpacity
                  onPress={() => (
                    actionSheetRef.current?.show(), selectNoticia(item)
                  )}
                  style={{marginBottom: RFValue(15)}}>
                  <WrapperImage>
                    <Image
                      source={{
                        uri: item?.link_foto,
                      }}
                    />
                    <TextImgageDescription>
                      {item?.titulo}
                    </TextImgageDescription>
                  </WrapperImage>
                </TouchableOpacity>
              )}
            />
          </BoxImage>
        )}
      </Container>
    </>
  );
}
