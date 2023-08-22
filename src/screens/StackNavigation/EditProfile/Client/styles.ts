import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
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

export const PhotoWrapper = styled.View`
  height: ${RFValue(150)}px;
  margin-bottom: ${RFValue(20)}px;
  justify-content: center;
  align-items: center;
`;
export const PhotoTouchable = styled.TouchableOpacity`
  border-radius: 1000000px;
  height: ${RFValue(150)}px;
  width: ${RFValue(150)}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  /* border-width: 1px; */
`;

export const PhotoChangeText = styled.Text`
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  height: 30%;
  width: 100%;
  top: 75%;
  text-align: center;
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.white};
  padding-top: ${RFValue(5)}px;
  padding-bottom: ${RFValue(5)}px;
`;

export const Photo = styled.Image`
  height: 100%;
  width: 100%;
`;
