/* eslint-disable prettier/prettier */
import { TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface Props extends TouchableOpacity {
  background?: boolean;
}

interface Selected extends View {
  selected?: boolean;
  cardCredit?: boolean;
}
export const Main = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  justify-content: space-around;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.orange_100};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;
export const WrapperButtonNext = styled.View`
  width: 100%;

  margin-top: ${RFValue(20)}px;
  padding-left: ${RFValue(8)}px;
  padding-right: ${RFValue(8)}px;

  align-items: center;
  justify-content: space-around;
`;
export const WrapperCard = styled.View`
  width: 100%;
  height: 110px;
  flex-direction: column;

  /* border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25}; */
  margin-top: -20px;
  margin-bottom: 20px;
`;
export const WrapperCardBorder = styled(TouchableOpacity)<Props>`
  width: 100%;
  height: ${RFValue(45)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};

  padding-left: 14px;
  padding-right: 14px;

  background-color: ${({ background, theme }) =>
    background ? theme.colors.orange_25 : theme.colors.white};
`;
export const TitleCard = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(14)}px;
  font-weight: 400;
`;

export const WrapperCardBand = styled(View)<Selected>`
  width: 100%;
  height: ${({ cardCredit }) => (cardCredit ? '220px' : '65px')};
  background-color: ${({ cardCredit }) => (cardCredit ? '#FFECCD' : 'white')};
  /* flex-direction: row;
  align-items: center;
  justify-content: space-between; */

  border-color: ${({ theme }) => theme.colors.gray_25};
  border-left-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;

  /* padding-left: 14px;
  padding-right: 14px; */
`;
export const CardBand = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.blue};
  border-color: ${({ theme }) => theme.colors.gray_25};
  border-width: 2px;
  border-radius: 10px;
  padding-left: 14px;
  padding-right: 14px;
`;
export const TitleCardBand = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(15)}px;
  font-weight: 400;
`;
export const WrapperButtonAddCard = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(65)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-color: ${({ theme }) => theme.colors.gray_25};
  border-left-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
`;
export const ButtonAddCard = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(40)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-left-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  margin-top: ${RFValue(-20)}px; ;
`;
export const TitleButtonAddCard = styled.Text`
  color: ${({ theme }) => theme.colors.gray_90};
  margin-left: ${RFValue(8)}px;
  font-size: ${RFValue(15)}px;
  font-weight: 400;
`;
export const TitleMore = styled.Text`
  color: ${({ theme }) => theme.colors.gray_90};
  margin-left: ${RFValue(-8)}px;
  font-size: ${RFValue(15)}px;
  font-weight: 400;
`;
export const WrapperCardSelected = styled(View)<Selected>`
  width: 100%;
  height: 110px;
  flex-direction: column;

  /* border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25}; */
  margin-top: ${({ selected }) => (selected ? '220px' : 0)};
  margin-bottom: 20px;
`;

export const WrapperCardCredit = styled(View)<Selected>`
  width: 100%;
  height: 110px;
  flex-direction: column;

  /* border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25}; */
  margin-top: ${({ selected }) => (selected ? '220px' : 0)};
  margin-bottom: 20px;
`;

export const WrapperTitleBankName = styled.View`
  padding-left: 14px;
  padding-right: 14px;
`;
export const TitleBankName = styled.Text`
  color: ${({ theme }) => theme.colors.gray_200};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;
export const WrapperTitleBankNumber = styled.View`
  width: ${RFValue(280)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  margin-top: ${RFValue(20)}px; ;
`;
export const TitleBankNumber = styled.Text`
  color: ${({ theme }) => theme.colors.gray_200};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;
export const WrapperMainCarHolder = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-left: 14px;
  padding-right: 14px;
  margin-top: ${RFValue(8)}px;
`;
export const WrapperCarHolder = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
`;
export const TitleHolder = styled.Text`
  color: ${({ theme }) => theme.colors.gray_200};
  font-size: ${RFValue(12)}px;
  font-weight: 400;
`;
export const SubTitleHolder = styled.Text`
  color: ${({ theme }) => theme.colors.gray_200};
  font-size: ${RFValue(15)}px;
  font-weight: 300;
`;
