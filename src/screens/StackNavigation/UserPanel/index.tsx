import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import {SignOut} from 'phosphor-react-native';

//icons

//components
import {CardDrawerNavigation} from '../../../components/CardDrawerNavigation';
import {Loading} from '../../../components/Loading';

//services
import {
  navigationListClient,
  navigationListTherapist,
} from '../../../services/navigation/navigation';

// hooks
import {useAuth} from '../../../context/hooks/Auth/useAuth';

//types
import {IUserResponse} from './interface';

import {imagNotFound} from '../../../common/constants';
import {IUserInfoResponseApi} from '../../../dtos/user-dtos';
import {getMyInfo} from '../../../context/hooks/User/useUser';

//styles
import {
  Container,
  WrapperImage,
  Image,
  Title,
  WrapperLogout,
  TitleLogout,
} from './styles';

export function UserPanel() {
  const theme = useTheme();

  const auth = useAuth();
  const isFocused = useIsFocused();

  const [userInfo, setUserInfo] = useState<IUserResponse>({} as IUserResponse);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetUserInfo = async () => {
    try {
      setIsLoading(true);
      const {data}: IUserInfoResponseApi = await getMyInfo();

      if (data) {
        setUserInfo(data);
      }
    } catch (error) {
      //trataento de error
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetUserInfo();
    }, [isFocused]),
  );

  return (
    <>
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <WrapperImage>
              <Image
                source={{
                  uri: userInfo?.link_foto ? userInfo?.link_foto : imagNotFound,
                }}
              />
              <Title>{userInfo?.nome}</Title>
            </WrapperImage>

            <FlatList
              data={
                userInfo?.papel_id === 2
                  ? navigationListClient
                  : navigationListTherapist
              }
              keyExtractor={item => item?.id}
              renderItem={({item}) => <CardDrawerNavigation data={item} />}
            />
          </>
        )}
      </Container>
      <WrapperLogout
        onPress={async () => {
          auth.handleLogout();
        }}>
        <SignOut size={18} color={theme.colors.orange_100} />
        <TitleLogout>Logout</TitleLogout>
      </WrapperLogout>
    </>
  );
}
