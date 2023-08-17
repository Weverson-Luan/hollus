import React from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useTheme } from "styled-components";
import { InputChat } from "../../../components/InputChat";
import { chats } from "../../../services/chat.fake.chat";

import {
  Container,
  WrapperInput,
  Wrapper,
  WrapperIcon,
  BorderTop,
  WrapperProfile,
  WrapperChatUser,
  WrapperImageProfile,
  ImageProfile,
  Title,
  SubTitle,
  WrapperTitle,
  WrapperIconRight,
  WrapperIconCheck,
} from "./styles";
import { HeaderDrawer } from "../../../components/HeaderDrawer";

export function ChatList({ navigation }) {
  const theme = useTheme();
  const navigationAuth = useNavigation();
  return (
    <Container>
      {/* <HeaderDrawer navigation={navigation} /> */}
      <WrapperInput>
        <Wrapper>
          <InputChat
            placeholder="Busque um profissional ou local"
            placeholderTextColor={theme.colors.gray_80}
            color="#fff"
            heigth="35px"
            width="330px"
          />
          <TouchableOpacity onPress={() => navigationAuth.navigate("FaleConosco")}>
            <Ionicons
              style={{ marginLeft: 5, marginBottom: 10 }}
              name="alert-circle"
              size={32}
              color={theme.colors.orange_100}
            />
          </TouchableOpacity>
        </Wrapper>
        <WrapperIcon>
          <Ionicons name="search" size={22} color={theme.colors.gray_80} />
        </WrapperIcon>
      </WrapperInput>
      <BorderTop />
      <View
        style={{
          height: "60%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: theme.colors.gray_150 }}>
          Nenhuma conversa em andamento
        </Text>
      </View>
      {/* <FlatList
        data={chats}
        keyExtractor={(item) => String(item?.id)}
        renderItem={({ item }) => (
          <>
            <WrapperProfile onPress={() => navigationAuth.navigate("Chat")}>
              <WrapperChatUser>
                <WrapperImageProfile>
                  <ImageProfile
                    source={{
                      uri: item.image,
                    }}
                  />
                </WrapperImageProfile>

                <WrapperTitle>
                  <Title>{item?.name}</Title>
                  <WrapperIconCheck>
                    <Entypo
                      name="check"
                      size={18}
                      color={theme.colors.gray_90}
                    />
                    <SubTitle>{item.messeger}</SubTitle>
                  </WrapperIconCheck>
                </WrapperTitle>

                <WrapperIconRight>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={26}
                    color={theme.colors.gray_90}
                  />
                </WrapperIconRight>
              </WrapperChatUser>
            </WrapperProfile>
          </>
        )}
      /> */}
    </Container>
  );
}
