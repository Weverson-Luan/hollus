import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';

// components
import {Button} from '../../../../components/Button';
import {Calendar, CalendarProps, LocaleConfig} from 'react-native-calendars';
import {ptBR} from '../../ScheduleAppointment/localConfig';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

import {handleFormattedDate} from '../../../../utils/formatdate';
import {Api} from '../../../../services/api';
import {ActivityIndication} from '../../../../components/Spinner';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {
  WrapperButtonNext,
  TitleButtonNext,
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
} from './styles';

export function ScheduleAppointmentTwo({navigation, route}: any) {
  const theme = useTheme();
  const {params} = useRoute() as any;

  const [isLoading, setIsLoading] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
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
    setIsLoading(true);
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
            <FontAwesome5Icon
              name={direction === 'left' ? 'caret-left' : 'caret-right'}
              size={RFValue(25)}
              color={theme.colors.white}
            />
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
  );
}
