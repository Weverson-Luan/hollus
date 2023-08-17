import React from 'react';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/Entypo';
import BrasilSVG from '../../assets/svg/br.svg';
import { Container } from './styles';

interface SelectProps {
  options: String[];
  onPress?: () => void;
  selected?: boolean;
  visible?: boolean;
}
export function Select({ onPress, selected }: SelectProps) {
  const theme = useTheme();
  return (
    <>
      <Container onPress={onPress} selected={selected}>
        <BrasilSVG width={30} height={30} />
        <Icon name="chevron-down" color={theme.colors.white} size={22} />
      </Container>
    </>
  );
}
