import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//icons vector-icons
import Icon from 'react-native-vector-icons/Entypo';

//styles routing
import {styles} from './routes.styles';

// Screen stack´s.
import {SignIn} from '../../screens/StackNavigation/SignIn';
import {Register} from '../../screens/StackNavigation/Register';
import {RegisterSeptOne} from '../../screens/StackNavigation/RegisterSeptOne';
import {RegisterSeptTwo} from '../../screens/StackNavigation/RegisterSeptTwo';
import {RegisterSepThree} from '../../screens/StackNavigation/RegisterSepThree';

//authentication
import {ProductSelected} from '../../screens/StackNavigation/ProductSelected';
import {Filter} from '../../screens/StackNavigation/Filter';
import {Cart} from '../../screens/StackNavigation/Cart';
import {ResumeRequest} from '../../screens/StackNavigation/ResumeRequest';
import {FormPayment} from '../../screens/StackNavigation/FormPayment';
import {OrderDetails} from '../../screens/StackNavigation/OrderDetails';
import {UserPanel} from '../../screens/StackNavigation/UserPanel';

// ScreenDrawer
import {TherapistStackRoutesAuth} from './routes.stack-auth';

import {ChatList} from '../../screens/BottomTabs/ChatList';
import {Chat} from '../../screens/BottomTabs/Chat';
import {StackParamsList} from './routes';
import {AppointmentTherapist} from '../../screens/StackNavigation/Appointment/Therapist';
import {GerenciarConsultas} from '../../screens/StackNavigation/GerenciarConsultas';

// initiating the StackNavigation
const Stack = createNativeStackNavigator<StackParamsList>();

function OpenRoutes() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />

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
              <Icon
                name="chevron-left"
                size={24}
                color={theme.colors.orange_100}
              />
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
              <Icon
                name="chevron-left"
                size={24}
                color={theme.colors.orange_100}
              />
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
              <Icon
                name="chevron-left"
                size={24}
                color={theme.colors.orange_100}
              />
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
              <Icon
                name="chevron-left"
                size={24}
                color={theme.colors.orange_100}
              />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <Text
              style={{
                fontSize: 16,
                color: theme.colors.orange_100,
                fontWeight: '500',
              }}>
              Pular
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="AuthenticateBottomTabsNavigation"
        component={TherapistStackRoutesAuth}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Filtros</Text>
            </View>
          ),
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.colors.white,
          },
          headerStyle: {
            backgroundColor: theme.colors.orange_100,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="GerenciarConsultas"
        component={GerenciarConsultas}
        options={{
          headerBackVisible: true,
          title: 'Gerenciar Horários',
        }}
      />
      <Stack.Screen
        name="Appointment"
        component={AppointmentTherapist}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Consulta agendada</Text>
            </View>
          ),
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.colors.white,
          },
          headerStyle: {
            backgroundColor: theme.colors.orange_100,
          },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Terapeuta</Text>
            </View>
          ),
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.colors.white,
          },
          headerStyle: {
            backgroundColor: theme.colors.orange_100,
          },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen name="Chat" component={Chat} />

      <Stack.Screen
        name="ProductSelected"
        component={ProductSelected}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Produto selecionado</Text>
            </View>
          ),
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.colors.white,
          },
          headerStyle: {
            backgroundColor: theme.colors.orange_100,
          },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="Car"
        component={Cart}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Cesta</Text>
            </View>
          ),
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.colors.white,
          },
          headerStyle: {
            backgroundColor: theme.colors.orange_100,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <View style={styles.containerHeader}>
              <TouchableOpacity>
                <Text style={styles.titleClean}>Limpar</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="ResumeRequest"
        component={ResumeRequest}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Resumo do pedido</Text>
            </View>
          ),
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.colors.white,
          },
          headerStyle: {
            backgroundColor: theme.colors.orange_100,
          },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="FormPayment"
        component={FormPayment}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Forma de pagamento</Text>
            </View>
          ),
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.colors.white,
          },
          headerStyle: {
            backgroundColor: theme.colors.orange_100,
          },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Pedido n°20199</Text>
            </View>
          ),
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.colors.white,
          },
          headerStyle: {
            backgroundColor: theme.colors.orange_100,
          },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="UserPanel"
        component={UserPanel}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Painel do usuário</Text>
            </View>
          ),
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontSize: 18,
            color: theme.colors.white,
          },
          headerStyle: {
            backgroundColor: theme.colors.orange_100,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export {OpenRoutes};
