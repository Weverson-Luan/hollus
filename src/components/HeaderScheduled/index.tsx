import React from 'react';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {CalendarCheck} from 'phosphor-react-native';
import {Container, Title, Header, HeaderLeft, HeaderRight} from './styles';

export function HeaderScheduled() {
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <CalendarCheck size={18} color="black" />
          <Title>Agendadas</Title>
        </HeaderLeft>

        <HeaderRight>
          <FontAwesome name="calendar-plus-o" size={18} color="black" />
          <Title>Nova Consulta</Title>
        </HeaderRight>
      </Header>
    </Container>
  );
}
