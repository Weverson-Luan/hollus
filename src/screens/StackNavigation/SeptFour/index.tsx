import React from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

// assets
import ImageSuccessSVG from '../../../assets/svg/logo-signin-sucess.svg';

// components
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';

// styled-components
import {
  Container,
  WrapperHeader,
  WrapperImageSVG,
  WrapperDescription,
  Title,
  SubTitle,
  WrapperButtons,
  TitleAccess,
  TitlePerform,
} from './styles';

export function RegisterSeptFour() {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <WrapperHeader>
        <Header
          background_color1={theme.colors.orange_100}
          background_color2={theme.colors.orange_100}
          background_color3={theme.colors.orange_100}
          background_color4={theme.colors.orange_100}
          text_color4={theme.colors.orange_100}
         />
      </WrapperHeader>

      <Container>
        <WrapperImageSVG>
          <ImageSuccessSVG width={350} height={250} />
        </WrapperImageSVG>
      </Container>

      <WrapperButtons>
        <WrapperDescription>
          <Title>Bem-vindo!</Title>
          <SubTitle>
            O seu cadastro foi concluído com sucesso e você pode acessar todas as
            funcionalidades da nossa plataforma.
          </SubTitle>
        </WrapperDescription>
        <Button
          width="100%"
          height="45px"
          background_color={theme.colors.orange}
          border
          onPress={() => navigation.navigate('AuthenticateBottomTabsNavigation')}
        >
          <TitleAccess>Acessar a plataforma</TitleAccess>
        </Button>

        <Button
          width="100%"
          height="45px"
          background_color={theme.colors.white}
          border
          onPress={() => navigation.navigate('Register')}
        >
          <TitlePerform>Realizar um novo cadastro</TitlePerform>
        </Button>
      </WrapperButtons>
    </>
  );
}
