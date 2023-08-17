import React from "react";
import { ScrollView } from "react-native";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

//icons
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

//components
import { Button } from "../../../components/Button";

//styled-components
import {
  Box,
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
  WrapperDetails,
  TitleDetails,
  WapperTitleOrderNumber,
  TitleOrderNumber,
  SubTitleOrderNumber,
  WapperTitleAccomplished,
  TitleAccomplished,
  SubTitleAccomplished,
  WapperTitleDatePayment,
  TitleDatePayment,
  SubTitleDatePayment,
  WapperTitleToti,
  TitleToti,
  SubTitleTitleToti,
  WrapperStatus,
  TitleOrderStatus,
  WrapperIconStatus,
  TitleIconSeparation,
  WrapperAddress,
  WrapperAddressIcon,
  Titleddress,
  SubTitleAddress,
  WrapperResumeValue,
  WrapperResumeValues,
  TitleResumeValue,
  SubTitleResumeValue,
} from "./styles";

export function OrderDetails() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Box>
      <Main>
        <ScrollView>
          <Container>
            <WrapperDetails>
              <TitleDetails>Detalhes do pedido</TitleDetails>

              <WapperTitleOrderNumber>
                <TitleOrderNumber>Pedido n:°</TitleOrderNumber>
                <SubTitleOrderNumber>20199</SubTitleOrderNumber>
              </WapperTitleOrderNumber>

              <WapperTitleAccomplished>
                <TitleAccomplished>Realizado em:</TitleAccomplished>
                <SubTitleAccomplished>29/04/2022</SubTitleAccomplished>
              </WapperTitleAccomplished>

              <WapperTitleDatePayment>
                <TitleDatePayment>Data de pagamento:</TitleDatePayment>
                <SubTitleDatePayment>29/04/2022</SubTitleDatePayment>
              </WapperTitleDatePayment>

              <WapperTitleToti>
                <TitleToti>Valor total:</TitleToti>
                <SubTitleTitleToti>R$ 72,00</SubTitleTitleToti>
              </WapperTitleToti>
            </WrapperDetails>

            <WrapperStatus>
              <TitleOrderStatus>Status do pedido</TitleOrderStatus>
              <WrapperIconStatus>
                <Entypo name="shop" size={18} color={theme.colors.gray_80} />
                <TitleIconSeparation> Em separação </TitleIconSeparation>
              </WrapperIconStatus>
            </WrapperStatus>

            <Wrapper>
              <Title>Itens do carrinho</Title>
            </Wrapper>
            <WrapperProduct>
              <WrapperCardProduct>
                <WrapperImage>
                  <ImageProduct
                    source={{
                      uri: "https://jurovalendo.com.br/wp-content/uploads/2015/07/Pomander-Chakra-Equil%C3%ADbrio-Monas-Flower1-800x600.jpg",
                    }}
                  />
                </WrapperImage>

                <WrapperInfoProduct>
                  <WrapperTitleSpace>
                    <TitleProduct>Óleo Floral 50ml</TitleProduct>
                    <WrapperPont>
                      <AntDesign
                        name="star"
                        size={14}
                        color={theme.colors.orange_100}
                      />
                      <TitleProductPont>5.0</TitleProductPont>
                    </WrapperPont>
                  </WrapperTitleSpace>

                  <WrapperSpace>
                    <Entypo
                      name="shop"
                      size={18}
                      color={theme.colors.gray_80}
                    />
                    <TitleSpace>Espaço Teraupeta Soular </TitleSpace>
                  </WrapperSpace>
                </WrapperInfoProduct>
              </WrapperCardProduct>

              <WrapperResume>
                <WrapperQuantity>
                  <TitleQuantity>Quantidade:</TitleQuantity>
                  <SubTitleQuantity>01</SubTitleQuantity>
                </WrapperQuantity>

                <WrapperValue>
                  <TitleValue>Valor total:</TitleValue>
                  <SubTitleValue>R$ 60,00</SubTitleValue>
                </WrapperValue>
              </WrapperResume>
            </WrapperProduct>
          </Container>

          <WrapperAddress>
            <Titleddress>Endereço de entrega</Titleddress>

            <WrapperAddressIcon>
              <Entypo
                name="location-pin"
                size={22}
                color={theme.colors.gray_80}
              />
              <SubTitleAddress>
                Rua Joaquin Nabuco n° 260, sala 10 - Aldeota - Belo Horizonte /
                BH{" "}
              </SubTitleAddress>
            </WrapperAddressIcon>
          </WrapperAddress>
          {/* <WrapperResumeValue>
            <TitleResumeValue>Resumo de valores</TitleResumeValue>

            <WrapperResumeValues>
              <Entypo
                name="location-pin"
                size={22}
                color={theme.colors.gray_80}
              />
              <SubTitleValue>Aqui vai os valores ........ </SubTitleValue>
            </WrapperResumeValues>
          </WrapperResumeValue> */}
        </ScrollView>
      </Main>
      <WrapperButtonNext>
        <Button
          width="100%"
          height="50px"
          background_color={theme.colors.orange}
          border
          onPress={() => navigation.navigate("Home")}
        >
          <TitleButtonNext>Ir para tela inicial</TitleButtonNext>
        </Button>
      </WrapperButtonNext>
    </Box>
  );
}
