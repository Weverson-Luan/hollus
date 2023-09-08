import MaskInput from "react-native-mask-input";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
`;

export const WrapperButton = styled.View`
  width: 100%;

  padding-left: 12px;
  padding-right: 12px;

  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ContentButton = styled.View`
  margin-top: ${RFValue(20)}px;
`;

export const TextButton = styled.Text`
  font-size: ${RFValue(12)}px;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFPercentage(2)}px;
`;

export const EmptyMessageContainer = styled.View`
  flex: 1;
  /* background-color: ${({ theme }) => theme.colors.white}; */
  align-items: center;
  justify-content: center;
`;

export const EmptyMessage = styled.Text`
  font-size: ${RFValue(16)}px;
`;

export const AddButtonContainer = styled.View`
  width: 100%;
  padding: 0 16px;
  /* background-color: ${({ theme }) => theme.colors.white}; */
`;

export const AddButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.orange};
  align-self: center;
  margin-bottom: ${RFValue(20)}px;
  height: ${RFValue(40)}px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

export const AddButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(16)}px;
`;

export const DropDownContainer = styled.View`
  width: 80%;
`;

export const ValueInput = styled(MaskInput)`
  /* background-color: red; */
  padding: ${RFValue(5)}px;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.gray_50};
  border-width: 1px;
  text-align: center;
  align-self: center;
  max-width: ${RFValue(100)}px;
  font-size: ${RFValue(14)}px;
  color: #1e1e1e;
`;
