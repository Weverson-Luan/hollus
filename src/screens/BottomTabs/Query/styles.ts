import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};

  flex: 1;
`;
export const Wrapper = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  margin-bottom: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const WrapperTitle = styled.View`
  margin-top: ${RFValue(12)}px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  padding-left: ${RFValue(24)}px;
`;
export const WrapperContentInfo = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(110)}px;

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
