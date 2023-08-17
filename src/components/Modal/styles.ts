import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Wrapper = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  padding: ${RFValue(12)}px;
`;
export const Title = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;
export const WrapperModal = styled.View`
  width: 100%;
`;
export const LabelText = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${RFPercentage(2)}px;
  margin-bottom: 6px;
  text-align: center;
`;
export const WrapperButton = styled.View`
  width: 100%;
  margin-top: 50px;
`;
