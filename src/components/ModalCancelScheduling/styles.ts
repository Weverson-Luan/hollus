/**
 * IMPORTS
 */
import { StyleSheet  } from 'react-native';
import theme from '../../styles/colors/theme';


const styles = StyleSheet.create(({
  modalRN: {
    marginTop:200,
    backgroundColor:'red',
    alignItems: 'center'
  },
  modalContent: {
    marginTop:310,
    backgroundColor: theme.colors.white,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  wrapperHeader: {
    padding: 12
  },
  iconClosed: {
    marginTop: 6
  },
  titleCancelScheduling: {
    padding: 10,
    marginTop: 3,
    fontFamily: theme.fonts.primary_poppins_500Medium,
    fontSize: 17,
    fontWeight: '500',
    color: theme.colors.gray_150,
  },
  titleReason: {
    marginBottom: 8,
    fontFamily: theme.fonts.primary_poppins_400Regular,
    fontSize: 17,
    fontWeight: '500',
    color: theme.colors.gray_150,
  },
  titleRescheduling:{
    padding: 8,
    fontFamily: theme.fonts.primary_poppins_400Regular,
    fontSize: 17,
    fontWeight: '500',
    color: theme.colors.gray_150,
  },
  wrapperSelect: {
    padding: 8,  
    marginBottom:20
  }

}))


/**
 * EXPORTS
 */
export { styles };