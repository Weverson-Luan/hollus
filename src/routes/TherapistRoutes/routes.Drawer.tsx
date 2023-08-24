import React from 'react';
import {useTheme} from 'styled-components';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, Text, TouchableOpacity, View} from 'react-native';

//icons
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

//icons SVG
import LogoHollusSVG from '../../assets/svg/logo-dark.svg';
import {StackParamsList} from './routes';

//screens-stacks-authenticates

//screen-bottomTabs-authenticates
import {Chat} from '../../screens/BottomTabs/Chat';
import {ChatList} from '../../screens/BottomTabs/ChatList';

import LogoPNG from '../../assets/logo.png';

import {WrapperDrawer, DrawerButton, styles} from './routes.styles';
import {AuthenticateBottomTabsNavigation} from './routes.BottomTabs';
import {UserPanel} from '../../screens/StackNavigation/UserPanel';
import {Therapist} from '../../screens/StackNavigation/Therapist';
import {EditProfileTherapist} from '../../screens/StackNavigation/EditProfile/Therapist';
import {AppointmentTherapist} from '../../screens/StackNavigation/Appointment/Therapist';
import {TherapistInfo} from '../../screens/StackNavigation/TherapistInfo';
import {HeaderDrawer} from '../../components/HeaderDrawer';
import {GerenciarConsultas} from '../../screens/StackNavigation/GerenciarConsultas';
import {RegisterTherapistStep2} from '../../screens/StackNavigation/RegisterTherapist';
import {Dashboard} from '../../screens/BottomTabs/Dashboard';
import {FaleConosco} from '../../screens/StackNavigation/FaleConosco';
import {NavigationHeader} from '../../components/NavigationHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFValue} from 'react-native-responsive-fontsize';
import {Filter} from '../../screens/StackNavigation/Filter';
import {ScreenSearch} from '../../screens/BottomTabs/Search';
import {ScreenProducts} from '../../screens/BottomTabs/Products';
import {FilterProducts} from '../../screens/StackNavigation/FilterProducts';
import {Cart} from '../../screens/StackNavigation/Cart';
import {ProductSelected} from '../../screens/StackNavigation/ProductSelected';
import {ResumeRequest} from '../../screens/StackNavigation/ResumeRequest';
import {FormPayment} from '../../screens/StackNavigation/FormPayment';
import {User} from 'phosphor-react-native';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function TherapistRoutesDrawerAuth() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.gray_25,
        },
        headerTitleAlign: 'center',
        headerLeft: () => <></>,
        // headerLeft: () => (
        //   <WrapperDrawer>
        //     <DrawerButton
        //       onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        //     >
        //       <Icon
        //         name="menu"
        //         size={38}
        //         color={theme.colors.orange_100}
        //         style={{ marginLeft: 24 }}
        //       />
        //     </DrawerButton>
        //   </WrapperDrawer>
        // ),
        headerTitle: () => (
          <Image
            source={require('../../assets/logo-full.png')}
            style={{height: 50, width: 150}}
          />
        ),
        // header: () => <HeaderDrawer notification />,
        // headerRight: () => (
        //   <WrapperDrawer>
        //     <DrawerButton>
        //       <Ionicons
        //         name="notifications"
        //         size={26}
        //         color={theme.colors.orange_100}
        //         style={styles.iconNotification}
        //       />
        //     </DrawerButton>
        //   </WrapperDrawer>
        // ),
      }}>
      {/* <Drawer.Screen name="Home" component={AuthenticateBottomTabsNavigation} /> */}
      <Drawer.Screen name="Painel do usuário" component={UserPanel} />
    </Drawer.Navigator>
  );
}

function TherapistStackProfileRoutes() {
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
        name="Therapist"
        component={Therapist}
        options={{
          title: 'Terapeuta',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileTherapist}
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
        name="TherapistInfo"
        component={TherapistInfo}
        options={{
          headerBackVisible: true,
          title: 'Terapeuta',
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
    </Stack.Navigator>
  );
}

function TherapistStackSearchRoutes() {
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
        name="Pesquisar"
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
    </Stack.Navigator>
  );
}

function TherapistStackProductsRoutes() {
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

function TherapistStackRoutesAuth() {
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
        name="HomeAuth"
        component={Dashboard}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="AuthenticateBottomTabsNavigation"
        component={TherapistRoutesDrawerAuth}
        options={{
          headerShown: false,
        }}
      /> */}

      {/* <Stack.Screen
        name="Filter"
        component={Filter}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
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
      /> */}

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

      {/* <Stack.Screen
        name="Products"
        component={ScreenProducts}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Produtos</Text>
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
        name="ProductSelected"
        component={ProductSelected}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
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
        component={Car}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Carrinho</Text>
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
          headerTitleAlign: "center",
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
          headerTitleAlign: "center",
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
      /> */}

      {/* <Stack.Screen
        name="EditProfile"
        component={EditProfileTherapist}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Editar perfil</Text>
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("TherapistInfo")}
            >
              <Text style={styles.rightHeaderText}>Ver perfil</Text>
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        }}
      /> */}
      {/* <Stack.Screen
        name="TherapistInfo"
        component={TherapistInfo}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
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
      /> */}
      {/* <Stack.Screen
        name="GerenciarConsultas"
        component={GerenciarConsultas}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Gerenciar Horários</Text>
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
      /> */}

      <Stack.Screen
        name="RegisterTherapistStep2"
        component={RegisterTherapistStep2}
        options={{
          headerShown: true,
          title: 'Cadastro - Terapias',
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
      {/* <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={styles.containerHeader}>
              <Text style={styles.title}>Categorias de consultas</Text>
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
      /> */}
    </Stack.Navigator>
  );
}

/**
 * EXPORTS
 */
export {
  TherapistRoutesDrawerAuth,
  TherapistStackRoutesAuth,
  TherapistStackProfileRoutes,
  TherapistStackSearchRoutes,
  TherapistStackProductsRoutes,
};
