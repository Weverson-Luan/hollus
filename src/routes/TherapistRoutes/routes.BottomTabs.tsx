import * as React from 'react';
import {useTheme} from 'styled-components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  HouseLine,
  User,
  MagnifyingGlassMinus,
  Calendar,
} from 'phosphor-react-native';

// icones SVG
import {BalaioSVGComponent} from '../../assets/svg/BalaioSVG';

// screens

//material-top-bottoms
import {ScreenQuery} from '../../screens/MaterialTopTabs/ScreenQuery1';

import {
  TherapistStackProductsRoutes,
  TherapistStackProfileRoutes,
  TherapistStackRoutesAuth,
  TherapistStackSearchRoutes,
} from './routes.stack-auth';

import {NavigationHeader} from '../../components/NavigationHeader';

const BottomTabs = createBottomTabNavigator();

export function AuthenticateBottomTabsNavigation() {
  const theme = useTheme();
  return (
    <BottomTabs.Navigator
      initialRouteName="HomeTherapist"
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: true,
        headerShadowVisible: true,
        headerTitleStyle: {
          color: theme.colors.white,
          fontWeight: '500',
          fontSize: 18,
          fontFamily: theme.fonts.primary_poppins_500,
        },
        headerStyle: {
          backgroundColor: theme.colors.orange_100,
        },
        headerTintColor: theme.colors.white,
        header(props) {
          return <NavigationHeader props={props} />;
        },
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          height: 60,
        },
        tabBarActiveTintColor: theme.colors.orange_100,
        tabBarLabelStyle: {
          color: theme.colors.gray_90,
          fontSize: 12,
          marginBottom: 8,
        },
      }}>
      <BottomTabs.Screen
        name="HomeTherapist"
        component={TherapistStackRoutesAuth}
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
        component={TherapistStackProfileRoutes}
        options={{
          tabBarIcon: ({color, size}) => <User size={size} color={color} />,
          title: 'Perfil',
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name="PesquisarTherapist"
        component={TherapistStackSearchRoutes}
        options={{
          tabBarIcon: ({color, size}) => (
            <MagnifyingGlassMinus size={size} color={color} />
          ),
          title: 'Pesquisa',
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name="ConsultasTherapist"
        component={ScreenQuery}
        options={{
          tabBarIcon: ({color, size}) => <Calendar size={size} color={color} />,
          title: 'Consultas',
        }}
      />

      <BottomTabs.Screen
        name="ProdutosTherapist"
        component={TherapistStackProductsRoutes}
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
