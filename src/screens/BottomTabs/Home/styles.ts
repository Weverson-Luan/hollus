import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;

  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
`;

export const ImageLogo = styled.Image`
  width: 120px;
  height: 50px;
`;
export const WrapperActivityIndication = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
export const WrapperCardQuery = styled.View`
  width: 100%;
  height: 150px;

  background-color: ${({ theme }) => theme.colors.white};
  /* border-bottom-width: 1px;
  border-color: #cdcdcd; */

`;
export const WrapperCardQueryRow = styled.View`
  width: 80%;
  height: 150px;

  /* background-color: ${({ theme }) => theme.colors.white};
  border-bottom-width: 1px;
  border-color: #cdcdcd; */

  flex-direction: row;
  align-items: center;


`;
export const BorderRow = styled.View`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.white};
  border-bottom-width: 1px;
  border-color: #cdcdcd;


`;

export const WrapperIcon = styled.View`
  width: 70px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;

`;
export const ContenInfoMain = styled.View`
  width: 84%;
`;
export const ContentInfo = styled.View`
  width: 100%;
  padding: 0 16px;

`;
export const WrapperInfo = styled.View`
  align-items: flex-start;
  flex-direction: column;
`;
export const WrapperInfoProfile = styled.View`
  background-color: blue;
  height: 70px;
  padding: 0 16px;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;

  background-color: ${({ theme }) => theme.colors.white};
`;
export const WrapperInfoDescriptionLocation = styled.View`
  align-items: flex-start;
  flex-direction: row;
`;
export const WrapperInfoDescription = styled.View`
  margin-left: 6px;
`;
export const ImageProfile = styled.Image`
  width: 45px;
  height: 45px;

  border-radius: 30px;
`;
export const TitleQuery = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const TitleName = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_150};
  margin-right: ${RFValue(18)}px;
  margin-bottom: 12px;
`;
export const SubTitle = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_50};
`;
export const WrapperText = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  padding: 12px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const TitleMore = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.orange_100};
`;
export const FlatListImage = styled.FlatList``;
export const BoxImage = styled.View`
  width: 100%;

  margin-top: ${RFValue(8)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: ${RFValue(20)}px;
`;
export const WrapperImage = styled.View`
  width: auto;
`;
export const Image = styled.Image`
  width: ${RFValue(220)}px;
  height: 170px;

  border-radius: 8px;

  margin-left: 16px;
`;
export const TextImgageDescription = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_150};
  margin-top: ${RFValue(8)}px;
  margin-left: ${RFValue(16)}px;
`;
