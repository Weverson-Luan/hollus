import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

//icons
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

//components
import { CardDrawerNavigation } from "../../../components/CardDrawerNavigation";

//services
import {
  navigationList,
  navigationListClient,
  navigationListTherapist,
} from "../../../services/navigation/navigation";
import { useAuth } from "../../../context/hooks/Auth/useAuth";

//styled-component
import {
  Container,
  WrapperHeader,
  Icon,
  TitleHeader,
  WrapperImage,
  Image,
  Title,
  WrapperLogout,
  TitleLogout,
} from "./styles";
import { getMyInfo } from "../../../context/hooks/User/useUser";
import { ActivityIndication } from "../../../components/Spinner";

export function UserPanel({ navigation, route }) {
  const theme = useTheme();
  const auth = useAuth();
  const [userInfo, setUserInfo] = useState();
  const isFocused = useIsFocused();
  useEffect(() => {
    setUserInfo(auth.handleGetUser());
    // console.log(auth.handleGetUser());
  }, [isFocused]);

  return (
    <>
      <Container>
        {/* <WrapperHeader>
          <Icon onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={22} color={theme.colors.white} />
          </Icon>
          <TitleHeader>Painel do usuário</TitleHeader>
        </WrapperHeader> */}
        {typeof userInfo === "undefined" ? (
          <ActivityIndication />
        ) : (
          <>
            <WrapperImage>
              <Image
                source={{
                  uri: userInfo?.link_foto,
                }}
              />
              <Title>{userInfo?.nome}</Title>
            </WrapperImage>

            <FlatList
              data={
                userInfo.papel_id === 2
                  ? navigationListClient
                  : navigationListTherapist
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CardDrawerNavigation data={item} />}
            />
          </>
        )}
      </Container>
      <WrapperLogout
        onPress={async () => {
          console.log("logout");
          auth.handleLogout();
        }}
      >
        <Feather name={"log-out"} size={18} color={theme.colors.orange_100} />
        <TitleLogout>Logout</TitleLogout>
      </WrapperLogout>
    </>
  );
}
