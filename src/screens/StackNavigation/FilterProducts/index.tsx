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
  getProductCategories,
} from "../../../context/hooks/Filter/useFilter";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

export function FilterProducts({ route, navigation }) {
  const { params } = useRoute();
  const [selectedCategory, setSelectedCategory] = useState(params?.selectedCategory);
  const theme = useTheme();
  const [categories, setCategories] = useState<ICategories>();

  async function handleGetCategories() {
    const response = await getProductCategories();
    response.success && setCategories(response.data);
  }

  useEffect(() => {
    handleGetCategories();
  }, []);

  // useEffect(()=>{
  //   console.log(params)
  // },[params])
  return (
    <Container
      contentContainerStyle={{ justifyContent: "space-between", flex: 1 }}
    >
      <WrapperTypeTerapies>
        <ContentButton>
          <TitleTypeTerapies>
            Categorias de produtos
          </TitleTypeTerapies>
          <WrapperButtonsTerapies>
            {categories?.map((category) => (
              <ButtonTherapie
                key={category.id}
                width="50%"
                height="40px"
                onPress={() => setSelectedCategory(category)}
                background_color={theme.colors.orange}
                isActiveColor={selectedCategory?.id === category.id}
                border
              >
                <TextButtonTerapies
                  color={selectedCategory?.id === category.id}

                >
                  {category.nome}
                </TextButtonTerapies>
              </ButtonTherapie>
            ))}
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
            onPress={() =>
              navigation.navigate("Produtos", { selectedCategory: selectedCategory })
            }
          >
            <TextButtonFooter style={{}}>Salvar filtros</TextButtonFooter>
          </Button>
        </WrapperButtonsFooter>
      </ContentFooter>
    </Container>
  );
}
