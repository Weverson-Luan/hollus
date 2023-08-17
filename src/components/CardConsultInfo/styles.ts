import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: ${RFValue(18)}px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};

  margin-bottom: ${RFValue(6)}px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray_200};
  font-size: ${RFValue(14)}px;
  margin-left: ${RFValue(6)}px;
  font-weight: bold;
`;
export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray_90};
  font-size: ${RFValue(12)}px;
  margin-left: ${RFValue(24)}px;
  font-weight: normal;
`;
export const WrapperCard = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
