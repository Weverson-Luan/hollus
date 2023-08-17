import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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
export const OpenMapText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.orange_100};
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
