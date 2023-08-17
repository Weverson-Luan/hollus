import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
  padding-left: 14px;
  padding-right: 14px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(17)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;
export const HeaderChat = styled.View`
  width: 100%;
  height: ${RFValue(80)}px;
  background-color: ${({ theme }) => theme.colors.orange_100};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const Main = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
`;
export const WrapperIconArrowLeft = styled.View``;
export const WrapperInfoHeader = styled.View`
  width: ${RFValue(300)}px;
  height: ${RFValue(80)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
 
`;
export const ImageUser = styled.Image`
  width: ${RFValue(45)}px;
  height: ${RFValue(45)}px;
  border-radius: 50px;

  margin-top: ${RFValue(20)}px;
`;
export const WrapperText = styled.View`
  width: 70%;
  margin-top: ${RFValue(20)}px;
`;
export const TileStatus = styled.Text`
  font-size: ${RFValue(13)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.white};
`;
export const WrapperInfo = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: ${RFValue(13)}px;
`;
export const WrapperInfoDate = styled.View`
  width: ${RFValue(120)}px;
  height: ${RFValue(34)}px;
  background-color: ${({ theme }) => theme.colors.orange};

  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(6)}px;
  margin-bottom: ${RFValue(20)}px;
`;
export const TextInfoDate = styled.Text`
  font-size: ${RFValue(13)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.white};
`;
export const WrapperChat = styled.View`
  width: 100%;
  margin-bottom: ${RFValue(8)}px;
`;
export const ChatMessageTo = styled.View`
  width: 50%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.gray_25};
  border-radius: 6px;
`;
export const TextMessageTo = styled.Text`
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const WrapperChatMe = styled.View`
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: ${RFValue(14)}px;
`;
export const ChatMessageMe = styled.View`
  width: 50%;
  padding: 16px;
  background-color: #ffd98c;
  border-radius: 6px;
  margin-top: ${RFValue(16)}px;
`;
export const TextMessageMe = styled.Text`
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const WrapperInputChat = styled.View`
  /* height: 60%;
  align-items: flex-end;
  justify-content: flex-end;

  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: ${RFValue(40)}px; */
  background-color: ${({ theme }) => theme.colors.white};
`;
export const WrapperInput = styled.View`
  margin-bottom: ${RFValue(20)}px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;
export const ButtonSendMessage = styled.TouchableOpacity``;
