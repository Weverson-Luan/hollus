import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {Button} from '../../../components/Button';
import {Calendar, CalendarProps, LocaleConfig} from 'react-native-calendars';
import {ptBR} from './localConfig';
import {handleFormattedDate} from '../../../utils/formatdate';
import {Api} from '../../../services/api';
import {ActivityIndication} from '../../../components/Spinner';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

import {
  Main,
  Title,
  WrapperButtonNext,
  TitleButtonNext,
  CategoriasContainer,
  CategoriaRow,
  CategorieImage,
  CategoriaInfoContainer,
  CategoriaInfoTitle,
  CategoriaInfoValue,
  CategoriaTitle,
  CategoriaInfoRow,
  styles,
  CalendarContainer,
  InfoContainer,
  TerapeutaInfoContainer,
  TerapeutaFoto,
  TerapeutaNome,
  TerapeutaLocal,
  TerapeutaCol,
  HeaderHorarios,
  HeaderTitle,
  HeaderSubTitle,
  TimeRow,
  TimeText,
  LocationText,
  LocationWrapper,
  TitleLoading,
  ContentLoading,
  ContainerLoading,
} from './styles';

import {
  Content,
  ImageTherapist,
  WrapperHeader,
  Title as NomeTerapeuta,
  WrapperLocation,
  WrapperLocationHeader,
  SubTitleLocation,
  WrapperLocatinIcon,
  TitleLocationMap,
  WrapperInfo,
} from '../../../screens/StackNavigation/Appointment/Client/styles';

import {
  ArrowRight,
  CalendarCheck,
  CaretLeft,
  CaretRight,
  Clock,
  MapPin,
} from 'phosphor-react-native';

import {Loading} from '../../../components/Loading';

const imaeNotFound =
  'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';

export function ScheduleAppointment1({navigation, route}: any) {
  const theme = useTheme();
  const {params} = useRoute() as any;

  const [enableButton, setEnableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selected, setSelected] = useState<any>();

  const handleCategories = () => {
    try {
      if (params.therapist.categorias) {
        setCategoriesList(params.therapist.categorias);
      }
    } catch (error) {
      // tratamento  de error
    } finally {
      setIsLoading(false);
    }
  };

  const formatTempo = (tempo: any) => {
    if (tempo >= 60) {
      const h = Math.floor(tempo / 60);
      const m = tempo % 60;
      return `${h}h ${m}min.`;
    }
    return `${tempo} minutos`;
  };

  const select = (item: any) => {
    if (selected?.id === item.id) {
      setSelected(null);
      setEnableButton(false);
      return;
    }
    setSelected(item);
    setEnableButton(true);
  };

  const navigateNext = () => {
    navigation.navigate('ScheduleAppointment2', {
      terapeuta: params.therapist,
      categoria: selected,
    });
  };

  useEffect(() => {
    handleCategories();
    // console.log(params);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Main>
            <Title>Selecione o tipo de consulta</Title>
          </Main>
          <CategoriasContainer>
            <FlatList
              contentContainerStyle={{
                justifyContent: 'center',
                padding: RFValue(10),
              }}
              data={categoriesList}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}) => (
                <CategoriaRow
                  selected={selected?.id === item.id}
                  onPress={() => select(item)}>
                  <CategorieImage
                    source={{
                      uri: item?.link_foto ?? imaeNotFound,
                    }}
                    resizeMode="cover"
                  />
                  <CategoriaInfoContainer>
                    <CategoriaInfoRow>
                      {/**@ts-ignore */}
                      <CategoriaTitle selected={selected?.id === item.id}>
                        {item?.nome}
                      </CategoriaTitle>
                    </CategoriaInfoRow>
                    <CategoriaInfoRow>
                      <CategoriaInfoTitle selected={selected?.id === item.id}>
                        Valor: R${item?.pivot.valor}
                      </CategoriaInfoTitle>
                    </CategoriaInfoRow>
                    <CategoriaInfoRow>
                      <CategoriaInfoTitle selected={selected?.id === item.id}>
                        Tempo: {formatTempo(item.pivot.tempo)}
                      </CategoriaInfoTitle>
                    </CategoriaInfoRow>
                  </CategoriaInfoContainer>
                </CategoriaRow>
              )}
            />
          </CategoriasContainer>
          <WrapperButtonNext>
            <View style={{width: '100%', marginTop: 0}}>
              <Button
                width="100%"
                height="50px"
                background_color={
                  enableButton ? theme.colors.orange_100 : theme.colors.gray_80
                }
                border={false}
                disabled={!enableButton}
                onPress={navigateNext}>
                <TitleButtonNext>Próximo</TitleButtonNext>
              </Button>
            </View>
          </WrapperButtonNext>
        </>
      )}
    </>
  );
}

