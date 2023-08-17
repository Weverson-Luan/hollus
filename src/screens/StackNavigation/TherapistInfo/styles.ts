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

  /* height: ${RFValue(700)}px; */
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
export const WrapperAbout = styled.View`
  width: 100%;
  height: ${RFValue(130)}px;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  margin-bottom: ${RFValue(8)}px;
`;
export const TitleAbout = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const SubTitleAbout = styled.Text`
  font-size: ${RFValue(12)}px;
  margin-top: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.gray_90};
`;
export const WrapperExperience = styled.View`
  width: 100%;
  height: ${RFValue(130)}px;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  margin-bottom: ${RFValue(8)}px;
`;
export const TitleExperience = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const SubTitleExperience = styled.Text`
  font-size: ${RFValue(12)}px;
  margin-top: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.gray_90};
`;
export const WrapperAcademicFormation = styled.View`
  width: 100%;
  height: ${RFValue(130)}px;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  margin-bottom: ${RFValue(8)}px;
`;
export const TitleAcademicFormation = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const SubTitleAcademicFormation = styled.Text`
  font-size: ${RFValue(12)}px;
  margin-top: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.gray_90};
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
`;
export const WrapperLocatinIcon = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;

  flex-direction: row;
  align-items: center;
`;
export const TitleLocationMap = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.orange_100};
`;
export const TitleLocation = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const SubTitleLocation = styled.Text`
  font-size: ${RFValue(12)}px;

  margin-left: ${RFValue(4)}px;
  color: ${({ theme }) => theme.colors.gray_90};
`;
export const WrapperAboutQuery = styled.View`
  width: 100%;
  height: ${RFValue(130)}px;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  margin-bottom: ${RFValue(8)}px;
`;
export const TitleAboutQuery = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const SubTitleAboutQuery = styled.Text`
  font-size: ${RFValue(12)}px;
  margin-top: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.gray_90};
`;
export const WrapperClassification = styled.View`
  width: 100%;
  height: ${RFValue(80)}px;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  margin-bottom: ${RFValue(8)}px;
`;
export const ContentClassification = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
`;
export const TitleClassification = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const WrapperClassificationHeader = styled.View`
  width: 100%;

  margin-bottom: ${RFValue(8)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(8)}px;
`;
export const WrapperClassificationIcon = styled.View`
  width: 70%;
  flex-direction: row;
  align-items: center;

  margin-top: ${RFValue(8)}px;
`;
export const SubTitleClassification = styled.Text`
  font-size: ${RFValue(12)}px;
  /* margin-top: ${RFValue(8)}px; */
  color: ${({ theme }) => theme.colors.gray_90};
`;
export const SubTitleClassificationPont = styled.Text`
  font-size: ${RFValue(12)}px;
  margin-left: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.gray_90};
`;
export const TitleComment = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_150};

  margin-bottom: ${RFValue(0)}px;
`;
export const WrapperComment = styled.View`
  width: 100%;

  height: ${RFValue(60)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const ImageUserComment = styled.Image`
  width: 50px;
  height: 50px;

  border-radius: 30px;
`;
export const WrapperCommentHeader = styled.View`
  width: 80%;
`;
export const WrapperCommentInfo = styled.View`
  width: 100%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray_25};

  margin-bottom: 40px;
`;
export const SubTitleComment = styled.Text`
  font-size: ${RFValue(12)}px;
  margin-top: ${RFValue(4)}px;
`;
export const WrapperDescription = styled.View`
  width: 100%;
  /* border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray_25};

  margin-bottom: 40px; */
  padding: 12px;
`;
export const DesctiptionTextComment = styled.Text`
  font-size: ${RFValue(12)}px;
  margin-top: ${RFValue(4)}px;
  color: ${({ theme }) => theme.colors.gray_90};
`;
export const WrapperButton = styled.View`
  width: 100%;

  padding: 12px;
`;
export const TextButton = styled.Text`
  font-size: ${RFValue(12)}px;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFPercentage(2)}px;
`;
