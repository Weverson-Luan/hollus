import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface SelectProps {
  onPress?: () => void;
  selected?: boolean;
}
export const Container = styled(TouchableOpacity)<SelectProps>`
  width: ${RFValue(50)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.white};

  padding: 2px;
`;
export const Title = styled.Text``;
