import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const CategoryContainer = styled.View`
  /* flex-direction: column; */
  margin: ${RFValue(10)}px;
  padding: ${RFValue(10)}px;
  border-radius: 10px;
  /* background-color: ${({ theme }) => theme.colors.gray_25}; */
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CategoryWrapper = styled.View`
  /* height: ${RFValue(100)}px; */
  /* background-color: ${({ theme }) => theme.colors.black}; */
  flex-direction: row;
  /* padding: ${RFValue(10)}px; */
  /* overflow: hidden; */
`;

export const CategoryPhotoWrapper = styled.View`
  /* width: 30%; */
  /* padding: ${RFValue(10)}px; */
  /* border-radius: 1000000px; */
  /* height: ${RFValue(100)}px;
  width: ${RFValue(100)}px; */
  overflow: hidden;
  align-content: center;
  justify-content: center;
`;

export const CategoryPhoto = styled.Image`
  height: ${RFValue(75)}px;
  width: ${RFValue(75)}px;
  border-radius: 10000000px;
`;

export const CategoryInfoWrapper = styled.View`
  flex: 1;
  /* padding: ${RFValue(10)}px; */
  flex-direction: column;
  justify-content: space-between;
  /* background-color: ${({ theme }) => theme.colors.white}; */
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CategoryTitle = styled.Text`
  font-size: ${RFValue(18)}px;
`;

export const CategoryDescription = styled.Text`
  font-size: ${RFValue(14)}px;
`;

export const CategoryTimePriceWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CategoryTimeScheduleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 30%;
`;

export const CategoryTime = styled.Text`
  font-size: ${RFValue(14)}px;
`;

export const CategoryPrice = styled.Text`
  font-size: ${RFValue(14)}px;
  flex: 1;
`;

export const CategoryOptionToggle = styled.TouchableOpacity`
  /* position: absolute; */
  right: 0;
`;

export const CategoryTimeWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  /* border-width: 1px; */
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.gray_50};
`;

export const CategoryTimeTitleHeader = styled.View`
  flex-direction: row;
  /* border-top-width: 2px; */
  border-color: ${({ theme }) => theme.colors.gray_50};
  /* margin-bottom: ${RFValue(5)}px; */
  /* padding: ${RFValue(5)}px; */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

export const CategoryTimeTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  text-align: center;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  padding: ${RFValue(5)}px 0;
`;

export const CategoryHeaderEdit = styled.TouchableOpacity`
  position: absolute;
  right: ${RFValue(10)}px;
  /* width: 10%; */
  /* justify-content: center; */
  /* align-items: center; */
  align-self: center;
`;

export const CategoryTimesContainer = styled.View`
  overflow: hidden;
  /* border-left-width: 1px; */
  /* border-right-width: 1px; */
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const CategoryTimeTitleRow = styled.View`
  flex-direction: row;
  /* justify-content: space-between; */
  background-color: ${({ theme }) => theme.colors.gray_25};
  padding: 0 ${RFValue(5)}px;
`;

export const CategoryTimeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${RFValue(5)}px;
  margin: ${RFValue(5)}px 0;
`;

export const CategoryTimeSelect = styled.TouchableOpacity`
  /* flex: 1; */
  /* justify-content: center; */
  /* align-items: center; */
  width: 10%;
`;

export const CategoryTimeDay = styled.Text`
  font-size: ${RFValue(14)}px;
  width: 50%;
`;

export const CategoryTimeBegin = styled.Text`
  font-size: ${RFValue(14)}px;
  flex: 1;
  text-align: center;
`;

export const CategoryTimeEnd = styled.Text`
  font-size: ${RFValue(14)}px;
  flex: 1;
  text-align: center;
`;

export const AddCategoryTimeButton = styled.TouchableOpacity`
  /* margin: ${RFValue(10)}px 0; */
`;

export const AddCategoryTimeButtonTitle = styled.Text`
  /* border-radius: 10px; */
  text-align: center;
  background-color: ${(props) =>
    props.type === "danger"
      ? props.theme.colors.red
      : props.theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  padding: ${RFValue(10)}px;
  font-size: ${RFValue(14)}px;
`;

