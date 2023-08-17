/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useTheme } from 'styled-components';
import { View } from 'react-native';
import {
  MainContainer,
  Main,
  Bolinhas,
  WapperBolinha,
  Title,
  TitleBolinha,
} from './styles';

interface WapperBolinhaProps {
  background_color?: string;
}

export function HeaderRegister({ background_color }: WapperBolinhaProps) {
  const theme = useTheme();
  return (
    <>
      <MainContainer>
        <Main>
          <WapperBolinha>
            <Title>01</Title>
          </WapperBolinha>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.gray_50,
              width: 160,
            }}
          />
        </Main>

        <Main>
          <WapperBolinha background_color={background_color}>
            <Title>02</Title>
          </WapperBolinha>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.gray_50,
              width: 160,
            }}
          />
        </Main>

        <Main>
          <WapperBolinha background_color={background_color}>
            <Title>03</Title>
          </WapperBolinha>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.gray_50,
              width: 100,
            }}
          />
        </Main>

        <Main>
          <WapperBolinha background_color={background_color}>
            <Title>04</Title>
          </WapperBolinha>
        </Main>
      </MainContainer>
      <Bolinhas>
        <TitleBolinha>Dados</TitleBolinha>
        <TitleBolinha>Confirmação</TitleBolinha>
        <TitleBolinha>Preferência</TitleBolinha>
        <TitleBolinha>Conclusão</TitleBolinha>
      </Bolinhas>
    </>
  );
}
