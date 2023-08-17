import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTheme } from "styled-components";
import { Button } from "../../../components/Button";
import { CardDeliveryAddress } from "../../../components/CardDeliveryAddress";
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
  WrapperButtonNext,
  TitleButtonNext,
  WrapperResumeValue,
  TitleResumeValue,
  WrapperText,
  Text,
  Price,
  PriceFret,
} from "./styles";
import { FlatList } from "react-native";
import { ActivityIndication } from "../../../components/Spinner";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { getMyInfo } from "../../../context/hooks/User/useUser";
import { getMyAddresses } from "../../../context/hooks/Addresses/useAddresses";

export function ResumeRequest() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [myInfo, setMyInfo] = useState();
  const [address, setAddress] = useState();
  const { params } = useRoute();

  const getTotal = async () => {
    var total = 0;
    cartItems?.map((item) => (total += item.quantity * item.item.valor));
    setCartTotal(total);
  };

  const fetchMyInfo = async () => {
    const res = await getMyInfo();
    setMyInfo(res.data[0]);
    const add = await getMyAddresses();
    setAddress(add.data[0].endereco_completo);
  };

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      const cart = await AsyncStorageLib.getItem("cart");
      setCartItems(JSON.parse(cart));
      getTotal();
    };
    fetchCart();
    fetchMyInfo();
    // params?.address ? setAddress(params?.address.endereco_completo) : null;
    setIsLoading(false);
  }, []);

  return (
    <Main>
      {isLoading ? (
        <ActivityIndication />
      ) : (
        <>
          <Container>
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
                        <TitleProduct>{cartItem.item.item.nome}</TitleProduct>
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

            <CardDeliveryAddress
              // address={address ? address : myInfo?.endereco_completo}
              address={address}
            />
          </Container>

          <WrapperResumeValue>
            <TitleResumeValue>Resumo de valores</TitleResumeValue>

            <WrapperText>
              <Text> Subtotal </Text>
              <Price> R$ {cartTotal.toFixed(2)} </Price>
            </WrapperText>

            <WrapperText>
              <Text> Valor do frete </Text>
              <PriceFret> R$ 12,00 </PriceFret>
            </WrapperText>

            <WrapperText>
              <Text> Preço final </Text>
              <Price> R$ {(cartTotal + 12).toFixed(2)}</Price>
            </WrapperText>
          </WrapperResumeValue>
          <WrapperButtonNext>
            <Button
              width="100%"
              height="50px"
              background_color={theme.colors.orange}
              border
              onPress={() => navigation.navigate("FormPayment", { cart: true })}
            >
              <TitleButtonNext>Escolher forma de pagamento</TitleButtonNext>
            </Button>
          </WrapperButtonNext>
        </>
      )}
    </Main>
  );
}
