import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const TerapeutaContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: red;
`;

export const TerapeutaFoto = styled.Image`
  height: 100%;
`;

export const TerapeutaInfo = styled.View``;

export const TerapeutaNome = styled.Text``;

export const TerapiaContainer = styled.View`
  /* flex: 1; */
  flex-direction: row;
  /* height: ${RFValue(120)}px; */
  padding: ${RFValue(10)}px;
`;
export const TerapiaFoto = styled.Image`
  height: ${RFValue(100)}px;
  width: ${RFValue(100)}px;
  border-radius: 10px;
`;

export const TerapiaInfo = styled.View`
  flex-direction: column;
  /* flex: 1; */
  flex: 1;
  padding: 0 ${RFValue(5)}px;
  height: ${RFValue(100)}px;
`;
export const TerapiaNome = styled.Text`
  font-size: ${RFValue(18)}px;
  text-align: center;
  width: 100%;
`;
export const TerapiaDescricao = styled.Text`
  text-align: justify;
`;

export const TerapiaRow = styled.View`
  flex-direction: row;
`;

export const TerapiaValor = styled.Text``;
export const TerapiaTempo = styled.Text``;

export const ConsultaContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: yellow;
`;
