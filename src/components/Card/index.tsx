import React from "react";
import { useTheme } from "styled-components";

// icones
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

// types
import { IUserTherapists } from "../../dtos/therepies-user-dto";

// styles
import {
  Container,
  WrapperContentInfo,
  ImageProfile,
  DescriptionInfo,
  HeaderTitle,
  TitleName,
  WrapperPont,
  TitlePont,
  WrapperDate,
  TitleDate,
  WrapperLocation,
  TitleLocation,
} from "./styles";

export function Card(data: any) {
  const theme = useTheme();
  return (
    <Container>
      <WrapperContentInfo>
        <ImageProfile
          source={{
            uri: data.data.image_therapies,
          }}
        />
        <DescriptionInfo>
          <HeaderTitle>
            <TitleName>{data.data.name}</TitleName>

            <WrapperPont>
              <AntDesign
                name="star"
                size={14}
                color={theme.colors.orange_100}
              />
              <TitlePont>{data.data.pont}</TitlePont>
            </WrapperPont>
          </HeaderTitle>

          <WrapperDate>
            <AntDesign
              name="clockcircleo"
              size={14}
              color={theme.colors.gray_150}
            />
            <TitleDate>
              {data.data.date_scheduling} às {data.data.hors}
            </TitleDate>
          </WrapperDate>

          <WrapperLocation>
            <Entypo
              name="location-pin"
              size={14}
              color={theme.colors.gray_150}
            />
            <TitleLocation>{data.data.space}</TitleLocation>
          </WrapperLocation>
        </DescriptionInfo>

        <Ionicons
          name="ellipsis-vertical"
          size={28}
          color={theme.colors.gray_150}
        />
      </WrapperContentInfo>
    </Container>
  );
}
