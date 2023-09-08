import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Check, Clock, CurrencyDollar, X} from 'phosphor-react-native';

// components
import {Button} from '../../../components/Button';
import {Loading} from '../../../components/Loading';
import {QueryData} from '../../../components/QueryData';
import {ServiceLocation} from '../../../components/ServiceLocation';
import {Card} from '../../../components/Card';

// services
import {Api} from '../../../services/api';

// typings
import {
  IAtendimentosProps,
  IConsultaProps,
  IResponseApiAtendimentos,
  IResponseApiConsulta,
  ISpacosProps,
  IResponseApiSpacos,
} from './interface';

// theme
import theme from '../../../styles/colors/theme';

import {
  Container,
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
  WrapperButton,
  TextTitleButton,
  WrapperResume,
  InfoLineSchedulingMoney,
  ContentIconMoney,
  TextInfoValueSchedulingMoney,
  TextSchedulingMoney,
  InfoLineSchedulingClock,
  ContentIconClock,
  TextInfoValueSchedulingClock,
  TextSchedulingClock,
} from './styles';

export function Dashboard() {
  const navigation = useNavigation();

  const [atendimentos, setAtendimentos] = useState<IAtendimentosProps>(
    {} as IAtendimentosProps,
  );

  const [dadosConsulta, setDadosConsulta] = useState<IConsultaProps>();

  const [spaces, setSpaces] = useState<ISpacosProps>({} as ISpacosProps);
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  /**
   * BUSCAR ATENDIMENTOS
   */
  const fetchAtendimentos = async () => {
    try {
      setIsLoading(true);
      const {data} = await Api.get<IResponseApiAtendimentos>(
        'v1/home/historico-atendimento-mes',
      );
      setAtendimentos(data.data);
    } catch (error) {
      //tratamento de error
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * BUSCAR DADOS DA CONULTA
   */
  const fetchDadosConsulta = async () => {
    try {
      setIsLoading(true);
      const {data} = await Api.get<IResponseApiConsulta>(
        '/v1/home/dados-consulta',
      );
      setDadosConsulta(data.data);
    } catch (error) {
      //tratamento de error
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * BUSCAR ESPAÇOS
   */
  const fetchSpaces = async () => {
    try {
      setIsLoading(true);
      const {data} = await Api.get<IResponseApiSpacos>(
        'v1/home/locais-atendimento',
      );
      setSpaces(data.data);
    } catch (error) {
      //tratamento de error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchAtendimentos();
      fetchDadosConsulta();
      fetchSpaces();
    }
  }, [isFocused]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <WrapperText>
            <Title>Histórico de atendimento no mês</Title>
          </WrapperText>

          <WrapperInfoScheduling>
            <InfoLineScheduling>
              <ContentIcon>
                <Clock size={16} color={theme.colors.gray_200} />
                <TextScheduling>Quantidade de agendamentos</TextScheduling>
              </ContentIcon>
              <TextInfoValueScheduling>
                {atendimentos?.quantidade_agendamentos}
              </TextInfoValueScheduling>
            </InfoLineScheduling>

            <InfoLineScheduling>
              <ContentIconCheck>
                <Check size={20} color={theme.colors.green} />
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
                <X size={20} color={theme.colors.red} />
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
                onPress={() => navigation.navigate('Consultas')}>
                <TextTitleButton>Histórico completo</TextTitleButton>
              </Button>
            </WrapperButton>
          </WrapperInfoScheduling>

          <QueryData />

          {dadosConsulta?.categorias?.length === 0 ? (
            <View />
          ) : (
            <WrapperResume>
              <InfoLineSchedulingMoney>
                <ContentIconMoney>
                  <CurrencyDollar size={18} color={theme.colors.gray_150} />
                  <TextInfoValueSchedulingMoney>
                    Valor:
                  </TextInfoValueSchedulingMoney>
                </ContentIconMoney>
                <TextSchedulingMoney>
                  R$ {dadosConsulta?.categorias[0].terapeutas[0].pivot?.valor}
                </TextSchedulingMoney>
              </InfoLineSchedulingMoney>

              <InfoLineSchedulingClock>
                <ContentIconClock>
                  <Clock size={16} color="black" />
                  <TextInfoValueSchedulingClock>
                    Tempo de duração
                  </TextInfoValueSchedulingClock>
                </ContentIconClock>
                <TextSchedulingClock>
                  {dadosConsulta?.categorias[0]?.terapeutas[0].pivot?.tempo}{' '}
                  minutos
                </TextSchedulingClock>
              </InfoLineSchedulingClock>
            </WrapperResume>
          )}

          <ServiceLocation />
          <FlatList
            data={spaces?.empresas}
            keyExtractor={item => item?.id}
            renderItem={({item}) => <Card data={item} />}
          />
        </Container>
      )}
    </>
  );
}
