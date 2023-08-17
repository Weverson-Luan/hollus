import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useTheme} from 'styled-components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

//services
import {scheduledTheraphies} from '../../../services/api.fake.scheduled-terapias';

//type routing
//@ts-ignore
import {StackParamsList} from '../../../routes/routes.Stack';

//styles-components
import {
  Container,
  Title,
  WrapperTitle,
  Wrapper,
  WrapperContentInfo,
  ImageProfile,
  DescriptionInfo,
  HeaderTitle,
  TitleName,
  WrapperPonts,
  TitlePont,
  WrapperDate,
  TitleDate,
  WrapperLocation,
  TitleLocation,
} from './styles';
import {
  getAppointmentHistory,
  getNextAppointments,
} from '../../../context/hooks/Appointment/useAppointment';
import {ActivityIndication} from '../../../components/Spinner';
import {ContentSpots, TitleSpots} from '../../StackNavigation/Therapist/styles';
import MandalaSVG from '../../../assets/svg/mandala.svg';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  ClockAfternoon,
  DotsThreeOutlineVertical,
  MapPin,
} from 'phosphor-react-native';
type ScreenSearchProps = NativeStackNavigationProp<StackParamsList>;

export function ScreenQuery({navigation, route}: any) {
  const theme = useTheme();
  const navigationAuth = useNavigation<ScreenSearchProps>();
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState<any>({});
  const [past, setPast] = useState<any>({});
  const isFocused = useIsFocused();
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

    //@ts-ignore
    const appDay = new Date(app?.data_hora.replace(' ', 'T')).getDay();
    return today === appDay - 1 ? 'Amanhã' : weekday[appDay];
  };

  const getAppointments = async () => {
    setLoading(true);
    const next = await getNextAppointments();
    const past = await getAppointmentHistory();
    setNext(next.data);
    setPast(past.data);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getAppointments();
    }
  }, [isFocused]);

  return (
    <Container>
      <Wrapper>
        {loading ? (
          <ActivityIndication />
        ) : (
          <>
            {next?.length !== 0 && (
              <>
                <WrapperTitle>
                  <Title>Próximas consultas</Title>
                </WrapperTitle>

                <View>
                  <FlatList
                    data={next}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                      <WrapperContentInfo
                        onPress={() =>
                          navigationAuth.navigate('Appointment', {
                            id: item.id,
                          })
                        }>
                        <ImageProfile
                          source={{
                            uri: item?.usuario_terapeuta?.link_foto,
                          }}
                        />
                        <DescriptionInfo>
                          <HeaderTitle>
                            <TitleName>
                              {item?.usuario_terapeuta?.nome}
                            </TitleName>

                            <WrapperPonts>
                              <AntDesign
                                name="star"
                                size={14}
                                color={theme.colors.orange_100}
                              />
                              <TitlePont>
                                {item?.usuario_terapeuta?.nota_media}
                              </TitlePont>
                            </WrapperPonts>
                          </HeaderTitle>

                          <WrapperDate>
                            <ClockAfternoon
                              // name="clockcircleo"
                              size={14}
                              color={theme.colors.gray_150}
                            />
                            <TitleDate>
                              {item?.data_hora?.slice(8, 10)}/
                              {item?.data_hora?.slice(5, 7)}/
                              {item?.data_hora?.slice(0, 4)} às{' '}
                              {item?.data_hora?.slice(11, 16)}
                            </TitleDate>
                          </WrapperDate>

                          <WrapperLocation>
                            <MapPin size={14} color={theme.colors.gray_150} />
                            <TitleLocation>{item?.espaco?.nome}</TitleLocation>
                          </WrapperLocation>
                        </DescriptionInfo>

                        <DotsThreeOutlineVertical size={32} />
                      </WrapperContentInfo>
                    )}
                  />
                </View>
              </>
            )}

            {past?.length !== 0 && (
              <>
                <WrapperTitle>
                  <Title>Histórico de consultas</Title>
                </WrapperTitle>

                <FlatList
                  data={past}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <WrapperContentInfo
                      onPress={() =>
                        navigationAuth.navigate('Appointment', {
                          id: item.id,
                        })
                      }>
                      <ImageProfile
                        source={{
                          uri: item?.usuario_terapeuta?.link_foto,
                        }}
                      />
                      <DescriptionInfo>
                        <HeaderTitle>
                          <TitleName>{item.usuario_terapeuta?.nome}</TitleName>

                          <ContentSpots>
                            {/* <TitleSpots>{therapistInfo?.nota_media}</TitleSpots> */}
                            <TitleSpots>3</TitleSpots>

                            <MandalaSVG
                              width={RFValue(20)}
                              height={RFValue(20)}
                            />
                            <MandalaSVG
                              width={RFValue(20)}
                              height={RFValue(20)}
                            />
                            <MandalaSVG
                              width={RFValue(20)}
                              height={RFValue(20)}
                            />
                          </ContentSpots>
                        </HeaderTitle>
                        <WrapperDate>
                          <ClockAfternoon
                            // name="clockcircleo"
                            size={14}
                            color={theme.colors.gray_150}
                          />
                          <TitleDate>
                            {item?.data_hora?.slice(8, 10)}/
                            {item?.data_hora?.slice(5, 7)}/
                            {item?.data_hora?.slice(0, 4)} às{' '}
                            {item?.data_hora?.slice(11, 16)}
                          </TitleDate>
                        </WrapperDate>
                      </DescriptionInfo>

                      <DotsThreeOutlineVertical size={32} />
                    </WrapperContentInfo>
                  )}
                />
              </>
            )}
          </>
        )}
      </Wrapper>
    </Container>
  );
}
