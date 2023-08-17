import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  padding: 24px;
`;
export const WrapperHeader = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.white};

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_50};
`;
export const WrapperImageSVG = styled.View`
  width: 100%;
  margin-top: ${RFValue(32)}PX;
`;
export const WrapperDescription = styled.View`
  width: 100%;
  height: ${RFValue(70)}px;

  background-color: ${({ theme }) => theme.colors.white};

  margin-top: ${RFValue(18)}px;
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
`;
export const TitleAccess = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.white};
`;
export const TitlePerform = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.orange_100};
`;
export const LabelInput = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_150};
  margin-bottom: 10px;
`;
export const WrapperInput = styled.View`
  margin-bottom: 16px;
`;
