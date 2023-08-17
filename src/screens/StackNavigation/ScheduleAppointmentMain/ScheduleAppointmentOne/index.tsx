import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {FlatList, View} from 'react-native';

// components
import {Button} from '../../../../components/Button';

import {LocaleConfig} from 'react-native-calendars';
import {ptBR} from '../../ScheduleAppointment/localConfig';

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
  CategoriaTitle,
  CategoriaInfoRow,
} from './styles';

const imaeNotFound =
  'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';

export function ScheduleAppointment1() {
  const theme = useTheme();
  const {params} = useRoute() as any;
  const {navigate} = useNavigation();

  const [enableButton, setEnableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selected, setSelected] = useState<any>();

  const handleCategories = () => {
    if (params.therapist.categorias) {
      setCategoriesList(params.therapist.categorias);
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
    navigate('ScheduleAppointmentTwo', {
      terapeuta: params.therapist,
      categoria: selected,
    });
  };

  useEffect(() => {
    handleCategories();
  }, []);

  return (
    <>
      <Main>
        <Title>Selecione o tipo de consulta</Title>
      </Main>
      <CategoriasContainer>
        <FlatList
          contentContainerStyle={{
            justifyContent: 'center',
            padding: 10,
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
  );
}
