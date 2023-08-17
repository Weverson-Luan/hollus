/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


// components
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';


import {
  Cotainer,
  WrapperHeader,
  WrapperDescription,
  Title,
  SubTitle,
  WrapperInput,
  LabelInput,
  ButtonCodigo,
  NotRecebiCodigo,
  WrapperButtons,
  TitleSearchTerapia,
} from './styles';


export function RegisterSeptTwo() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <>
      <WrapperHeader>
        <Header
          background_color1={theme.colors.orange_100}
          background_color2={theme.colors.orange_100}
          text_color2={theme.colors.orange_100}
        />
      </WrapperHeader>
      <Cotainer>
        <WrapperDescription>
          <Title>Confirmação</Title>
          <SubTitle>
            Para o seu acesso na plataforma, vamos precisar que você insira
            alguns dados abaixo:
          </SubTitle>
        </WrapperDescription>

        <WrapperInput>
          <LabelInput>Código*</LabelInput>
          <Input
            placeholderTextColor={theme.colors.gray_80}
            placeholder="Digite o seu códidigo recebido..."
            width="100%"
            height="45px"
            color={theme.colors.white}
          />
          <ButtonCodigo>
            <NotRecebiCodigo>Não recebir o código</NotRecebiCodigo>
          </ButtonCodigo>
        </WrapperInput>
      </Cotainer>
      <WrapperButtons>
        <Button
          width="100%"
          height="45px"
          background_color={theme.colors.orange}
          border
          onPress={() => navigation.navigate('RegisterSepThree')}
        >
          <TitleSearchTerapia>Próximo</TitleSearchTerapia>
        </Button>
      </WrapperButtons>
    </>
  );
}
