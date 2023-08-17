import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};

  padding: 24px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray_90};
  font-size: ${RFValue(14)}px;
  margin-top: ${RFValue(14)}px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TitleDeliveryAddress = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_200};
  font-weight: 500;
`;
export const WrapperEdit = styled.TouchableOpacity`
  width: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TitleEdit = styled.Text`
  color: ${({ theme }) => theme.colors.orange};
  font-size: ${RFValue(17)}px;
`;
export const WrapperAddress = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: ${RFValue(17)}px; ;
`;
export const TitleAddress = styled.Text`
  color: ${({ theme }) => theme.colors.gray_80};
  font-size: ${RFValue(14)}px;
  margin-top: ${RFValue(10)}px;

  width: 92%;
`;
