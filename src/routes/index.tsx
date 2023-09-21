import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../context/hooks/Auth/useAuth';
import {AxiosInterceptor} from '../services/api';

import {OpenRoutes} from './routes.Stack';

import {AuthenticateBottomTabsNavigation} from './TherapistRoutes/routes.BottomTabs';

import {AuthenticateBottomTabsNavigation as ClientBottomTabs} from './ClientRoutes/routes.BottomTabs';

interface IUserRoleNavigationProps {
  role_id: number;
}
const UserRoleNavigation = ({role_id}: IUserRoleNavigationProps) => {
  return role_id === 3 ? (
    <AuthenticateBottomTabsNavigation />
  ) : (
    <ClientBottomTabs />
  );
};

export function AppRoutes() {
  const auth = useAuth();

  return (
    <NavigationContainer>
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
