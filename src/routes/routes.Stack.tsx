import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {styles} from './ClientRoutes/routes.styles';

// Screen stack´s.
import {SignIn} from '../screens/StackNavigation/SignIn';
import {Register} from '../screens/StackNavigation/Register';
import {RegisterSeptOne} from '../screens/StackNavigation/RegisterSeptOne';
import {RegisterSeptTwo} from '../screens/StackNavigation/RegisterSeptTwo';
import {RegisterSepThree} from '../screens/StackNavigation/RegisterSepThree';
import {RegisterSeptFour} from '../screens/StackNavigation/SeptFour';

//typings
import {StackParamsList} from './ClientRoutes/routes';

import {ForgotPassword} from '../screens/StackNavigation/ForgotPassword';
import {
  RegisterTherapist,
  RegisterTherapistStep2,
} from '../screens/StackNavigation/RegisterTherapist';
import {CaretLeft} from 'phosphor-react-native';

const Stack = createNativeStackNavigator<StackParamsList>();

function OpenRoutes() {
  const theme = useTheme();
  const navigation = useNavigation() as any;
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: true,
          title: 'Recuperação de senha',
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          title: '',
          headerTintColor: theme.colors.orange_100,
          headerTitleStyle: {
            fontSize: 16,
          },
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonHeader}>
              <CaretLeft size={24} color={theme.colors.orange_100} />
              <Text style={styles.subtitleButtonHeader}>Voltar</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="RegisterSeptOne"
        component={RegisterSeptOne}
        options={{
          headerShown: true,
          title: 'Voltar',
          headerTintColor: theme.colors.orange_100,
          headerTitleStyle: {
            fontSize: 16,
          },
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CaretLeft size={24} color={theme.colors.orange_100} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="RegisterSeptTwo"
        component={RegisterSeptTwo}
        options={{
          headerShown: true,
          title: 'Voltar',
          headerTintColor: theme.colors.orange_100,
          headerTitleStyle: {
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CaretLeft size={24} color={theme.colors.orange_100} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="RegisterSepThree"
        component={RegisterSepThree}
        options={{
          headerShown: true,
          title: 'Voltar',
          headerTintColor: theme.colors.orange_100,
          headerTitleStyle: {
            fontSize: 16,
          },
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CaretLeft size={24} color={theme.colors.orange_100} />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterSeptFour')}>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.colors.orange_100,
                  // fontWeight: "500",
                }}>
                Pular
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="RegisterSeptFour"
        component={RegisterSeptFour}
        options={{
          headerShown: true,
          title: '',
          headerTintColor: theme.colors.orange_100,
          headerTitleStyle: {
            fontSize: 16,
          },
          headerShadowVisible: false,

          headerLeft: () => <View />,

          headerRight: () => (
            <Text
              style={{
                fontSize: 16,
                color: theme.colors.orange_100,
                // fontWeight: "500",
              }}>
              Ir para a tela inicial
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="RegisterTherapist"
        component={RegisterTherapist}
        options={{
          headerShown: true,
          title: 'Voltar',
          headerTintColor: theme.colors.orange_100,
          headerTitleStyle: {
            fontSize: 16,
          },
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CaretLeft size={24} color={theme.colors.orange_100} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="RegisterTherapistStep2"
        component={RegisterTherapistStep2}
        options={{
          headerShown: true,
          title: 'Voltar',
          headerTintColor: theme.colors.orange_100,
          headerTitleStyle: {
            fontSize: 16,
          },
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CaretLeft size={24} color={theme.colors.orange_100} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export {OpenRoutes};
