import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'styled-components';

//icons
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  HouseLine,
  User,
  MagnifyingGlass,
  Calendar,
} from 'phosphor-react-native';

// icons SVG
// import LogoHollusSVG from '../assets/svg/logo-dark.svg';
// import BalaioSVG from '../../assets/svg/balaio.svg';

// screens
import {Home} from '../../screens/BottomTabs/Home';
import {ScreenQuery} from '../../screens/BottomTabs/Query';
import {RFValue} from 'react-native-responsive-fontsize';
import {HeaderDrawer} from '../../components/HeaderDrawer';

import {BalaioSVGComponent} from '../../assets/svg/BalaioSVG';
import {
  ClientStackProductsRoutes,
  ClientStackProfileRoutes,
  ClientStackSearchRoutes,
} from './routes.Drawer';

const BottomTabs = createBottomTabNavigator();

export function AuthenticateBottomTabsNavigation() {
  const theme = useTheme();

  return (
    <BottomTabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        header: () => <HeaderDrawer />,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          height: RFValue(60),
        },
        tabBarActiveTintColor: theme.colors.orange_100,
        tabBarLabelStyle: {
          color: theme.colors.gray_90,
          fontSize: 12,
          marginBottom: RFValue(8),
        },
        tabBarHideOnKeyboard: true,
      }}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <HouseLine size={size} color={color} />
          ),
          title: 'Home',
          //@ts-ignore
          logo: true,
          light: true,
        }}
      />
      <BottomTabs.Screen
        name="Perfil"
        component={ClientStackProfileRoutes}
        options={{
          tabBarIcon: ({color, size}) => <User size={size} color={color} />,
          title: 'Perfil',
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name="Pesquisar"
        component={ClientStackSearchRoutes}
        options={{
          tabBarIcon: ({color, size}) => (
            <MagnifyingGlass size={size} color={color} />
          ),
          title: 'Pesquisa',
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name="Consultas"
        component={ScreenQuery}
        options={{
          tabBarIcon: ({color, size}) => <Calendar size={size} color={color} />,
          title: 'Consultas',
        }}
      />
      <BottomTabs.Screen
        name="Produtos"
        component={ClientStackProductsRoutes}
        options={{
          tabBarIcon: ({color, size}) => (
            <BalaioSVGComponent width={30} height={30} color={color} />
          ),
          title: 'Produtos',
          headerShown: false,
        }}
      />
    </BottomTabs.Navigator>
  );
}
