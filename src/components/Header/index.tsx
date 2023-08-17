/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useTheme } from 'styled-components';
import { View } from 'react-native';

// interface
import { IWrapperBallProps } from './dtos/wrapperBallProps';

// style-components
import {
  MainContainer,
  Main,
  Ball,
  WrapperBallProps,
  Title,
  TitleBall,
} from './styles';

export function Header(
  { background_color1,text_color1,
    background_color2,text_color2,
    background_color3, text_color3,
    background_color4, text_color4,
   }: IWrapperBallProps) {

  const theme = useTheme();

  return (
    <>
      <MainContainer >
        <Main>
          <WrapperBallProps background_color={ background_color1} >
            <Title>01</Title>
          </WrapperBallProps>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.gray_50,
              width: 160,
            }}
          />
        </Main>

        <Main>
          <WrapperBallProps background_color={background_color2} >
            <Title>02</Title>
          </WrapperBallProps>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.gray_50,
              width: 160,
            }}
          />
        </Main>

        <Main>
          <WrapperBallProps background_color={background_color3}>
            <Title>03</Title>
          </WrapperBallProps>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.gray_50,
              width: 100,
            }}
          />
        </Main>

        <Main>
          <WrapperBallProps background_color={background_color4}>
            <Title>04</Title>
          </WrapperBallProps>
        </Main>
      </MainContainer>
      <Ball>
        <TitleBall background_color={text_color1}>Dados</TitleBall>
        <TitleBall background_color={text_color2}>Confirmação</TitleBall>
        <TitleBall background_color={text_color3}>Preferência</TitleBall>
        <TitleBall background_color={text_color4}>Conclusão</TitleBall>
      </Ball>
    </>
  );
}
