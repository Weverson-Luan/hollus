import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
`;

export const WrapperImage = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;

  padding: ${RFValue(24)}px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray_25};
`;
export const Image = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;

  border-radius: ${RFValue(50)}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(17)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_200};
  margin-left: ${RFValue(14)}px;
`;
export const WrapperLogout = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(50)}px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};

  padding-left: ${RFValue(18)}px;
  padding-right: ${RFValue(18)}px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray_25};
`;
export const TitleLogout = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 400;

  margin-left: ${RFValue(8)}px;
`;
