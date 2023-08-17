/**
 * IMPORTS
 */
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ContainerLoading = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;
export const ContentLoading = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;
export const TitleLoading = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_150};
  text-align: center;
  margin-top: 12px;
`;