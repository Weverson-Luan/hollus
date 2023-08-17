import {Dimensions, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../../styles/colors/theme';

interface ISelectedProps {
  selected: boolean;
}


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
  /* border-top-width: 1px; */
  border-color: ${({theme}) => theme.colors.gray_25};
  background-color: ${({theme}) => theme.colors.white};
`;

export const CategoriaInfoCol = styled.View``;


export const CalendarContainer = styled.View`
  background-color: ${({theme}) => theme.colors.white};
  justify-content: center;
  padding: ${RFValue(20)}px ${RFValue(10)}px;
`;

export const InfoContainer = styled.View`
  background-color: ${({theme}) => theme.colors.white};
  justify-content: center;
  padding: ${RFValue(10)}px;
`;

export const TerapeutaInfoContainer = styled.View`
  background-color: ${props => props.theme.colors.white};
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 10px;
  padding: ${RFValue(10)}px;
`;

export const TerapeutaCol = styled.View`
    width: 200px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
   margin-left: 16px;
`;

export const TerapeutaFoto = styled.Image`
  height: ${RFValue(100)}px;
  width: ${RFValue(100)}px;
  border-radius: ${RFValue(50)}px;
`;

export const TerapeutaNome = styled.Text`
  font-size: ${RFValue(22)}px;
  margin-bottom: ${RFValue(5)}px;
`;

export const TerapeutaLocal = styled.Text`
  text-align: justify;
  font-size: ${RFValue(14)}px;
`;

export const HeaderHorarios = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.orange_login};
  padding: ${RFValue(5)}px 0;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  text-align: center;
  color: ${({theme}) => theme.colors.white};
`;



export const LocationWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LocationText = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-left: ${RFValue(4)}px;
  text-align: justify;
  flex: 1;
  color: ${({theme}) => theme.colors.gray_90};
`;

/**
 * CSS-NATIVE
 */

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  calendar: {
    padding: 10,
    backgroundColor: '#E68011',
    // height: 370,
    borderRadius: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  switchText: {
    margin: 10,
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
    width: 390,
  },
  disabledText: {
    color: 'grey',
  },
  defaultText: {
    color: 'purple',
  },
  customCalendar: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  customDay: {
    textAlign: 'center',
  },
  customHeader: {
    backgroundColor: '#FCC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -4,
    padding: 8,
  },
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 10,
  },
  customTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: theme.colors.white,
  },
});

/**
 * EXPORTS
 */
export {styles};
