import React, {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';

//components
import {ButtonTherapie} from '../../../components/ButtonTherapie';
import {Button} from '../../../components/Button';

//services
import {TypesTherapies} from '../../../services/api.fake.tipos-terapias';
import {ClassificationTherapies} from '../../../services/api.fake.classification-terapias';

//styled-components
import {
  Container,
  WrapperTypeTerapies,
  TitleTypeTerapies,
  ContentButton,
  WrapperButtonsTerapies,
  TextButtonTerapies,
  TitleClassification,
  WrapperButtonsClassification,
  ContentPrice,
  TitlePrice,
  TextButtonPrice,
  WrapperButtonsPrice,
  ContentFooter,
  WrapperButtonsFooter,
  TextButtonFooter,
} from './styles';
import {
  getCategories,
  getFilteredSearch,
  getGeneralInfo,
} from '../../../context/hooks/Filter/useFilter';
import {View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

export function Filter() {
  const route = useRoute();
  const theme = useTheme();
  const navigation = useNavigation();
  //@ts-ignore
  const [selectButton, setSelectButton] = useState(route.params?.type);
  //@ts-ignore
  const [orderBy, setOrderBy] = useState(route.params?.order);
  const [orderDistance, setOrderDistance] = useState(
    //@ts-ignore
    route.params?.orderDistance,
  );
  //@ts-ignore
  const [selectedCategory, setSelectedCategory] = useState(route.params?.cat);
  const [categories, setCategories] = useState<ICategories>() as any;

  function handleButton(params: string) {
    selectButton !== params ? setSelectButton(params) : setSelectButton('');
  }
  function handleOrder(params: string) {
    orderBy !== params ? setOrderBy(params) : setOrderBy('');
  }

  function handleDistance(params: string) {
    orderDistance !== params ? setOrderDistance(params) : setOrderDistance('');
  }

  function handleCategory(params: number) {
    selectedCategory !== params
      ? setSelectedCategory(params)
      : setSelectedCategory(0);
  }

  async function handleGetCategories() {
    const response = await getCategories();
    response.success && setCategories(response.data);
  }

  const handleNavigate = () => {
    //@ts-ignore
    navigation.navigate('Pesquisar', {
      type: selectButton,
      order: orderBy,
      //@ts-ignore
      search: route.params?.search,
      cat: selectedCategory,
      orderDistance: orderDistance,
    });
  };

  useEffect(() => {
    handleGetCategories();
  }, []);
  return (
    <Container
      contentContainerStyle={{justifyContent: 'space-between', flex: 1}}>
      <WrapperTypeTerapies>
        <ContentButton>
          <TitleTypeTerapies>Tipos de terapia</TitleTypeTerapies>
          <WrapperButtonsTerapies>
            {categories?.map((therapies: any) => (
              <ButtonTherapie
                key={therapies.id}
                width="48%"
                height="40px"
                onPress={() => handleCategory(therapies)}
                background_color={theme.colors.orange}
                isActiveColor={selectedCategory?.id === therapies.id}
                border>
                <TextButtonTerapies
                  color={selectedCategory?.id === therapies.id}>
                  {therapies.nome}
                </TextButtonTerapies>
              </ButtonTherapie>
            ))}
          </WrapperButtonsTerapies>
        </ContentButton>

        <ContentPrice>
          <TitlePrice>Preço</TitlePrice>

          <WrapperButtonsPrice>
            <ButtonTherapie
              width="60%"
              height="40px"
              background_color={theme.colors.orange}
              border
              onPress={() => handleOrder('asc')}
              isActiveColor={orderBy === 'asc'}>
              <TextButtonTerapies color={orderBy === 'asc'}>
                Menor para o maior
              </TextButtonTerapies>
            </ButtonTherapie>

            <ButtonTherapie
              width="60%"
              height="40px"
              background_color={theme.colors.orange}
              border
              onPress={() => handleOrder('desc')}
              isActiveColor={orderBy === 'desc'}>
              <TextButtonTerapies style={{}} color={orderBy === 'desc'}>
                Maior para o menor
              </TextButtonTerapies>
            </ButtonTherapie>
          </WrapperButtonsPrice>
        </ContentPrice>
        <ContentButton>
          <TitleTypeTerapies>Distância</TitleTypeTerapies>
          <WrapperButtonsTerapies>
            <ButtonTherapie
              width="60%"
              height="40px"
              background_color={theme.colors.orange}
              border
              onPress={() => handleDistance('near')}
              isActiveColor={orderDistance === 'near'}>
              <TextButtonTerapies color={orderDistance === 'near'}>
                Mais próximos
              </TextButtonTerapies>
            </ButtonTherapie>
            <ButtonTherapie
              width="60%"
              height="40px"
              background_color={theme.colors.orange}
              border
              onPress={() => handleDistance('far')}
              isActiveColor={orderDistance === 'far'}>
              <TextButtonTerapies color={orderDistance === 'far'}>
                Mais distantes
              </TextButtonTerapies>
            </ButtonTherapie>
          </WrapperButtonsTerapies>
        </ContentButton>
      </WrapperTypeTerapies>

      <ContentFooter>
        <WrapperButtonsFooter>
          <Button
            width="100%"
            height="45px"
            background_color={theme.colors.gray_80}
            border={false}
            onPress={() => handleNavigate()}>
            <TextButtonFooter>Salvar filtros</TextButtonFooter>
          </Button>
        </WrapperButtonsFooter>
      </ContentFooter>
    </Container>
  );
}
