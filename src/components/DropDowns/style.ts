import { StyleSheet } from "react-native";
import theme from "../../styles/colors/theme";
import styled from "styled-components/native";

export const DropDownContainer = styled.View``;

export const DropDownStyle = StyleSheet.create({
  component: {
    borderColor: theme.colors.gray_50,
    width: "100%",
    // backgroundColor: theme.colors.orange_70,
  },
  container: { width: "100%" },
  dropdownContainer: {
    borderColor: theme.colors.gray_50,
  },
  badgeText: {
    color: theme.colors.white,
  },
});
