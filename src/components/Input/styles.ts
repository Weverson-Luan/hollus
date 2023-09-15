import styled from 'styled-components/native';
import { TextInputProps, TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';

interface InputProps extends TextInputProps {
  width?: string;
  height?: string;
  color?: string;
  textColor?: string;
}

interface IMaskedInputCustomProps extends MaskInputProps {
  width?: string;
  height?: string;
  color?: string;
  textColor?: string;
}
export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TextInputForm = styled(TextInput)<InputProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  background-color: ${({ color, theme }) => color || theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.gray_50};
  border-radius: ${RFValue(4)}px;
  margin-bottom: ${RFValue(12)}px;

  padding: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.gray_200};

  max-width: 100%;
`;

export const MaskedTextInputForm = styled(MaskInput)<IMaskedInputCustomProps>`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  background-color: ${({ color, theme }) => color || theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.gray_50};
  border-radius: ${RFValue(4)}px;
  margin-bottom: ${RFValue(14)}px;

  padding-left: 12px;
  color: ${({ theme, textColor }) => textColor ? textColor : theme.colors.gray_80};
`;

export const Title = styled.Text``;
