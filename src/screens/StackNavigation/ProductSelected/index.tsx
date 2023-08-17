/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import {
  Container,
  Content,
  WrapperImageTherapist,
  ButtonLike,
  ImageTherapist,
  WrapperInfo,
  Title,
  WrapperHeader,
  WrapperImage,
  ContentPonts,
  TitlePonts,
  WrapperTitlePrice,
  TitlePrice,
  SubTitleAbout,
  WrapperExperience,
  TitleExperience,
  SubTitleExperience,
  WrapperAcademicFormation,
  TitleAcademicFormation,
  SubTitleAcademicFormation,
  WrapperLocation,
  WrapperLocationHeader,
  WrapperLocatinIcon,
  TitleLocationMap,
  TitleLocation,
  SubTitleLocation,
  WrapperAboutQuery,
  TitleAboutQuery,
  SubTitleAboutQuery,
  WrapperClassification,
  TitleClassification,
  WrapperClassificationHeader,
  ContentClassification,
  WrapperClassificationIcon,
  SubTitleClassification,
  SubTitleClassificationPont,
  TitleComment,
  WrapperComment,
  WrapperCommentHeader,
  ImageUserComment,
  WrapperCommentInfo,
  SubTitleComment,
  WrapperDescription,
  DesctiptionTextComment,
  WrapperButton,
  ButtonAdd,
  TextButtonAdd,
  TextButtonMen,
  TextButton,
} from "./styles";
import { Button } from "../../../components/Button";
import Carousel from "react-native-reanimated-carousel";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import useAlert from "../../../context/hooks/Alert/useAlert";

export function ProductSelected() {
  const { params } = useRoute();
  const theme = useTheme();
  const [quantity, setQuantity] = useState(0);
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const { setAlert } = useAlert();
  const handleIncremented = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const handleAddToCart = async (item) => {
    // await AsyncStorageLib.removeItem("cart");
    const cart = await AsyncStorageLib.getItem("cart");
    if (cart === null) {
      await AsyncStorageLib.setItem(
        "cart",
        JSON.stringify([{ item: item, quantity: quantity }])
      );
    } else {
      const parsedCart = JSON.parse(cart);
      const isInCart = parsedCart.findIndex(
        (cartItem) => cartItem.item.id === item.id
      );
      isInCart !== -1
        ? setAlert(
            "Item no carrinho",
            `O item ${item.nome} já está no carrinho`
          )
        : (parsedCart.push({ item: item, quantity: quantity }),
          setAlert(
            "Item adicionado",
            `O item ${item.nome} foi adicionado ao carrinho`
          ),
          await AsyncStorageLib.setItem("cart", JSON.stringify(parsedCart)));
      // Alert.alert(
      //     "Item no carrinho",
      //     `O item ${item.nome} já está no carrinho`,
      //     [
      //       {
      //         text: `Adicionar mais ${quantity} ${
      //           quantity === 1 ? "unidade" : "unidades"
      //         }`,
      //         onPress: async () => {
      //           parsedCart[isInCart].quantity =
      //             parsedCart[isInCart].quantity + quantity;
      //           await AsyncStorageLib.setItem(
      //             "cart",
      //             JSON.stringify(parsedCart)
      //           );
      //         },
      //       },
      //       {
      //         text: `Ir para o carrinho`,
      //         onPress: () => navigation.navigate("ShoppingCart"),
      //       },
      //     ]
      //   )
    }
  };

  return (
    <>
      <Container>
        <Content>
          <WrapperImageTherapist>
            <Carousel
              width={width}
              height={width / 2}
              autoPlay={true}
              data={params?.item.fotos}
              scrollAnimationDuration={5000}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <ImageTherapist source={{ uri: item?.foto_link }} />
                </View>
              )}
            />
            <ButtonLike>
              <AntDesign name="heart" size={28} color={theme.colors.orange} />
            </ButtonLike>
          </WrapperImageTherapist>

          <WrapperInfo>
            <WrapperHeader>
              <WrapperTitlePrice>
                <Title>{params?.item.nome}</Title>
                <TitlePrice>R$ {params?.item.valor}</TitlePrice>
              </WrapperTitlePrice>

              <ContentPonts>
                <AntDesign
                  name="star"
                  size={14}
                  color={theme.colors.orange_100}
                />
                <TitlePonts>{params?.item.nota_media}</TitlePonts>
              </ContentPonts>
            </WrapperHeader>

            {/* <WrapperLocation>
              <WrapperLocationHeader>
                <WrapperLocatinIcon>
                  <Entypo name="shop" size={18} color={theme.colors.gray_80} />
                  <SubTitleLocation>Espaço Terapeuta Soluar</SubTitleLocation>
                </WrapperLocatinIcon>
              </WrapperLocationHeader>

              <SubTitleLocation>
                Rua Joaquim Nabuco, n°260, sala 10 - Venda Nova - Belo Horizonte
                / MG
              </SubTitleLocation>
            </WrapperLocation> */}
            <TitleExperience>Sobre o produto</TitleExperience>
            <SubTitleExperience>{params?.item.descricao}</SubTitleExperience>
          </WrapperInfo>
        </Content>
      </Container>

      <WrapperButton>
        <ButtonAdd>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TextButtonAdd onPress={() => handleDecrement()}>
              <TextButton> - </TextButton>
            </TextButtonAdd>

            <TextButton>{quantity}</TextButton>
            <TextButtonMen onPress={() => handleIncremented()}>
              <TextButton> + </TextButton>
            </TextButtonMen>
          </View>
        </ButtonAdd>
        {quantity !== 0 ? (
          <Button
            width="60%"
            height="50px"
            background_color={theme.colors.orange_100}
            // onPress={() => navigation.navigate("FormPayment")}
            onPress={async () => handleAddToCart(params?.item)}
          >
            <TextButton>Adicionar ao carrinho</TextButton>
          </Button>
        ) : null}
      </WrapperButton>
    </>
  );
}
