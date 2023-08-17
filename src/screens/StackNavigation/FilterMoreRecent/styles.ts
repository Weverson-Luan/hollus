import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1; ;
`;
export const WrapperFilter = styled.View`
  width: 100%;
  flex-direction: row;

  padding: ${RFValue(16)}px;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray_150};
  font-size: ${RFValue(14)}px;
`;
export const TitleMore = styled.Text`
  color: ${({ theme }) => theme.colors.gray_150};
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  margin-left: ${RFValue(6)}px;
`;

// style nativo
export const styleSheet = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
});
