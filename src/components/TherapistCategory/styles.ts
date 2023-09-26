import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const CategoryContainer = styled.View`
  margin: ${RFValue(10)}px;
  padding: ${RFValue(10)}px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors.white};
`;
export const CategoryWrapper = styled.View`
  flex-direction: row;
`;
export const CategoryPhotoWrapper = styled.View`
  overflow: hidden;
  align-content: center;
  justify-content: center;
`;
export const CategoryPhoto = styled.Image`
  height: ${RFValue(75)}px;
  width: ${RFValue(75)}px;
  border-radius: 10000000px;
`;
export const TitleLoading = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${props => props.theme.colors.gray_80};
  font-weight: 400;
`;
export const CategoryInfoWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
export const TitleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: 12px;
`;
export const CategoryTitle = styled.Text`
  font-size: ${RFValue(18)}px;
`;
export const CategoryDescription = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-left: 12px;
  text-align: justify;
`;
export const CategoryTimePriceWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: 12px;
`;
export const CategoryTimeScheduleWrapper = styled.View`
  width: 30%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const CategoryTime = styled.Text`
  font-size: ${RFValue(14)}px;
`;
export const CategoryPrice = styled.Text`
  font-size: ${RFValue(14)}px;
  flex: 1;
`;
export const CategoryOptionToggle = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  right: 0;
  
`;
export const CategoryTimeWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  border-color: ${({theme}) => theme.colors.gray_50};
`;
export const CategoryTimeTitleHeader = styled.View`
  flex-direction: row;
  border-color: ${({theme}) => theme.colors.gray_50};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;
export const CategoryTimeTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 500;
  text-align: center;
  flex: 1;
  background-color: ${({theme}) => theme.colors.orange};
  color: ${({theme}) => theme.colors.white};
  padding: ${RFValue(5)}px 0;
`;
export const CategoryHeaderEdit = styled.TouchableOpacity`
  position: absolute;
  right: ${RFValue(10)}px;
  align-self: center;
`;
export const CategoryTimesContainer = styled.View`
  overflow: hidden;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;
export const CategoryTimeTitleRow = styled.View`
  flex-direction: row;
  height: 32px;
  background-color: ${({theme}) => theme.colors.gray_25};
  padding: 4px ${RFValue(5)}px;
`;
export const CategoryTimeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${RFValue(5)}px;
  margin: ${RFValue(5)}px 0;
`;
export const CategoryTimeSelect = styled.TouchableOpacity`
  width: 10%;
`;
export const CategoryTimeDay = styled.Text`
  font-size: ${RFValue(14)}px;
  width: 50%;
`;
export const CategoryTextLoding = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme})=> theme.colors.gray_90};
  margin-bottom: 24px;
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
export const AddCategoryTimeButtonTitle = styled.Text`
  text-align: center;
  color: ${({theme}) => theme.colors.white};
  font-size: ${RFValue(14)}px;
  margin-left: 6px;
`;
export const AddCategoryTimeModal = styled.Modal`
`;
export const AddCategoryTimeCard = styled.ScrollView`
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 10px;
  max-height: ${RFValue(450)}px;
  width: ${RFValue(300)}px;
`;
export const AddCategoryCardContent = styled.ScrollView`
  width: 100%;
  margin-bottom: 30px;
`;
export const WrapperButton = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`;
export const WrapperRow = styled.View`
  padding: ${RFValue(10)}px;
`;
export const AddCategoryTimeRow = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: ${RFValue(5)}px;
`;
export const LoadingContainer = styled.View`
  background-color: ${props => props.theme.colors.white};
  height: ${RFValue(150)}px;
  width: 100%;
  justify-content: center;
`;
export const CategoryDetailsWrapper = styled.View`
  margin-top: ${RFValue(10)}px;
`;
export const CategoryDescriptionEditButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.orange};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: ${RFValue(5)}px;
  padding: ${RFValue(10)}px;
  border-radius: 10px;
`;
export const CategoryDescriptionEditText = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${props => props.theme.colors.white};
  font-weight: 400;
`;

