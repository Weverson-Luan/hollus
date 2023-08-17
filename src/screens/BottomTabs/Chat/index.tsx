import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { InputChat } from '../../../components/InputChat';
import {
  Container,
  Title,
  HeaderChat,
  Main,
  WrapperIconArrowLeft,
  WrapperInfoHeader,
  ImageUser,
  WrapperText,
  TileStatus,
  WrapperInfo,
  WrapperInfoDate,
  TextInfoDate,
  ChatMessageTo,
  WrapperChat,
  TextMessageTo,
  WrapperChatMe,
  ChatMessageMe,
  TextMessageMe,
  WrapperInputChat,
  WrapperInput,
  ButtonSendMessage,
} from './styles';
import { useNavigation } from '@react-navigation/native';

export function Chat() {
  const navigation = useNavigation();
  return (
    <>
       <HeaderChat>
      <TouchableOpacity    style={{marginTop: 25}} onPress={()=> navigation.goBack()}>
      <WrapperIconArrowLeft>
          <AntDesign name="arrowleft" size={22} color={'#fff'} />
        </WrapperIconArrowLeft>
      </TouchableOpacity>

        <WrapperInfoHeader>
          <ImageUser
            source={{
              uri: 'https://cdn-uploads-frankfurt2.starofservice.com/uploads/pj/thumbs-medium/starofservice_077208ea9c17039aa49469c1a41818a051621.jpeg',
            }}
          />

          <WrapperText>
            <Title>Pedro Gabriel</Title>
            <TileStatus>Online hà 30 minutos</TileStatus>
          </WrapperText>
        </WrapperInfoHeader>
      </HeaderChat>
    <Container>
        <WrapperInfo>
          <WrapperInfoDate>
            <TextInfoDate> Hoje - 21:20</TextInfoDate>
          </WrapperInfoDate>
        </WrapperInfo>

        <WrapperChat>
          <ChatMessageTo>
            <TextMessageTo>olá, pedro tudo bem ?</TextMessageTo>
          </ChatMessageTo>
        </WrapperChat>
        <WrapperChat>
          <ChatMessageTo>
            <TextMessageTo>olá, pedro tudo bem ?</TextMessageTo>
          </ChatMessageTo>
        </WrapperChat>
        <WrapperChat>
          <ChatMessageTo>
            <TextMessageTo>olá, pedro tudo bem ?</TextMessageTo>
          </ChatMessageTo>
        </WrapperChat>

        <WrapperChatMe>
          <ChatMessageMe>
            <TextMessageMe>olá, estou sim?</TextMessageMe>
          </ChatMessageMe>
        </WrapperChatMe>
        <WrapperChat>
          <ChatMessageTo>
            <TextMessageTo>Nosa consulta esta confirmmado pro dia 20/04/2022 ?</TextMessageTo>
          </ChatMessageTo>
        </WrapperChat>
        <WrapperChat>
          <ChatMessageTo>
            <TextMessageTo>Assim que você poder me responde ok</TextMessageTo>
          </ChatMessageTo>
        </WrapperChat>

        <WrapperChatMe>
          <ChatMessageMe>
            <TextMessageMe>olá, esta sim?</TextMessageMe>
          </ChatMessageMe>
        </WrapperChatMe>
        <WrapperChatMe>
          <ChatMessageMe>
            <TextMessageMe>Està marcada pro dia 20/04/2022 as 14:00 horas</TextMessageMe>
          </ChatMessageMe>
        </WrapperChatMe>

        <WrapperChat>
          <ChatMessageTo>
            <TextMessageTo>Muito obrigado Doutor.</TextMessageTo>
          </ChatMessageTo>
        </WrapperChat>

        <WrapperChatMe>
          <ChatMessageMe>
            <TextMessageMe>De nada rs</TextMessageMe>
          </ChatMessageMe>
        </WrapperChatMe>
    </Container>
          <WrapperInput>
            <InputChat
              width="100%"
              heigth="50px"
              color="#fff"
              placeholder="Digite uma mensagem"
              placeholderTextColor={'#cdcdcd'}
            />
            <ButtonSendMessage style={{ marginTop: -30, marginLeft: 340, width: '80%' }}>
              <MaterialCommunityIcons
                name="send-outline"
                size={28}
                color={'#e2a529'}
              />
            </ButtonSendMessage>
          </WrapperInput>
    </>
  );
}
