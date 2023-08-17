import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Main = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 12px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray_200};
  margin-top: ${RFValue(10)}px;
  font-size: ${RFValue(16)}px;
  /* font-weight: bold; */
  margin-bottom: 20px;
`;
export const WrapperHorsSelected = styled.View`
  width: 99%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: transparent;
  border: 1px;
  border-color: #cecece;
  border-radius: 6px;
  `; 
export const TitleButtonNext = styled.Text`
    color: ${({ theme }) => theme.colors.white};
    font-size: ${RFValue(16)}px;
    font-weight: normal;
    flex-wrap: wrap;
`;
export const WrapperButtonNext = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-left: ${RFValue(8)}px;
  padding-right: ${RFValue(8)}px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  background-color: ${({ theme }) => theme.colors.white};
`;
export const TitleHorsSelect = styled.Text`
  width: 330px;
  color: ${({ theme }) => theme.colors.gray_200};
  font-size: ${RFValue(13)}px;
  /* font-weight: normal; */
  margin-left: 6px;
`;

/**
 * CSS-NATIVE
 */

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  calendar: {
    marginBottom: 20,
    backgroundColor: "#E68011",
    width: Dimensions.get('window').width - 20,
    height: 370,
    borderRadius: 8,
  },
  switchContainer: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  switchText: {
    margin: 10,
    fontSize: 16,
  },
  text: {
    textAlign: "center",
    padding: 10,
    backgroundColor: "lightgrey",
    fontSize: 16,
    width: 390,
  },
  disabledText: {
    color: "grey",
  },
  defaultText: {
    color: "purple",
  },
  customCalendar: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  customDay: {
    textAlign: "center",
  },
  customHeader: {
    backgroundColor: "#FCC",
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: -4,
    padding: 8,
  },
  customTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  customTitle: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "#FFF",
    
  },
});


/**
 * EXPORTS
 */
export { styles };