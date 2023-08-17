import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";

//components
import { ButtonTherapie } from "../../../components/ButtonTherapie";
import { Button } from "../../../components/Button";

//services
import { TypesTherapies } from "../../../services/api.fake.tipos-terapias";
import { ClassificationTherapies } from "../../../services/api.fake.classification-terapias";

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
} from "./styles";
import {
  getCategories,
  getFilteredSearch,
  getGeneralInfo,
} from "../../../context/hooks/Filter/useFilter";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export function Filter() {
  const route = useRoute();
  const theme = useTheme();
  const navigation = useNavigation();
  const [selectButton, setSelectButton] = useState(route.params?.type);
  const [orderBy, setOrderBy] = useState(route.params?.order);
  const [orderDistance, setOrderDistance] = useState(route.params?.orderDistance);
  const [selectedCategory, setSelectedCategory] = useState(route.params?.cat);
  const [categories, setCategories] = useState<ICategories>();

  function handleButton(params: string) {
    selectButton !== params ? setSelectButton(params) : setSelectButton("");
  }
  function handleOrder(params: string) {
    orderBy !== params ? setOrderBy(params) : setOrderBy("");
  }

  function handleDistance(params: string) {
    orderDistance !== params ? setOrderDistance(params) : setOrderDistance("");
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
    navigation.navigate("Pesquisar", {
      type: selectButton,
      order: orderBy,
      search: route.params?.search,
      cat: selectedCategory,
      orderDistance: orderDistance
    });
  };

  useEffect(() => {
    handleGetCategories();
  }, []);
  return (
    <Container
      contentContainerStyle={{ justifyContent: "space-between", flex: 1 }}
    >
      <WrapperTypeTerapies>
        <ContentButton>
          <TitleTypeTerapies>Tipos de terapia</TitleTypeTerapies>
          <WrapperButtonsTerapies>
            {categories?.map((therapies) => (
              <ButtonTherapie
                key={therapies.id}
                width="50%"
                height="40px"
                onPress={() => handleCategory(therapies)}
                background_color={theme.colors.orange}
                isActiveColor={selectedCategory?.id === therapies.id}
                border
              >
                <TextButtonTerapies
                  color={selectedCategory?.id === therapies.id}
                >
                  {therapies.nome}
                </TextButtonTerapies>
              </ButtonTherapie>
            ))}
          </WrapperButtonsTerapies>
        </ContentButton>
        {/* TERAPIAS DISPONIVEIS */}
        {/* <ContentButton>
          <TitleClassification>Terapias disponíveis</TitleClassification>
          <WrapperButtonsClassification>
            {categories?.map((category) => (
              <ButtonTherapie
                key={category.id}
                width="50%"
                height="40px"
                background_color={theme.colors.orange}
                onPress={() => handleCategory(category.id)}
                isActiveColor={category.id === selectedCategory}
                border
              >
                <TextButtonTerapies color={category.id === selectedCategory}>
                  {category.nome}
                </TextButtonTerapies>
              </ButtonTherapie>
            ))}
          </WrapperButtonsClassification>
        </ContentButton> */}

        {/* <ContentButton>
          <TitleClassification>Classificação</TitleClassification>
          <WrapperButtonsClassification>
            {ClassificationTherapies.map(therapies => (
              <ButtonTherapie
                key={therapies.id}
                width="20%"
                height="40px"
                background_color={theme.colors.white}
                border
              >
                <TextButtonTerapies color={false}>
                  + {therapies.value_category}
                </TextButtonTerapies>
              </ButtonTherapie>
            ))}
          </WrapperButtonsClassification>
        </ContentButton> */}

        <ContentPrice>
          <TitlePrice>Preço</TitlePrice>

          <WrapperButtonsPrice>
            <ButtonTherapie
              width="60%"
              height="40px"
              background_color={theme.colors.orange}
              border
              onPress={() => handleOrder("asc")}
              isActiveColor={orderBy === "asc"}
            >
              <TextButtonTerapies color={orderBy === "asc"}>
                Menor para o maior
              </TextButtonTerapies>
            </ButtonTherapie>

            <ButtonTherapie
              width="60%"
              height="40px"
              background_color={theme.colors.orange}
              border
              onPress={() => handleOrder("desc")}
              isActiveColor={orderBy === "desc"}
            >
              <TextButtonTerapies style={{}} color={orderBy === "desc"}>
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
              onPress={() => handleDistance("near")}
              isActiveColor={orderDistance === "near"}
            >
              <TextButtonTerapies color={orderDistance === "near"}>
                Mais próximos
              </TextButtonTerapies>
            </ButtonTherapie>
            <ButtonTherapie
              width="60%"
              height="40px"
              background_color={theme.colors.orange}
              border
              onPress={() => handleDistance("far")}
              isActiveColor={orderDistance === "far"}
            >
              <TextButtonTerapies color={orderDistance === "far"}>
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
            onPress={() => handleNavigate()}
          >
            <TextButtonFooter>Salvar filtros</TextButtonFooter>
          </Button>
        </WrapperButtonsFooter>
      </ContentFooter>
    </Container>
  );
}
