/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  width?: string;
  height: string;
  background_color?: string;
  isActiveColor?: boolean;
  border?: boolean;
  children: ReactNode;
}
export function ButtonOrder({
  width,
  height,
  background_color,
  isActiveColor,
  border,
  children,
  ...rest
}: ButtonProps) {
  return (
    <Container
      {...rest}
      width={width}
      height={height}
      background_color={background_color}
      border={border}
      isActiveColor={isActiveColor}
    >
      {children}
    </Container>
  );
}
