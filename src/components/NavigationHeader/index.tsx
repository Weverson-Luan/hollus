import {StatusBar, Text, View} from 'react-native';
import {
  NavHeaderIcon,
  NavHeaderLogo,
  NavHeaderTitle,
  NavHeaderWrapper,
} from './styles';
import React from 'react';
// import LogoFullPNG from "../../assets/logo-full.png";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation, useRoute} from '@react-navigation/native';
import theme from '../../styles/colors/theme';
import {ArrowLeft} from 'phosphor-react-native';
var LogoFullPNG = require('../../assets/logo-full.png');

export const NavigationHeader = ({props}) => {
  const navigate = useNavigation();
  return (
    <NavHeaderWrapper lightMode={props.options.light}>
      <NavHeaderIcon
        onPress={() => navigate.goBack()}
        disabled={!navigate.canGoBack()}>
        {navigate.canGoBack() ? (
          <ArrowLeft
            // name="left"
            size={RFValue(20)}
            color={props.light ? theme.colors.black : theme.colors.white}
          />
        ) : null}
      </NavHeaderIcon>
      {props.options.logo ? (
        <NavHeaderLogo source={LogoFullPNG} resizeMode="center" />
      ) : (
        <NavHeaderTitle>{props.options.title}</NavHeaderTitle>
      )}
      {props.options.right === null || props.options.right === undefined ? (
        <NavHeaderIcon disabled></NavHeaderIcon>
      ) : (
        <NavHeaderIcon
          onPress={() => navigate.navigate(props.options.right.to)}>
          {props.options.right.icon}
        </NavHeaderIcon>
      )}
    </NavHeaderWrapper>
  );
};
