import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'styled-components';
import {
  Container,
  Icon,
  IconWrapper,
  Logo,
  Placeholder,
  WrapperHeaderDrawerNavigation,
} from './styles';
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

import {BellSimple} from 'phosphor-react-native';

// icons SVG
import LogoHollusSVG from '../../assets/svg/logo-dark.svg';
import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  iconMenu: {
    marginLeft: 24,
  },
  iconNotification: {
    marginRight: 24,
  },
});

export function HeaderDrawer({back = false, notification = true}) {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Container>
      <WrapperHeaderDrawerNavigation>
        {back ? (
          <Icon onPress={() => navigation.goBack()}>
            <FontAwesome5Icon
              name={'chevron-left'}
              size={26}
              color={theme.colors.orange_100}
              style={styles.iconMenu}
            />
          </Icon>
        ) : (
          // <View style={{ width: RFValue(40) }} />
          // <></>
          <Placeholder />
        )}
        <Logo
          source={require('../../assets/logo-full.png')}
          resizeMode="contain"
        />
        {notification ? (
          <IconWrapper>
            <Icon onPress={() => console.log('notifications')}>
              <BellSimple
                // name="bell"
                size={26}
                // solid
                color={theme.colors.orange_100}
                style={styles.iconNotification}
              />
            </Icon>
          </IconWrapper>
        ) : (
          <Placeholder />
        )}
      </WrapperHeaderDrawerNavigation>
    </Container>
  );
}
