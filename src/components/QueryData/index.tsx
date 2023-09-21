import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import {Container, Title, WrapperIcon, TextEdit} from './styles';
import {Pencil} from 'phosphor-react-native';

export function QueryData() {
  const theme = useTheme();
  const {navigate} = useNavigation();
  return (
    <Container>
      <Title>Dados da consulta</Title>
      <WrapperIcon onPress={() => navigate('GerenciarConsultas')}>
        <Pencil size={20} color={theme.colors.orange} />
        <TextEdit>Editar</TextEdit>
      </WrapperIcon>
    </Container>
  );
}
