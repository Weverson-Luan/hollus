import React, {useState, useRef, useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

//components
import {ActivityIndication} from '../../../components/Spinner';

import {
  Container,
  WrapperCardQuery,
  WrapperIcon,
  ContentInfo,
  WrapperInfoProfile,
  WrapperInfoDescription,
  ImageProfile,
  TitleQuery,
  WrapperText,
  Title,
  TitleName,
  FlatListImage,
  BoxImage,
  WrapperImage,
  Image,
  TextImgageDescription,
  WrapperCardQueryRow,
  BorderRow,
} from './styles';

import {
  getNews,
  getNextAppointment,
  getRecommended,
} from '../../../context/hooks/Home/useHome';

import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {DotsThreeOutlineVertical} from 'phosphor-react-native';
import {Loading} from '../../../components/Loading';

export function Home({navigation}: any) {
  const [news, setNews] = useState<any>();
  const {navigate} = useNavigation();
  const [appointment, setAppointment] = useState<any>();
  const [rec, setRec] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [recommendedLoading, setRecommendedLoading] = useState(true);

  const [newsLoading, setNewsLoading] = useState(true);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [noticia, selectNoticia] = useState<any>();
  const actionSheetRef = useRef<ActionSheetRef>(null);

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
    try {
      setAppointmentLoading(true);
      const response = await getNextAppointment();
      response.success && setAppointment(response.data);
    } catch (error) {
      //tratamento de error
    } finally {
      setAppointmentLoading(false);
      setIsLoading(false);
    }
  }

  async function handleGetNews() {
    try {
      const response = await getNews();
      response.success ? setNews(response.data) : null;
      setNewsLoading(false);
    } catch (error) {
      //tratamento de error
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetRecommended() {
    try {
      setIsLoading(true);
      const response = await getRecommended();
      response.success && setRec(response.data);
      setRecommendedLoading(false);
    } catch (error) {
      //tratamento de error
    } finally {
      setIsLoading(false);
    }
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
      {isLoading ? (
        <Loading />
      ) : (
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
                        Data agendamento: {appointment?.data_hora?.slice(8, 10)}
                        /{appointment?.data_hora?.slice(5, 7)}/
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
                      <TextImgageDescription>
                        {item?.nome}
                      </TextImgageDescription>
                    </WrapperImage>
                  </TouchableOpacity>
                )}
              />
            </BoxImage>
          )}

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
          {news?.length === 0 ? (
            <></>
          ) : (
            <>
              <WrapperText>
                <Title>Notícias</Title>
                {/* <TitleMore> Ver mais</TitleMore> */}
              </WrapperText>
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
            </>
          )}
        </Container>
      )}
    </>
  );
}
