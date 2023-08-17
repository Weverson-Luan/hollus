/* eslint-disable prettier/prettier */
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface WapperBolinhaProps {
  background_color?: string;
}

export const MainContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 80px;
  /* background-color: blue; */
`;
export const Main = styled.View`
  width: 100px;
  flex-direction: row;
  align-items: center;
`;

export const Bolinhas = styled.View`
  /* background-color: red; */
  width: 98%;
  height: 90px;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-left: 14px;
  margin-top: ${RFValue(-10)}px;
`;
export const WapperBolinha = styled.View<WapperBolinhaProps>`
  background-color: ${({ theme, background_color }) =>
    background_color ? theme.colors.orange_100 : theme.colors.gray_150};
  width: 40px;
  height: 40px;

  border-radius: 30px;

  align-items: center;
  justify-content: center;
  margin-left: 30px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
`;
export const Line = styled.View`
  width: 60px;
  border: 1px solid ${({ theme }) => theme.colors.gray_50};
  border-width: 1px;
`;
export const TitleBolinha = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  margin-top: -80px;
`;
