/**
 * IMPORTS
 */
import styled from "styled-components/native";
import {RFValue} from 'react-native-responsive-fontsize';

 const EditCategoryDescriptionModal = styled.Modal`
`;
 const AddCategoryTimeSaveButton = styled.TouchableOpacity`
  background-color: ${props =>
    props.disabled ? props.theme.colors.gray_80 : props.theme.colors.orange};
  padding: ${RFValue(9)}px;
  text-align: center;
  width: ${RFValue(280)}px;
  margin-bottom: 8px;
  margin-top: 16px;
  border-radius: 8px;
`;
 const AddCategoryTimeHeader = styled.View`
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
 const AddCategoryTimeHeaderButton = styled.TouchableOpacity`
  align-content: center;
  justify-content: center;
  position: absolute;
  right: ${RFValue(20)}px;
  align-self: center;
`;
 const AddCategoryTimeHeaderText = styled.Text`
  font-size: ${RFValue(18)}px;
  background-color: ${({theme}) => theme.colors.orange};
  color: ${({theme}) => theme.colors.white};
  text-align: center;
`;
 const AddCategoryTime = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.white};
  text-align: center;
`;
 const EditCategoryDescriptionView = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  justify-content: center;
  align-items: center;
`;
 const CategoryDescriptionTextInput = styled.TextInput`
  background-color: ${props => props.theme.colors.gray_25};
  margin: ${RFValue(10)}px;
  padding: ${RFValue(10)}px;
  border-radius: 10px;
`;
 const AddCategoryTimeButton = styled.TouchableOpacity`
  display: flex;
  height: 38px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${(props: any) =>
    props.type === 'danger'
      ? props.theme.colors.red
      : props.theme.colors.orange};
`;

/**
 * EXPORTS
 */
export {
  EditCategoryDescriptionModal,
  AddCategoryTimeSaveButton,
  AddCategoryTimeHeader,
  AddCategoryTimeHeaderButton,
  AddCategoryTimeHeaderText,
  AddCategoryTime,
  EditCategoryDescriptionView,
  CategoryDescriptionTextInput,
  AddCategoryTimeButton
}