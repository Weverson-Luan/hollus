import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import theme from '../../styles/colors/theme';

export const ModalBackground = styled(Modal)``;

export const ModalContainer = styled(Pressable)`
  flex: 1;
  z-index: -1;
  padding: 0 75px;
  background-color: 'rgba(0,0,0,0.7)';
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const ModalWindow = styled(View)`
  z-index: 99999999999999999;
  width: ${RFValue(250)}px;
  background-color: ${theme.colors.white};
  padding: ${RFValue(24)}px ${RFValue(24)}px;
  border-radius: 5px;
  flex-direction: column;
`;

export const ModalTitle = styled(Text)`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: ${RFValue(10)}px;
`;

export const ModalText = styled(Text)`
  font-size: 14px;
`;

export const ButtonsRow = styled(View)`
  margin-top: ${RFValue(20)}px;
  flex-direction: row-reverse;
  justify-content: flex-start;
`;

export const Button = styled(TouchableOpacity)`
  border-radius: 5px;
  background-color: ${theme.colors.orange};
  padding: ${RFValue(5)}px ${RFValue(10)}px;
  margin-left: ${RFValue(10)}px;
`;

export const ButtonText = styled(Text)`
  color: ${theme.colors.white};
`;