import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

const StatusBarHeight = StatusBar.currentHeight;

export const NavHeaderWrapper = styled.View`
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.lightMode
      ? props.theme.colors.white
      : props.theme.colors.orange_100};
`;

export const NavHeaderTitle = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-weight: 500;
  font-size: ${RFValue(18)}px;
  font-family: ${(props) => props.theme.fonts.primary_poppins_500};
  /* background-color: ${(props) => props.theme.colors.black}; */
`;

export const NavHeaderText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-weight: 500;
  font-size: ${RFValue(15)}px;
`;

export const NavHeaderIcon = styled.TouchableOpacity`
  /* background-color: ${(props) => props.theme.colors.red}; */
  height: ${RFValue(30)}px;
  width: ${RFValue(50)}px;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(5)}px;
`;

export const NavHeaderLogo = styled.Image`
  /* height: 100px; */
  /* width: 100px; */
  height: ${RFValue(50)}px;
  width: 50%;
`;