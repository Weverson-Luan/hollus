import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';
import { Container, Title, WrapperIcon, TextEdit } from './styles';

export function QueryData() {
  const theme = useTheme();
  return (
    <Container>
      <Title>Dados da consulta</Title>
      <WrapperIcon>
        <MaterialIcons name="mode-edit" size={20} color={theme.colors.orange} />
        <TextEdit>Editar</TextEdit>
      </WrapperIcon>
    </Container>
  );
}
