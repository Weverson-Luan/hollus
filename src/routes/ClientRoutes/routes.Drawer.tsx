import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens-stacks-authenticates
import {UserPanel} from '../../screens/StackNavigation/UserPanel';

// screens-bottom-tabs-authenticates
import {AuthenticateBottomTabsNavigation} from './routes.BottomTabs';
import {StackParamsList} from './routes';

// styles
import {HeaderDrawer} from '../../components/HeaderDrawer';
import {stackNavigationList} from '../../services/navigation/stack-navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-ionicons';
import {styles} from './routes.styles';
import {NavigationHeader} from '../../components/NavigationHeader';
import {EditProfileClient} from '../../screens/StackNavigation/EditProfile/Client';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {GerenciarConsultas} from '../../screens/StackNavigation/GerenciarConsultas';
import {FaleConosco} from '../../screens/StackNavigation/FaleConosco';
import {ScreenSearch} from '../../screens/BottomTabs/Search';
import {Filter} from '../../screens/StackNavigation/Filter';
import {Therapist} from '../../screens/StackNavigation/Therapist';
import {ScreenProducts} from '../../screens/BottomTabs/Products';
import {FilterProducts} from '../../screens/StackNavigation/FilterProducts';
import {Cart} from '../../screens/StackNavigation/Cart';
import {ProductSelected} from '../../screens/StackNavigation/ProductSelected';
import {ResumeRequest} from '../../screens/StackNavigation/ResumeRequest';
import {FormPayment} from '../../screens/StackNavigation/FormPayment';
import {Chat} from '../../screens/BottomTabs/Chat';
import {ChatList} from '../../screens/BottomTabs/ChatList';
import {Addresses} from '../../screens/StackNavigation/Addresses';
import {PaymentInfo} from '../../screens/StackNavigation/PaymentInfo';
import {
  ScheduleAppointment1,
  ScheduleAppointment2,
  ScheduleAppointment3,
  ScheduleAppointment4,
} from '../../screens/StackNavigation/ScheduleAppointment';
import {User} from 'phosphor-react-native';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

export function ClientDrawerNavigation() {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
        headerShadowVisible: true,
        headerTintColor: theme.colors.orange_100,
        headerTitleStyle: {
          fontSize: 16,
        },
      }}
      initialRouteName="AuthHome">
      <Drawer.Screen
        name="AuthHome"
        component={AuthenticateBottomTabsNavigation}
      />
      <Drawer.Screen name="Painel do usuário" component={UserPanel} />
    </Drawer.Navigator>
  );
}

export function ClientStackProfileRoutes() {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        header(props) {
          return <NavigationHeader props={props} />;
        },
      }}>
      <Stack.Screen
        name="PerfilStack"
        options={{title: 'Perfil', headerShown: true}}
        component={UserPanel}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileClient}
        options={{
          title: 'Editar Perfil',
          //@ts-ignore
          right: {
            to: 'TherapistInfo',
            icon: <User size={RFValue(20)} color={theme.colors.white} />,
          },
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
        name="FaleConosco"
        component={FaleConosco}
        options={{
          title: 'Fale Conosco',
        }}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{
          title: 'Chat',
        }}
      />
      <Stack.Screen
        name="Enderecos"
        component={Addresses}
        options={{
          title: 'Meus Endereços',
        }}
      />
      <Stack.Screen
        name="PaymentInfo"
        component={PaymentInfo}
        options={{
          title: 'Fale Conosco',
        }}
      />
    </Stack.Navigator>
  );
}

export function ClientStackSearchRoutes() {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        header(props) {
          return <NavigationHeader props={props} />;
        },
      }}>
      <Stack.Screen
        name="PesquisarStack"
        options={{title: 'Pesquisa', headerShown: true}}
        component={ScreenSearch}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{
          title: 'Filtros',
        }}
      />
      <Stack.Screen
        name="Therapist"
        component={Therapist}
        options={{title: 'Terapeuta'}}
      />
      <Stack.Screen
        name="ScheduleAppointment1"
        component={ScheduleAppointment1}
        options={{title: 'Agendar'}}
      />
      <Stack.Screen
        name="ScheduleAppointment2"
        component={ScheduleAppointment2}
        options={{title: 'Agendar'}}
      />
      <Stack.Screen
        name="ScheduleAppointment3"
        component={ScheduleAppointment3}
        options={{title: 'Agendar'}}
      />
      <Stack.Screen
        name="ScheduleAppointment4"
        component={ScheduleAppointment4}
        options={{title: 'Agendar'}}
      />
      <Stack.Screen
        name="FormPayment"
        options={{title: 'Pagamento', headerShown: true}}
        component={FormPayment}
      />
    </Stack.Navigator>
  );
}

export function ClientStackProductsRoutes() {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        header(props) {
          return <NavigationHeader props={props} />;
        },
      }}>
      <Stack.Screen
        name="Produtos"
        options={{title: 'Produtos', headerShown: true}}
        component={ScreenProducts}
      />
      <Stack.Screen
        name="FilterProducts"
        options={{title: 'Produtos', headerShown: true}}
        component={FilterProducts}
      />
      <Stack.Screen
        name="ShoppingCart"
        options={{title: 'Cesta', headerShown: true}}
        component={Cart}
      />
      <Stack.Screen
        name="ProductSelected"
        options={{title: '', headerShown: true}}
        component={ProductSelected}
      />
      <Stack.Screen
        name="ResumeRequest"
        options={{title: 'Resumo do Pedido', headerShown: true}}
        component={ResumeRequest}
      />
      <Stack.Screen
        name="FormPayment"
        options={{title: 'Pagamento', headerShown: true}}
        component={FormPayment}
      />
    </Stack.Navigator>
  );
}

export function ClientStackRoutesAuth() {
  const theme = useTheme();
  const navigation = useNavigation() as any;
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
        // headerShadowVisible: true,
        // headerTintColor: theme.colors.orange_100,
        // headerTitleStyle: {
        //   fontSize: 16,
        // },
      }}>
      <Stack.Screen name="HomeAuth" component={ClientDrawerNavigation} />
      {stackNavigationList.map(screen => (
        <Stack.Screen
          key={screen.id}
          name={screen.name}
          component={screen.component}
          options={{
            headerShown: screen.header.length === 0 ? false : true,
            headerTitleAlign: 'center',
            headerShadowVisible: true,
            headerTintColor: theme.colors.white,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome5Icon
                  name="chevron-left"
                  size={RFValue(16)}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
            ),
            headerStyle: {backgroundColor: theme.colors.orange_100},
            headerTitleStyle: {
              fontSize: RFValue(18),
            },
            headerTitle: screen.header,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
