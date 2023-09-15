import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Wrapper = styled.View`
  width: 100%;
  align-items: center;
  padding: ${RFValue(16)}px;
  background-color: #fff;
  border-radius: 8px;
`;
export const Title = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;
export const WrapperModal = styled.View`
  width: 100%;
`;
export const WrapperInput = styled.View`
  width: 100%;
  flex-direction: column;

  height: 90px;

`;
export const LabelText = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${RFPercentage(2)}px;
  margin-bottom: 6px;
  text-align: start;
`;
export const WrapperButton = styled.View`
  width: 100%;
  margin-top: 20px;
`;
