/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../styles/colors/theme';

interface ButtonProps extends TouchableOpacityProps {
  width?: string;
  height: string;
  background_color?: string;
  isActiveColor?: boolean;
  border?: boolean;
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  background-color: ${({ theme, background_color, isActiveColor }) =>
    isActiveColor ? background_color : theme.colors.white};

  border-radius: 6px;
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || '100%'};

  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 4px;

  border: ${({ border }) =>
    border ? `1px ${theme.colors.orange}` : '1px white'};
  margin-bottom: ${RFValue(15)}px;
`;
