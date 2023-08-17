import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import styled from "styled-components/native";

import { Image, View } from "react-native";

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
`;
export const WrapperHeaderRadius = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: space-evenly;
`;
export const WrapperHeaderIcon = styled.View`
  width: 100%;
  margin-top: 25%;
  align-items: center;
  justify-content: center;
`;
export const WrapperSelect = styled.View`
  width: 100%;
  flex-direction: row-reverse;
  align-items: flex-start;
  padding: 12px;
`;
export const WrapperHeaderDescription = styled.View`
  width: 100%;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
`;
export const TitleWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray_200};
  font-size: ${RFPercentage(3)}px;
`;
export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.gray_200};
  font-size: ${RFPercentage(2)}px;
`;
export const ContainerMain = styled.View`
  padding: 24px;
`;
export const WrapperInput = styled.View`
  width: 100%;
  margin-bottom: 6px;
`;
export const LabelText = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${RFPercentage(2)}px;

  margin-bottom: 6px;
`;
export const WrapperForget = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row-reverse;
  margin-bottom: 32px;
`;
export const TextForget = styled.Text`
  color: ${({ theme }) => theme.colors.orange_100};
  font-size: ${RFPercentage(2)}px;
  margin-bottom: 6px;
`;
export const WrapperButton = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const TextButtonLogin = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFPercentage(2)}px;
  margin-bottom: ${RFValue(6)}px;
`;
export const WrapperFooter = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(2)}px;
`;
export const TextNotAccount = styled.Text`
  color: ${({ theme }) => theme.colors.gray_150};
  font-size: ${RFPercentage(1.6)}px;
`;
export const TextRegister = styled.Text`
  color: ${({ theme }) => theme.colors.orange_100};
  font-size: ${RFPercentage(2)}px;
`;
export const WrapperRegister = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  margin-bottom: 32px;
`;
export const LogoImage = styled(Image)`
  width: ${RFValue(100)}px;
  height: ${RFPercentage(5)}px;
`;
