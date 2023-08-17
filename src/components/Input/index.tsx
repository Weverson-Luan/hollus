import React from 'react';
import { TextInputProps } from 'react-native';
import { MaskInputProps } from 'react-native-mask-input';
import { Container, TextInputForm } from './styles';

interface InputProps extends TextInputProps {
  width: string;
  height: string;
  color: string;
}
export function Input({ width, height, color, ...rest }: InputProps) {
  return (
    <Container>
      <TextInputForm style={{}} {...rest} width={width} height={height} color={color} />
    </Container>
  );
}
interface MaskedInputProps extends MaskInputProps {
  width: string;
  height: string;
  color: string;
}
export function MaskInput({ width, height, color, ...rest }: MaskedInputProps) {
  return (
    <Container>
      <TextInputForm style={{}} {...rest} width={width} height={height} color={color} />
    </Container>
  );
}
