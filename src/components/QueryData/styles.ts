import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 12px;

  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
`;
export const Title = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray_200};
  font-weight: 700;
`;
export const WrapperIcon = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
export const TextEdit = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.orange};

  margin-left: ${RFValue(6)}px;
`;
