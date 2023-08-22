import {NavigationContainer} from '@react-navigation/native';
import {useEffect} from 'react';
import {useAuth} from '../context/hooks/Auth/useAuth';
import {AxiosInterceptor} from '../services/api';
import {
  ClientDrawerNavigation,
  ClientStackRoutesAuth,
} from './ClientRoutes/routes.Drawer';
import {rootNavigationRef} from './RootNavigation';
import {OpenRoutes} from './routes.Stack';
import {TherapistStackRoutesAuth} from './TherapistRoutes/routes.Drawer';
import React from 'react';
import {AuthenticateBottomTabsNavigation} from './TherapistRoutes/routes.BottomTabs';
import {AuthenticateBottomTabsNavigation as ClientBottomTabs} from './ClientRoutes/routes.BottomTabs';

interface IUserRoleNavigationProps {
  role_id: number;
}
const UserRoleNavigation = ({role_id}: IUserRoleNavigationProps) => {
  // console.log(role_id);
  // return role_id === 3 ? (
  //   <TherapistStackRoutesAuth/>
  //   ) : (
  //   <ClientStackRoutesAuth/>
  // );
  return role_id === 3 ? (
    <AuthenticateBottomTabsNavigation />
  ) : (
    <ClientBottomTabs />
  );
};

export function AppRoutes() {
  const auth = useAuth();

  return (
    <NavigationContainer ref={rootNavigationRef}>
      <AxiosInterceptor auth={auth}>
        {auth?.successLogin ? (
          <UserRoleNavigation role_id={auth.handleGetUser().papel_id} />
        ) : (
          <OpenRoutes />
        )}
      </AxiosInterceptor>
    </NavigationContainer>
  );
}