export const AddCategoryTimeModal = styled.Modal``;

export const AddCategoryTimeView = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// export const AddCategoryTimeCard = styled.View`
export const AddCategoryTimeCard = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  /* width: 50%; */
  border-radius: 10px;
  max-height: ${RFValue(450)}px;
  width: ${RFValue(300)}px;
  overflow: hidden;
`;

export const AddCategoryCardContent = styled.ScrollView`
  /* background-color: ${({ theme }) => theme.colors.white}; */
  /* width: 50%; */
  /* border-radius: 10px; */
  /* max-height: ${RFValue(450)}px; */
  /* width: ${RFValue(300)}px; */
`;

export const AddCategoryTimeTouchable = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.orange};
  border-radius: 10px;
  padding: ${RFValue(10)}px;
`;

export const AddCategoryTimeSaveButton = styled.TouchableOpacity`
  /* margin-top: ${RFValue(5)}px; */
  /* margin-bottom: ${RFValue(40)}px; */
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.gray_80 : props.theme.colors.orange};
  /* border-radius: 10px; */
  padding: ${RFValue(9)}px;
  text-align: center;
  width: ${RFValue(300)}px;
`;

export const AddCategoryFieldWrapper = styled.View`
  padding: ${RFValue(10)}px;
`;

export const AddCategoryTimeHeader = styled.View`
  padding: ${RFValue(10)}px 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${({ theme }) => theme.colors.orange};
  align-content: center;
  justify-content: center;
  flex-direction: row;
  position: relative;
`;

export const AddCategoryTimeHeaderButton = styled.TouchableOpacity`
  align-content: center;
  justify-content: center;
  position: absolute;
  right: ${RFValue(20)}px;
  align-self: center;
`;

export const AddCategoryTimeHeaderText = styled.Text`
  font-size: ${RFValue(18)}px;
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const AddCategoryLabel = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-bottom: ${RFValue(5)}px;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

export const AddCategoryTimeRow = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: ${RFValue(5)}px;
`;

export const AddCategoryTime = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  /* background-color: ${({ theme }) => theme.colors.white}; */
`;

export const AddCategoryTimeDaysRow = styled.View`
  /* background-color: orange; */
  flex-direction: row;
  justify-content: space-between;
  padding: ${RFValue(5)}px;
`;

export const AddCategoryTimeDayTouchable = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.selected ? props.theme.colors.orange : props.theme.colors.gray_25};
  border-radius: 100000px;
  height: ${RFValue(30)}px;
  width: ${RFValue(30)}px;
  margin: 0 ${RFValue(5)}px;
  justify-content: center;
  align-items: center;
`;

export const AddCategoryTimeDay = styled.Text`
  /* background-color: ${({ theme }) => theme.colors.white}; */
  font-size: ${RFValue(14)}px;
  color: ${(props) =>
    props.selected ? props.theme.colors.white : props.theme.colors.orange};
`;

export const LoadingContainer = styled.View`
  background-color: ${(props) => props.theme.colors.white};
  height: ${RFValue(150)}px;
  width: ${RFValue(150)}px;
  justify-content: center;
  margin: ${RFValue(20)}px;
`;

export const CategoryDetailsWrapper = styled.View`
  margin-top: ${RFValue(10)}px;
`;

export const EditCategoryDescriptionModal = styled.Modal``;

export const EditCategoryDescriptionView = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  justify-content: center;
  align-items: center;
`;


export const CategoryDescriptionEditButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.orange};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: ${RFValue(5)}px;
  padding: ${RFValue(10)}px;
  border-radius: 10px;
`;

export const CategoryDescriptionEditText = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${(props) => props.theme.colors.white};
`;

export const CategoryDescriptionTextInput = styled.TextInput`
  background-color: ${(props) => props.theme.colors.gray_25};
  margin: ${RFValue(10)}px;
  padding: ${RFValue(10)}px;
  border-radius: 10px;
`;