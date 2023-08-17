/* eslint-disable prettier/prettier */
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'styled-components';
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
} from './styles';
import { Button } from '../Button';

export function ItemProduct() {
  const theme = useTheme();
  return (
    <Main>
      <Container>
        <Wrapper>
          <Title>Itens do carrinho</Title>
        </Wrapper>
        <WrapperProduct>
          <WrapperCardProduct>
            <WrapperImage>
              <ImageProduct
                source={{
                  uri: 'https://jurovalendo.com.br/wp-content/uploads/2015/07/Pomander-Chakra-Equil%C3%ADbrio-Monas-Flower1-800x600.jpg',
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
                <Entypo name="shop" size={18} color={theme.colors.gray_80} />
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
    </Main>
  );
}
