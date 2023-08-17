import * as React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from 'styled-components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CalendarCheck} from 'phosphor-react-native';

import {ScreenQuery} from './Query';

function NotificationsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScreenQuery />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MaterialTopTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? theme.colors.orange : theme.colors.gray_80,
                marginTop: -28,
                marginLeft: -38,
                fontSize: 18,
                position: 'absolute',
              }}>
              Agendadas
            </Text>
          ),
          tabBarIconStyle: {
            marginLeft: 0,
            width: 410,
            height: 30,
            borderColor: theme.colors.gray_50,
            flexDirection: 'row',
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.orange,
            width: '100%',
          },
          tabBarIcon: ({focused}) => (
            <View
              style={{
                position: 'absolute',
                marginLeft: 30,
                width: 40,
                marginTop: 5,
              }}>
              <CalendarCheck
                // name="calendar-check-o"
                size={23}
                color={focused ? theme.colors.orange : theme.colors.gray_80}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export function App({navigation}: any) {
  return <MaterialTopTabs />;
}
