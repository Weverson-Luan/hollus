import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import theme from '../../styles/colors/theme';

export const WrapperDrawer = styled.View`
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: center;

`;
export const DrawerButton = styled.TouchableOpacity`
`;

export const styles = StyleSheet.create({
  containerHeader: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    marginTop: 10,
  },
  containerInfo: {
    marginLeft: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    color: theme.colors.white,
    fontWeight: '500',
    fontSize: 18,
    fontFamily: theme.fonts.primary_poppins_500
  },
  rightHeaderText: {
    color: theme.colors.white,
    fontWeight: '500',
    fontSize: 15,
    fontFamily: theme.fonts.primary_poppins_500Medium
  },
  titleClean: {
    color: theme.colors.white,
    fontWeight: '400',
    fontSize: 18,
  },
  subtitle: {
    color: theme.colors.white,
    fontWeight: 'normal',
    fontSize: 14,
  },
  buttonHeader: {
    width: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconNotification: {
    marginRight: 24
  },
  subtitleButtonHeader: {

  }
});
