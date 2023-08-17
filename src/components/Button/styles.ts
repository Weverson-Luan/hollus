import styled from 'styled-components/native';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps extends TouchableOpacityProps {
  width?: string;
  height: string;
  background_color: string;
  border?: boolean;
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  background-color: ${({ theme, background_color }) => background_color || theme.colors.white};
  border-radius: 6px;
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || '100%'};

  align-items: center;
  justify-content: center;
  padding: 4px;
  flex-direction: row;

  border: ${({ border, theme }) => (border ? `1px ${theme.colors.orange}` : '1px white')};
  margin-bottom: ${RFValue(15)}px;
`;