export function ScheduleAppointment2({navigation, route}: any) {
  const theme = useTheme();
  const {params} = useRoute() as any;

  const [enableButton, setEnableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [initialDay, setInitialDay] = useState<any>(
    handleFormattedDate(new Date()),
  );
  const [consultaDate, setConsultaDate] = useState('');
  let month = String(currentCalendarDate?.getMonth() + 1).padStart(2, '0');

  const [availableTime, setAvailableTime] = useState();
  const [availableDates, setAvailableDates] = useState({
    [consultaDate]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: 'orange',
      selectedTextColor: 'white',
    },
  });

  const terapeuta = params.terapeuta;
  const categoria = params.categoria;

  const CustomHeaderTitle = (
    <TouchableOpacity
      style={styles.customTitleContainer}
      onPress={() => console.log('Tapped!')}>
      <Text style={styles.customTitle}>
        {ptBR.monthNames[Number(month) - 1]} /{' '}
        {currentCalendarDate?.getFullYear()}
      </Text>
    </TouchableOpacity>
  );

  const getNewSelectedDate = (date: any, shouldAdd: any) => {
    const newMonth = new Date(date).getMonth();
    const month = shouldAdd ? newMonth + 1 : newMonth - 1;
    const newDate = new Date(currentCalendarDate.setMonth(month));
    const newSelected = new Date(newDate.setDate(1));
    return newSelected;
  };

  const onPressArrowLeft = async (subtract: any, month: any) => {
    const newDate = getNewSelectedDate(month, false);
    setCurrentCalendarDate(newDate);
    await getHorarios();
    subtract();
  };

  const onPressArrowRight = async (add: any, month: any) => {
    const newDate = getNewSelectedDate(month, true);
    setCurrentCalendarDate(newDate);
    await getHorarios();
    add();
  };

  const onDayPress: CalendarProps['onDayPress'] = day => {
    const todays = handleFormattedDate(day.dateString, true);
    let formatted = availableDates;

    if (day.dateString === consultaDate) {
      //@ts-ignore
      formatted[day.dateString] = {disabled: false, disableTouchEvent: false};
      setConsultaDate('');
    } else {
      //@ts-ignore
      formatted[consultaDate] = {disabled: false, disableTouchEvent: false};
      formatted[day.dateString] = {
        selected: true,
        disableTouchEvent: false,
        selectedColor: 'orange',
        selectedTextColor: 'white',
      };
      setConsultaDate(day.dateString);
    }
    setAvailableDates(formatted);
  };

  const getHorarios = async () => {
    setConsultaDate('');

    const selectedMonth = currentCalendarDate.getMonth() + 1;

    const selectedYear = currentCalendarDate.getFullYear();

    const res = await Api.get(
      `/v1/consulta/pesquisar-horarios-mes?usuario_terapeuta_id=${
        terapeuta?.id
      }&categoria_id=${categoria?.id}&mes=${
        selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth
      }-${selectedYear}`,
    );

    const days = res.data.data;

    setAvailableTime(res.data.data);

    var formatted = {};

    Object.keys(days).map((key, index) => {
      const dayString = `${selectedYear}-${
        selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth
      }-${key}`;
      formatted = {
        ...formatted,
        [dayString]: {disabled: false, disableTouchEvent: false},
      };
    });

    setAvailableDates(formatted);
    setIsLoading(false);
  };

  useEffect(() => {
    getHorarios();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <InfoContainer>
            <TerapeutaInfoContainer>
              <TerapeutaFoto
                resizeMode="cover"
                source={{
                  uri:
                    terapeuta?.link_foto ??
                    'https://laghettohoteis.com.br/wp-content/uploads/2021/06/User-Icon-Grey-300x300-1.png',
                }}
              />
              <TerapeutaCol>
                <TerapeutaNome>{terapeuta?.nome}</TerapeutaNome>
                <TerapeutaLocal>{categoria?.nome}</TerapeutaLocal>
              </TerapeutaCol>
            </TerapeutaInfoContainer>
          </InfoContainer>

          <HeaderHorarios>
            <HeaderTitle>Selecione o dia da consulta</HeaderTitle>
          </HeaderHorarios>

          <CalendarContainer>
            <Calendar
              style={styles.calendar}
              renderArrow={direction => (
                <>
                  {direction === 'left' ? (
                    <CaretLeft color={theme.colors.white} />
                  ) : (
                    <CaretRight color={theme.colors.white} />
                  )}
                </>
              )}
              customHeaderTitle={CustomHeaderTitle}
              onPressArrowLeft={onPressArrowLeft}
              onPressArrowRight={onPressArrowRight}
              onDayPress={onDayPress}
              markedDates={availableDates}
              disableAllTouchEventsForDisabledDays={true}
              headerStyle={{
                backgroundColor: theme.colors.orange,
              }}
              disabledByDefault
            />
          </CalendarContainer>

          <WrapperButtonNext>
            <View style={{width: '100%', marginTop: 0}}>
              <Button
                width="100%"
                height="50px"
                background_color={
                  consultaDate !== ''
                    ? theme.colors.orange_100
                    : theme.colors.gray_80
                }
                border={false}
                disabled={consultaDate === ''}
                onPress={() => {
                  navigation.navigate('ScheduleAppointment3', {
                    data: consultaDate,
                    categoria: categoria,
                    terapeuta: terapeuta,
                  });
                }}>
                <TitleButtonNext>
                  {isLoading ? (
                    <ActivityIndication bgColor={theme.colors.gray_80} />
                  ) : (
                    'Próximo'
                  )}
                </TitleButtonNext>
              </Button>
            </View>
          </WrapperButtonNext>
        </>
      )}
    </>
  );
}

