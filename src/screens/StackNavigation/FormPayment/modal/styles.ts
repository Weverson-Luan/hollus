import styled from "styled-components/native";


const Container = styled.View`
  width: 100%;
  height: 510px;
  background-color: #fff;
  padding: 16px;
  border-radius: 4px;

`;

const ButtonIconClosed = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: -8px;
  margin-bottom: 16px;
`;
const Text = styled.Text`
  font-size: 18px;

`;
/**
 * EXPORTS
 */
export {
  Container,
  ButtonIconClosed,
  Text
}