import {useNavigation} from '@react-navigation/native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import {Container, Title} from './styles';
import {
  Calendar,
  ClockCounterClockwise,
  Pencil,
  ChatDots,
} from 'phosphor-react-native';

export function CardDrawerNavigation({data}: any) {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate(data.route)}>
      {data?.name === 'Editar perfil' && (
        <Pencil size={24} color={theme.colors.orange} />
      )}

      {data?.name === 'Gerenciar horários' && (
        <Calendar size={24} color={theme.colors.orange} />
      )}

      {data?.name === 'Histórico de Consultas' && (
        <ClockCounterClockwise size={24} color={theme.colors.orange} />
      )}

      {data?.name === 'Fale conosco' && (
        <ChatDots size={24} color={theme.colors.orange} />
      )}
      <Title style={{}}>{data.name}</Title>
    </Container>
  );
}