export function ScheduleAppointment3({navigation, route}: any) {
  const theme = useTheme();
  const {params} = useRoute() as any;

  const terapeuta = params.terapeuta;
  const categoria = params.categoria;
  const dataConsulta = params.data;

  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState({inicio: '', fim: ''});

  const [timeList, setTimeList] = useState<any>();

  const [terapeutaInfo, setTerapeutaInfo] = useState({
    nome: '',
    foto: imaeNotFound,
    endereco: '',
  });

  const select = (item: any) => {
    if (selected.inicio == item.inicio) {
      setSelected({inicio: '', fim: ''});
      return;
    }
    setSelected(item);
  };

  const navigateNext = () => {
    const formattedTime = `${dataConsulta} ${selected.inicio}`;
    navigation.navigate('ScheduleAppointment4', {
      terapeuta: terapeuta,
      categoria: categoria,
      data_hora: formattedTime,
    });
  };

  const getTime = async () => {
    const dateFmt = formatDate(dataConsulta);
    const {data} = await Api.get('/v1/consulta/pesquisar-horarios', {
      params: {
        usuario_terapeuta_id: terapeuta?.id,
        categoria_id: categoria?.id,
        data: dateFmt,
      },
    });
    setTimeList(data.data);
  };

  const getTerapeuta = async () => {
    try {
      const {data} = await Api.get(
        '/v1/consulta/terapeuta-info/' + terapeuta?.id,
      );
      const info = {
        nome: data.data.nome,
        foto: data.data.link_foto ?? imaeNotFound,
        endereco: data.data.endereco_completo,
      };
      setTerapeutaInfo(info);
    } catch (error) {
      //realizar tratamento de error
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateToFormat: any) => {
    const dateObj = new Date(dateToFormat);
    const formatted = `${dateObj.getDate() + 1}-${
      dateObj.getMonth() + 1 < 10
        ? '0' + (dateObj.getMonth() + 1)
        : dateObj.getMonth() + 1
    }-${dateObj.getFullYear()}`;
    return formatted;
  };

  const getData = () => {
    getTerapeuta();
    getTime();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <InfoContainer>
            <TerapeutaInfoContainer>
              <TerapeutaFoto
                resizeMode="contain"
                source={{uri: terapeutaInfo?.foto}}
              />
              <TerapeutaCol>
                <TerapeutaNome>{terapeutaInfo?.nome}</TerapeutaNome>
                <TerapeutaLocal>{categoria?.nome}</TerapeutaLocal>
              </TerapeutaCol>
            </TerapeutaInfoContainer>
          </InfoContainer>
          <HeaderHorarios>
            <HeaderTitle>
              {timeList?.length > 1
                ? 'Horários disponíveis'
                : 'Horário disponível'}
            </HeaderTitle>
            <HeaderSubTitle>{formatDate(dataConsulta)}</HeaderSubTitle>
          </HeaderHorarios>
          <CategoriasContainer>
            <FlatList
              contentContainerStyle={{
                padding: RFValue(10),
              }}
              data={timeList}
              keyExtractor={item => String(Math.random() * 2)}
              renderItem={({item}) => (
                <TimeRow
                  //@ts-ignore
                  selected={selected?.inicio === item?.inicio}
                  onPress={() => select(item)}>
                  <Clock
                    size={RFValue(20)}
                    color={
                      selected?.inicio === item?.inicio
                        ? theme.colors.white
                        : theme.colors.orange
                    }
                  />
                  {/**@ts-ignore */}
                  <TimeText selected={selected?.inicio === item?.inicio}>
                    {item.inicio}
                  </TimeText>
                  <ArrowRight
                    size={RFValue(20)}
                    color={
                      selected?.inicio === item?.inicio
                        ? theme.colors.white
                        : theme.colors.orange
                    }
                  />
                  {/**@ts-ignore */}
                  <TimeText selected={selected?.inicio === item?.inicio}>
                    {item.fim}
                  </TimeText>
                </TimeRow>
              )}
            />
          </CategoriasContainer>
          <WrapperButtonNext>
            <View style={{width: '100%', marginTop: 0}}>
              <Button
                width="100%"
                height="50px"
                background_color={
                  selected.inicio !== ''
                    ? theme.colors.orange_100
                    : theme.colors.gray_80
                }
                border={false}
                disabled={selected.inicio === ''}
                onPress={navigateNext}>
                <TitleButtonNext>Próximo</TitleButtonNext>
              </Button>
            </View>
          </WrapperButtonNext>
        </>
      )}
    </>
  );
}

