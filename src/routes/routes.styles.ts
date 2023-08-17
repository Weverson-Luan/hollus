import { StyleSheet } from "react-native";
import theme from "../styles/colors/theme";

export const NavHeaderStyles = StyleSheet.create({
  containerHeader: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  icon: {
    marginTop: 10,
  },
  containerInfo: {
    marginLeft: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    color: theme.colors.white,
    fontWeight: "500",
    fontSize: 18,
    fontFamily: theme.fonts.primary_poppins_500,
  },
  rightHeaderText: {
    color: theme.colors.white,
    fontWeight: "500",
    fontSize: 15,
    fontFamily: theme.fonts.primary_poppins_500,
  },
  titleClean: {
    color: theme.colors.white,
    fontWeight: "400",
    fontSize: 18,
  },
  subtitle: {
    color: theme.colors.white,
    fontWeight: "normal",
    fontSize: 14,
  },
  buttonHeader: {
    width: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconNotification: {
    marginRight: 24,
  },
  subtitleButtonHeader: {},
});

export const NavBottomStyles = StyleSheet.create({});

export const BottomTabsScreenOptions = {
  headerTitleAlign: "center",
  headerShown: true,
  headerShadowVisible: true,
  headerTintColor: theme.colors.white,
  headerTitleStyle: {
    fontSize: 16,
  },
  headerStyle: {
    backgroundColor: theme.colors.orange,
  },
  tabBarStyle: {
    backgroundColor: theme.colors.white,
    height: 60,
  },
};
