import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../context/hooks/Auth/useAuth';
import {AxiosInterceptor} from '../services/api';

import {OpenRoutes} from './routes.Stack';

import {AuthenticateBottomTabsNavigation} from './TherapistRoutes/routes.BottomTabs';

import {AuthenticateBottomTabsNavigation as ClientBottomTabs} from './ClientRoutes/routes.BottomTabs';
import {Loading} from '../components/Loading';

interface IUserRoleNavigationProps {
  role_id: number;
}
const UserRoleNavigation = ({role_id}: IUserRoleNavigationProps) => {
  if (role_id !== undefined) {
    return role_id === 3 ? (
      <AuthenticateBottomTabsNavigation />
    ) : (
      <ClientBottomTabs />
    );
  } else {
    return <Loading />;
  }
};

export function AppRoutes() {
  const auth = useAuth();
  const {token} = useAuth();

  return (
    <NavigationContainer>
      <AxiosInterceptor auth={auth}>
        {token ? (
          <UserRoleNavigation role_id={auth?.handleGetUser()?.papel_id} />
        ) : (
          <OpenRoutes />
        )}
      </AxiosInterceptor>
    </NavigationContainer>
  );
}
