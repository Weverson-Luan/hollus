import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
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
  const [isLoading, setIsloading] = useState(true);

  const imaeNotFound =
    'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';

  const handleLoadingData = async () => {
    try {
      const responseUser = await auth.handleGetUser();

      if (responseUser) {
        setUserInfo(responseUser);
      }
    } catch (error) {
      //realizar tratamento de error
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    handleLoadingData();
  }, [isFocused]);

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
                  uri: userInfo?.link_foto ?? imaeNotFound,
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
          console.log('logout');
          auth.handleLogout();
        }}>
        <SignOut size={18} color={theme.colors.orange_100} />
        <TitleLogout>Logout</TitleLogout>
      </WrapperLogout>
    </>
  );
}
