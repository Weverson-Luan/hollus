import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  margin-top: 2px;
`;

export const WrapperInput = styled.View`
  width: 100%;
  position: relative;
  padding: 24px;
`;
export const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const WrapperIcon = styled.View`
  position: absolute;
  margin-top: ${RFValue(28)}px;
  margin-left: ${RFValue(30)}px;
  align-items: center;
`;
export const FlatListChat = styled.FlatList``;
export const BorderTop = styled.View`
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
`;
export const WrapperProfile = styled.TouchableOpacity``;
export const WrapperChatUser = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
`;
export const WrapperImageProfile = styled.View``;
export const WrapperIconCheck = styled.View`
  flex-direction: row;
`;
export const ImageProfile = styled.Image`
  width: 50px;
  height: 50px;

  border-radius: 60px;
  margin-top: ${RFValue(6)}px;
`;
export const WrapperTitle = styled.View`
  padding-left: ${RFValue(20)}px;
`;
export const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const SubTitle = styled.Text`
  font-weight: normal;
  font-size: 14px;

  color: ${({ theme }) => theme.colors.gray_90};
  margin-left: ${RFValue(4)}px;
  width: ${RFValue(140)}px;
`;
export const WrapperIconRight = styled.View`
  width: 30%;

  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;
