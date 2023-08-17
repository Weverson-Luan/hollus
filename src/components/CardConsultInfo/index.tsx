import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components';
import { Container, WrapperCard, Title, SubTitle } from './styles';

export function CardConsultInfo({ info }: any) {
  const theme = useTheme();
  return (
    <Container>
      <WrapperCard>
        <FontAwesome5 name="calendar-alt" size={18} color={theme.colors.orange} />
        <Title> {info.texte}!</Title>
      </WrapperCard>
      <SubTitle>{info.subText}</SubTitle>
    </Container>
  );
}
