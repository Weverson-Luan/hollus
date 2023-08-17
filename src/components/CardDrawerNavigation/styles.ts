import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(50)}px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray_25};
  padding-left: ${RFValue(18)}px;
  padding-right: ${RFValue(18)}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.orange};
  margin-left: ${RFValue(8)}px;
`;
