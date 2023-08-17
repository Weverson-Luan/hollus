import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerHeader: {
    padding: 16,
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
    color: "#FFF",
    fontSize: 18,
    
  },
  titleClean: {
    color: "#FFF",
    // fontWeight: "400",
    
    fontSize: 18,
  },
  subtitle: {
    color: "#FFF",
    // fontWeight: "normal",
    
    fontSize: 14,
  },
  buttonHeader: {
    width: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitleButtonHeader: {
    color: "orange",
    // fontWeight: "normal",
    
    fontSize: 14,
    marginRight: -10,
  },
});
