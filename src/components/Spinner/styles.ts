import styled from "styled-components/native";

interface ActivityIndicationProps {
  bgColor: string,

}
export const Container = styled.View<ActivityIndicationProps>`
  background-color: ${({theme, bgColor}) => bgColor ? bgColor : theme.colors.white};
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const Title = styled.Text``;
