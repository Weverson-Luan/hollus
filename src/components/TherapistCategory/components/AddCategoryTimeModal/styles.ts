/**
 * IMPORTS
 */
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const CategoryTimeModal = styled.Modal`

  max-height: 400px;
`;


export const AddCategoryTimeView = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AddCategoryTimeHeader = styled.View`
  width: 100%;
  padding: ${RFValue(10)}px 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${({theme}) => theme.colors.orange};
  align-content: center;
  justify-content: center;
  flex-direction: row;
  position: relative;
`;

export const AddCategoryTimeHeaderText = styled.Text`
  font-size: ${RFValue(18)}px;
  background-color: ${({theme}) => theme.colors.orange};
  color: ${({theme}) => theme.colors.white};
  text-align: center;
`;
export const AddCategoryTimeHeaderButton = styled.TouchableOpacity`
  align-content: center;
  justify-content: center;
  position: absolute;
  right: ${RFValue(20)}px;
  align-self: center;
`;

export const CategoryTextLoding = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme})=> theme.colors.gray_90};
  margin-bottom: 24px;
`;
export const AddCategoryLabel = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-bottom: ${RFValue(5)}px;
  color: ${({theme}) => theme.colors.black};
  text-align: center;
`;
export const AddCategoryTimeTouchable = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.orange};
  border-radius: 10px;
  padding: ${RFValue(10)}px;
`;
export const AddCategoryTimeSaveButton = styled.TouchableOpacity`
  background-color: ${props =>
    props.disabled ? props.theme.colors.gray_80 : props.theme.colors.orange};
  padding: ${RFValue(9)}px;
  text-align: center;
  width: ${RFValue(280)}px;
  margin-bottom: 8px;
  margin-top: 16px;
  border-radius: 8px;
`;

export const AddCategoryTime = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.white};
  text-align: center;
`;

export const AddCategoryFieldWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(10)}px;
`;
export const AddCategoryTimeDaysRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${RFValue(5)}px;
`;
export const AddCategoryTimeDayTouchable = styled.TouchableOpacity`
  background-color: ${(props: any) =>
    props.selected ? props.theme.colors.orange : props.theme.colors.gray_25};
  border-radius: 100000px;
  height: ${RFValue(30)}px;
  width: ${RFValue(30)}px;
  margin: 0 ${RFValue(5)}px;
  justify-content: center;
  align-items: center;
`;
export const AddCategoryTimeDay = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${(props: any) =>
    props.selected ? props.theme.colors.white : props.theme.colors.orange};
`;