type IResponseConsulta = {
  message: string;
  success: true;
  data: {
    categoria_id: 3;
    created_at: string;
    data_hora: string;
    id: number;
    status: string;
    updated_at: string;
    usuario_paciente_id: number;
    usuario_terapeuta_id: number;
    valor: number;
  };
};
export function ScheduleAppointment4({navigation, route}: any) {
  const theme = useTheme();
  const {params} = useRoute() as any;

  const terapeuta = params.terapeuta;
  const categoria = params.categoria;
  const data_hora = params.data_hora;

  const [loading, setLoading] = useState(true);

  const [terapeutaInfo, setTerapeutaInfo] = useState({
    nome: '',
    foto: '',
    endereco: '',
  });

  const agendarConsulta = async () => {
    try {
      const {data} = await Api.post<IResponseConsulta>('/v1/consulta/agendar', {
        data_hora: data_hora,
        usuario_terapeuta_id: terapeuta?.id,
        categoria_id: categoria?.id,
      });

      navigation.navigate('FormPayment', {
        consulta_id: data.data.id,
      });
    } catch (error) {
      //caso acontecessa algum error
    } finally {
      setLoading(false);
    }
  };

  const getTerapeuta = async () => {
    try {
      const {data} = await Api.get(
        '/v1/consulta/terapeuta-info/' + terapeuta?.id,
      );
      const info = {
        nome: data.data.nome,
        foto: data.data.link_foto,
        endereco: data.data.endereco_completo,
      };
      setTerapeutaInfo(info);
    } catch (error) {
      //realizar tratamento de errro
    } finally {
      setLoading(false);
    }
  };

  const getData = () => {
    getTerapeuta();
  };

  const formatDate = (date: any) => {
    return `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)}`;
  };
  const formatTime = (time: any) => {
    return `${time.substr(10, 6)}`;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <ContainerLoading>
          <ContentLoading>
            <ActivityIndication color={theme.colors.orange} />
            <TitleLoading>Carregando...</TitleLoading>
          </ContentLoading>
        </ContainerLoading>
      ) : (
        <>
          <Content>
            <ImageTherapist
              source={{
                uri: terapeutaInfo?.foto ? terapeutaInfo?.foto : imaeNotFound,
              }}
            />
            <WrapperInfo>
              <WrapperHeader>
                <NomeTerapeuta>{terapeutaInfo?.nome}</NomeTerapeuta>
              </WrapperHeader>

              <WrapperLocation>
                <WrapperLocationHeader>
                  <WrapperLocatinIcon>
                    <CalendarCheck size={18} color={theme.colors.gray_90} />
                    <SubTitleLocation> Dia da Consulta:</SubTitleLocation>
                  </WrapperLocatinIcon>

                  <TitleLocationMap>
                    {formatDate(params.data_hora)}
                  </TitleLocationMap>
                </WrapperLocationHeader>

                <WrapperLocationHeader>
                  <WrapperLocatinIcon>
                    <Clock size={18} color={theme.colors.gray_80} />
                    <SubTitleLocation> Horário da Consulta:</SubTitleLocation>
                  </WrapperLocatinIcon>

                  <TitleLocationMap>
                    {formatTime(params.data_hora)}
                  </TitleLocationMap>
                </WrapperLocationHeader>

                <LocationWrapper>
                  <MapPin size={18} color={theme.colors.gray_80} />
                  <LocationText> {terapeutaInfo.endereco}</LocationText>
                </LocationWrapper>
              </WrapperLocation>
            </WrapperInfo>
          </Content>
          <WrapperButtonNext>
            <View style={{width: '100%', marginTop: 0}}>
              <Button
                width="100%"
                height="50px"
                background_color={theme.colors.orange_100}
                border={false}
                disabled={loading}
                onPress={agendarConsulta}>
                {loading ? (
                  <ActivityIndication
                    bgColor={theme.colors.orange}
                    color={theme.colors.white}
                  />
                ) : (
                  <TitleButtonNext>Confirmar</TitleButtonNext>
                )}
              </Button>
            </View>
          </WrapperButtonNext>
        </>
      )}
    </>
  );
}
