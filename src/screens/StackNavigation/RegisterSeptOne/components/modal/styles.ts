/**
 * IMPORTS
 */
import styled from "styled-components/native";


const Main = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${({theme})=> theme.colors.white};
  padding-left: 16px;
  padding-right: 16px;

  border-radius: 8px;
`;

const TitleModal = styled.Text`
  color: #1e1e1e;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;


`;
const DescriptionModal = styled.Text`
  color: ${({theme})=> theme.colors.gray_150};
  text-align: justify;
`;

const TitleButtonModal = styled.Text`
  color: ${({theme})=> theme.colors.white};
  font-weight: 500;
  font-size: 16px;
`;


/**
 * EXPORTS
 */
export {
  Main,
  TitleModal,
  TitleButtonModal,
  DescriptionModal
}