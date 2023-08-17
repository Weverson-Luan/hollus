/* eslint-disable @typescript-eslint/no-shadow */
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Cotainer = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;

  /* border-top-width: 1px; */
  border-color: ${({ theme }) => theme.colors.gray_25};
  padding: ${RFValue(10)}px;
`;
export const Main = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

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
export const Title = styled.Text``;

export const WrapperInput = styled.View`
  width: 100%;
  position: relative;
  /* padding: ${RFValue(10)}px ${RFValue(20)}px 0 ${RFValue(20)}px; */
  /* background-color: blue; */
  flex-direction: column;
  align-items: flex-start;
`;

export const WrapperInputRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(10)}px;
`;

export const WrapperIcon = styled.View`
  position: absolute;
  margin-left: ${RFValue(10)}px;
  align-items: center;
`;
export const Input = styled.TextInput`
  width: 100%;
  height: 40px;

  border-radius: 6px;

  border: 1px solid ${({ theme }) => theme.colors.gray_25};
  padding-left: ${RFValue(38)}px;
  color: ${({ theme }) => theme.colors.black};
`;
export const TitleFilter = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 6px;
`;
export const ClearFilter = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
  margin-left: 6px;
`;
export const WrapperFilter = styled.View`
  /* flex-direction: row; */
  /* margin-top: ${RFValue(16)}px; */
`;
export const WrapperRecomendads = styled.View`
  width: 100%;
  /* height: 60px; */
  /* margin-top: ${RFValue(-8)}px; */
  border: 1px solid ${({ theme }) => theme.colors.gray_25};
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
`;
export const TitleRecomedados = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray_150};
  margin-left: 6px;
  font-weight: 500;
`;
export const WrapperContentInfo = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(110)}px;
  margin-top: ${RFValue(-8)}px;
  padding: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
`;
export const ImageProfile = styled.Image`
  width: 80px;
  height: 80px;

  border-radius: 40px;
  margin-top: ${RFValue(6)}px;
`;
export const DescriptionInfo = styled.View`
  margin-left: -16px;
`;
export const HeaderTitle = styled.View`
  width: ${RFValue(140)}px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
export const WrapperPonts = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${RFValue(12)}px;
`;
export const TitlePont = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.gray_150};
  margin-left: ${RFValue(6)}px;
`;
export const TitleName = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray_200};
`;
export const WrapperDate = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const TitleDate = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray_150};
  margin-left: ${RFValue(6)}px;
`;
export const WrapperLocation = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const TitleLocation = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray_150};
  margin-left: ${RFValue(6)}px;
`;
export const WrapperDestaque = styled.View`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
`;
export const WrapperSpace = styled.View`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
`;
