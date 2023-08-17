import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
`;
export const Content = styled.View`
  width: 100%;
  flex: 1;
`;
export const ImageTherapist = styled.Image`
  width: 100%;
  height: ${RFValue(300)}px;
`;
export const WrapperInfo = styled.View`
  width: 100%;
  flex: 2;

  background-color: ${({ theme }) => theme.colors.white};

  border-top-left-radius: ${RFValue(30)}px;
  border-top-right-radius: ${RFValue(30)}px;

  margin-top: ${RFValue(-30)}px;
  padding: 24px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const WrapperHeader = styled.View`
  width: 100%;
  height: ${RFValue(40)}px;

  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};

  margin-bottom: ${RFValue(8)}px;
`;
export const ContentPonts = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
export const TitlePonts = styled.Text`
  margin-left: ${RFValue(10)}px;
`;

export const WrapperLocation = styled.View`
  width: 100%;
  height: ${RFValue(150)}px;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  margin-bottom: ${RFValue(8)}px;
`;

export const WrapperLocationHeader = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(-16)}px;
`;
export const WrapperLocatinIcon = styled.View`
  height: ${RFValue(50)}px;

  flex-direction: row;
  align-items: center;
`;
export const TitleLocationMap = styled.Text`
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.gray_150};
`;
export const TitleLocation = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const SubTitleLocation = styled.Text`
  font-size: ${RFValue(14)}px;

  margin-left: ${RFValue(4)}px;
  color: ${({ theme }) => theme.colors.gray_90};
`;
export const TitleAboutQuery = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const SubTitleAboutQuery = styled.Text`
  font-size: ${RFValue(12)}px;
  margin-top: ${RFValue(8)}px;
`;
export const WrapperClassification = styled.View`
  width: 100%;
  height: ${RFValue(80)}px;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  margin-bottom: ${RFValue(8)}px;
`;

export const TitleClassification = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_150};
`;

export const SubTitleClassification = styled.Text`
  font-size: ${RFValue(12)}px;
`;
export const WrapperButton = styled.View`
  width: 100%;
  padding: 0 ${RFValue(18)}px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;
export const ContentButton = styled.View`
  margin-top: ${RFValue(10)}px;
  width: 100%;
`;
export const TextButton = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const WarningContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${RFValue(10)}px;
  background- color: ${({ theme }) => theme.colors.gray_25};
  border-radius: 100000px;
  padding: ${RFValue(5)}px 40px;
`;

export const WarningText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_150};
  text-align: center;
  flex: 1;
`;

export const WarningSubText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_150};
  text-align: center;
  flex: 1;
`;


export const ProfileButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.orange_100};
  padding: ${RFValue(10)}px;
  border-radius: 10px;
  align-items: center;
  margin: ${RFValue(5)}px 0 ${RFValue(10)}px 0;
`;

export const ProfileButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(15)}px;
`;