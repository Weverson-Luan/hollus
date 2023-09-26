import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useTheme} from 'styled-components';
import {useIsFocused, useNavigation} from '@react-navigation/native';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

//services
import {scheduledTheraphies} from '../../../services/api.fake.scheduled-terapias';

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
  NoAppointmentsWrapper,
  NoAppointmentsText,
} from './styles';
import {Api} from '../../../services/api';
import {ActivityIndication} from '../../../components/Spinner';
import {Clock, DotsThreeOutlineVertical} from 'phosphor-react-native';

export function ScreenQuery({navigation}: any) {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const navigationAuth = useNavigation();
  const [proximasConsultas, setProximasConsultas] = useState<any>();
  const [historicoConsultas, setHistoricoConsultas] = useState<any>();

  const [historyLoading, setHistoryLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);

  const fetchHistorico = async () => {
    const res = await Api.get('v1/consulta/historico');
    setHistoricoConsultas(res.data.data);
  };

  const fetchProximas = async () => {
    const res = await Api.get('v1/consulta/proximas');
    setProximasConsultas(res.data.data);
  };

  useEffect(() => {
    fetchProximas();
    isFocused ? (fetchHistorico(), fetchProximas()) : null;
  }, [isFocused]);
  return (
    <Container>
      <Wrapper>
        <WrapperTitle>
          <Title>Próximas consultas</Title>
        </WrapperTitle>

        {typeof proximasConsultas === 'undefined' ? (
          <ActivityIndication />
        ) : proximasConsultas.length === 0 ? (
          <NoAppointmentsWrapper>
            <NoAppointmentsText>Sem próximas consultas</NoAppointmentsText>
          </NoAppointmentsWrapper>
        ) : (
          <FlatList
            data={proximasConsultas}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <WrapperContentInfo
                onPress={() =>
                  navigation.navigate('Appointment', {
                    consulta: item.id,
                  })
                }>
                <ImageProfile
                  source={{
                    uri: item.usuario_paciente.link_foto,
                  }}
                />
                <DescriptionInfo>
                  <HeaderTitle>
                    <TitleName>{item.usuario_paciente.nome}</TitleName>
                  </HeaderTitle>

                  <WrapperDate>
                    <Clock size={14} color={theme.colors.gray_150} />
                    <TitleDate>
                      {item.data_hora.substring(8, 10)}/
                      {item.data_hora.substring(5, 7)}/
                      {item.data_hora.substring(0, 4)} às{' '}
                      {item.data_hora.substring(11, 16)}
                    </TitleDate>
                  </WrapperDate>
                </DescriptionInfo>

                <DotsThreeOutlineVertical size={32} />
              </WrapperContentInfo>
            )}
          />
        )}

        <WrapperTitle>
          <Title>Histórico de consultas</Title>
        </WrapperTitle>

        {typeof historicoConsultas === 'undefined' ? (
          <ActivityIndication />
        ) : historicoConsultas.length === 0 ? (
          <NoAppointmentsWrapper>
            <NoAppointmentsText>Sem histórico de consultas</NoAppointmentsText>
          </NoAppointmentsWrapper>
        ) : (
          <FlatList
            data={historicoConsultas}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <WrapperContentInfo
                onPress={() =>
                  navigation.navigate('Appointment', {
                    consulta: item.id,
                  })
                }>
                <ImageProfile
                  source={{
                    uri: item.usuario_paciente.link_foto,
                  }}
                />
                <DescriptionInfo>
                  <HeaderTitle>
                    <TitleName>{item.usuario_paciente.nome}</TitleName>
                  </HeaderTitle>

                  <WrapperDate>
                    <Clock size={14} color={theme.colors.gray_150} />
                    <TitleDate>
                      {item.data_hora.substring(8, 10)}/
                      {item.data_hora.substring(5, 7)}/
                      {item.data_hora.substring(0, 4)} às{' '}
                      {item.data_hora.substring(11, 16)}
                    </TitleDate>
                  </WrapperDate>
                </DescriptionInfo>

                <DotsThreeOutlineVertical size={32} />
              </WrapperContentInfo>
            )}
          />
        )}
      </Wrapper>
    </Container>
  );
}
