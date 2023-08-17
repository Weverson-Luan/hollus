/* eslint-disable prettier/prettier */
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface TextButtonTerapiesProps {
  color: boolean;
}
export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
`;
export const WrapperTypeTerapies = styled.View`
  width: 100%;
`;
export const TitleTypeTerapies = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 500;
  margin-top: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_200};
`;
export const ContentButton = styled.View`
  padding: 24px;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
`;
export const WrapperButtonsTerapies = styled.View`
  width: 100%;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin-top: ${RFValue(16)}px;
`;
export const TextButtonTerapies = styled.Text<TextButtonTerapiesProps>`
  font-size: ${RFValue(14)}px;
  /* font-weight: 500; */
  color: ${({ theme, color }) =>
    color ? theme.colors.white : theme.colors.orange_100};
`;

export const TitleClassification = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_200};
`;
export const WrapperButtonsClassification = styled.View`
  width: 100%;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin-top: ${RFValue(16)}px;
`;

export const ContentPrice = styled.View`
  padding: 24px;
`;
export const TitlePrice = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_200};
`;
export const TextButtonPrice = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.orange_100};
`;
export const WrapperButtonsPrice = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin-top: ${RFValue(16)}px;
`;
export const ContentFooter = styled.View`
  paddingTop: 25px;
  padding: 24px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
`;
export const TextButtonFooter = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
`;
export const WrapperButtonsFooter = styled.View`
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
`;
