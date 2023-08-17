import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
`;
export const WrapperImageProduct = styled.View`
  border-radius: 50px;
  margin-left: ${RFValue(20)}px;

  align-items: center;
  justify-content: center;
`;
export const ImageProduct = styled.Image`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;

  border-radius: 50px;
`;
export const TitleProduct = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.gray_200};
  margin-top: 4px;
`;
