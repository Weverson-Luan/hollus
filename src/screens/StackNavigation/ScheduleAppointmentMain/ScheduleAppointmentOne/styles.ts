/**
 * IMPORTS
 */

import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';


interface ISelectedProps {
  selected: boolean;
}
export const Main = styled.View`
  background-color: ${({theme}) => theme.colors.white};
  padding: 12px;
`;
export const Title = styled.Text`
  color: ${({theme}) => theme.colors.gray_200};
  margin-top: ${RFValue(10)}px;
  font-size: ${RFValue(16)}px;
  margin-bottom: 20px;
`;
export const TitleButtonNext = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: ${RFValue(16)}px;
  font-weight: normal;
  flex-wrap: wrap;
`;
export const WrapperButtonNext = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-left: ${RFValue(8)}px;
  padding-right: ${RFValue(8)}px;

  border-color: ${({theme}) => theme.colors.gray_25};
  background-color: ${({theme}) => theme.colors.white};
`;

export const CategoriasContainer = styled.View`
  background-color: ${({theme}) => theme.colors.white};
  flex: 1;
  justify-content: center;
`;

interface ICategoriaRowProps {
  selected: boolean;
}
export const CategoriaRow = styled.TouchableOpacity<ICategoriaRowProps>`
  margin: ${RFValue(5)}px 0;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  padding: ${RFValue(10)}px;
  background-color: ${({selected, theme}) =>
    selected ? theme.colors.orange : theme.colors.gray_25};
`;

export const CategorieImage = styled.Image`
  height: ${RFValue(80)}px;
  width: ${RFValue(80)}px;
  border-radius: 10px;
`;

export const CategoriaInfoContainer = styled.View`
  flex-direction: column;
  margin: 0 ${RFValue(10)}px;
  width: 100%;
  height: 100%;
`;
export const CategoriaTitle = styled.Text<ISelectedProps>`
  font-size: ${RFValue(16)}px;
  color: ${({selected, theme}) =>
    selected ? theme.colors.white : theme.colors.gray_200};
  flex: 1;
`;
export const CategoriaInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const CategoriaInfoCol = styled.View``;

export const CategoriaInfoTitle = styled.Text<ISelectedProps>`
  color: ${({selected, theme}) =>
    selected ? theme.colors.white : theme.colors.gray_200};
`;



/***
 * EXPORTS
 */