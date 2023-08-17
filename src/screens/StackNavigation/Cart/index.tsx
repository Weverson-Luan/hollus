import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";

//icons
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

//components
import { Button } from "../../../components/Button";

//styled-components
import {
  Main,
  Container,
  Wrapper,
  Title,
  WrapperCardProduct,
  WrapperProduct,
  WrapperImage,
  ImageProduct,
  WrapperInfoProduct,
  WrapperTitleSpace,
  WrapperSpace,
  WrapperPont,
  TitleProductPont,
  TitleProduct,
  TitleSpace,
  WrapperQuantity,
  TitleQuantity,
  SubTitleQuantity,
  WrapperResume,
  WrapperValue,
  TitleValue,
  SubTitleValue,
  WrapperButton,
  TitleButton,
  WrapperButtonNext,
  TitleButtonNext,
} from "./styles";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { ActivityIndication } from "../../../components/Spinner";
import { FlatList, Text, View } from "react-native";

export function Cart() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      const cart = await AsyncStorageLib.getItem("cart");
      setCartItems(JSON.parse(cart));
      setIsLoading(false);
    };
    fetchCart();
  }, []);
  return (
    <Main>
      {isLoading ? (
        <ActivityIndication />
      ) : (
        <>
          <Container>
            {cartItems?.length === 0 || cartItems === null ? (
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: theme.colors.gray_150,
                    width: "50%",
                    textAlign: "center",
                  }}
                >
                  Seu carrinho está vazio
                </Text>
              </View>
            ) : (
              <>
                <Wrapper>
                  <Title>Itens do carrinho</Title>
                </Wrapper>
                <FlatList
                  data={cartItems}
                  keyExtractor={(cartItem) => cartItem.item.id}
                  renderItem={(cartItem) => (
                    <WrapperProduct>
                      <WrapperCardProduct>
                        <WrapperImage>
                          <ImageProduct
                            source={{
                              uri: cartItem.item.item.fotos[0].foto_link,
                            }}
                          />
                        </WrapperImage>

                        <WrapperInfoProduct>
                          <WrapperTitleSpace>
                            <TitleProduct>
                              {cartItem.item.item.nome}
                            </TitleProduct>
                            <WrapperPont>
                              <AntDesign
                                name="star"
                                size={14}
                                color={theme.colors.orange_100}
                              />
                              <TitleProductPont>
                                {cartItem.item.item.nota_media}
                              </TitleProductPont>
                            </WrapperPont>
                          </WrapperTitleSpace>

                          {/* <WrapperSpace>
                    <Entypo
                      name="shop"
                      size={18}
                      color={theme.colors.gray_80}
                    />
                    <TitleSpace>Espaço Teraupeta Soular </TitleSpace>
                  </WrapperSpace> */}
                        </WrapperInfoProduct>
                      </WrapperCardProduct>

                      <WrapperResume>
                        <WrapperQuantity>
                          <TitleQuantity>Quantidade:</TitleQuantity>
                          <SubTitleQuantity>
                            {cartItem.item.quantity}
                          </SubTitleQuantity>
                        </WrapperQuantity>

                        <WrapperValue>
                          <TitleValue>Valor total:</TitleValue>
                          <SubTitleValue>
                            R${" "}
                            {(
                              cartItem.item.quantity * cartItem.item.item.valor
                            ).toFixed(2)}
                          </SubTitleValue>
                        </WrapperValue>
                      </WrapperResume>
                    </WrapperProduct>
                  )}
                />
              </>
            )}
          </Container>
          {cartItems?.length !== 0 && cartItems !== null ? (
            <WrapperButtonNext>
              <WrapperButton>
                <Button
                  width="100%"
                  height="50px"
                  background_color={theme.colors.white}
                  border
                  onPress={() => navigation.goBack()}
                >
                  <TitleButton>Continuar comprando</TitleButton>
                </Button>
              </WrapperButton>
              <Button
                width="100%"
                height="50px"
                background_color={theme.colors.orange}
                border
                onPress={() => navigation.navigate("ResumeRequest")}
              >
                <TitleButtonNext>Avançar na compra</TitleButtonNext>
              </Button>
            </WrapperButtonNext>
          ) : null}
        </>
      )}
    </Main>
  );
}
