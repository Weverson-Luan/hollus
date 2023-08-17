import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
`;
export const Title = styled.Text`
  margin-left: ${RFValue(10)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_200};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 24px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_50};
`;
export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
