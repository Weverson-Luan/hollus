import React from 'react';
import { TextInputProps } from 'react-native';
import { Cotainer, TextInputForm } from './styles';

interface InputProps extends TextInputProps {
  width: string;
  heigth: string;
  color: string;
}
export function InputChat({ width, heigth, color, ...rest }: InputProps) {
  return (
    <Cotainer>
      <TextInputForm {...rest} width={width} heigth={heigth} color={color} />
    </Cotainer>
  );
}
