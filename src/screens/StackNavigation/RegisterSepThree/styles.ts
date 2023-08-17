import { Text } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface TextProps {
  text_select?: boolean;
}

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
`;
export const WrapperHeader = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.white};

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
`;
export const WrapperDescription = styled.View`
  width: 100%;

  margin-top: ${RFPercentage(-1)}px;
  margin-bottom: ${RFPercentage(2)}px;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  padding: 24px;
`;
export const Title = styled.Text`
  font-size: ${RFPercentage(3)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_200};
`;
export const SubTitle = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_90};
`;
export const WrapperButtons = styled.View`
  width: 100%;
  margin-bottom: 4px;
  padding: 24px;

  background-color: ${({ theme }) => theme.colors.white};

  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_50};
`;
export const TitleSearchTherapy = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.white};
`;
export const WrapperTherapy = styled.View`
  width: 100%;

  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 24px;
`;
export const TitleTherapy = styled.Text`
  font-size: ${RFValue(17)}px;
  /* font-weight: 600; */
  color: ${({ theme }) => theme.colors.gray_150};
  margin-left: ${RFValue(24)}px;
`;
export const SubTitleTherapy = styled(Text)<TextProps>`
  font-size: ${RFValue(14)}px;
  font-weight: normal;
  color: ${({ theme, text_select }) => text_select ? theme.colors.white :  theme.colors.orange_100 };
`;
