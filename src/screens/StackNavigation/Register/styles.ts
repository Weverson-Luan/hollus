import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  padding: 24px;
`;
export const WrapperImageSVG = styled.View`
  width: 100%;
  margin-top: ${RFValue(32)}PX;
`;
export const WrapperDescription = styled.View`
  width: 100%;
  height: ${RFValue(70)}px;

  margin-top: ${RFPercentage(4)}px;
  margin-bottom: ${RFPercentage(2)}px;
`;
export const Title = styled.Text`
  font-size: ${RFPercentage(3)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_200};
  margin-bottom: ${RFValue(6)}px;
`;
export const SubTitle = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_90};
`;
export const WrapperButtons = styled.View`
  width: 100%;
`;
export const TitleSearchTherapy = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.white};
`;
export const TitleAm = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.orange_100};
`;
export const TitleSpace = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.orange_100};
`;
