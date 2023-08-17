/* eslint-disable @typescript-eslint/no-shadow */
import styled from 'styled-components/native';
import { TextInputProps, TextInput } from 'react-native';
import theme from '../../styles/colors/theme';

interface InputProps extends TextInputProps {
  width?: string;
  heigth?: string;
  color?: string;
}
export const Cotainer = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  height: 40px;
`;

export const TextInputForm = styled(TextInput)<InputProps>`
  width: ${({ width }) => width || 'auto'};
  height: ${({ heigth }) => heigth || 'auto'};
  background-color: ${({ color }) => color || theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.gray_50};
  border-radius: 6px;
  margin-bottom: 16px;

  padding-left: 36px;
  color: ${({ theme }) => theme.colors.gray_200};
`;
export const Title = styled.Text``;
