import styled from "styled-components/native";
import theme from "../../styles/colors/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const CategoryWrapper = styled.View`
  background-color: ${theme.colors.gray_25};
  border-radius: ${RFValue(10)}px;
  margin: ${RFValue(10)}px 0;
`;

export const CategoryTitleWrapper = styled.View`
  background-color: ${theme.colors.orange};
  width: 100%;
  border-top-left-radius: ${RFValue(10)}px;
  border-top-right-radius: ${RFValue(10)}px;
  padding: ${RFValue(5)}px 0;
`;
export const CategoryTitleText = styled.Text`
  color: ${theme.colors.white};
  text-align: center;
  font-size: ${RFValue(18)}px;
`;
