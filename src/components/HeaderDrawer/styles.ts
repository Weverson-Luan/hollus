import { Image, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.green};
`;
export const WrapperHeaderDrawerNavigation = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;

  background-color: ${({theme})=> theme.colors.white};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: ${({theme})=> theme.colors.gray_25};
`;
export const Title = styled.Text`
  font-size: 18px;
`;

export const Logo =styled(Image)`
  flex:1;
  width: ${RFValue(120)}px;
  height: ${RFValue(50)}px;
`;

export const Placeholder= styled(View)`
  flex: 1;
  height: 100%;
`;

export const IconWrapper =styled(View)`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

export const Icon = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  align-content: center;
`;