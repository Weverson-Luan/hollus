import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components';
import {Container} from './styles';

interface ActivityIndicationProps {
  color?: string;
  bgColor?: string;
  size?: number;
}
export function ActivityIndication({
  color = 'default',
  bgColor = 'default',
  size = 32,
}: ActivityIndicationProps) {
  const theme = useTheme();
  return (
    <Container bgColor={bgColor === 'default' ? theme.colors.white : bgColor}>
      <ActivityIndicator
        size={size}
        color={color === 'default' ? theme.colors.orange : color}
      />
    </Container>
  );
}
