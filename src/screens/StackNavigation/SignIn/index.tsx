import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';

// components
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';

//services
import {useAuth} from '../../../context/hooks/Auth/useAuth';

import {ActivityIndication} from '../../../components/Spinner';
import {Image} from 'react-native';
import useAlert from '../../../context/hooks/Alert/useAlert';
import {View} from 'react-native';
import {Loading} from '../../../components/Loading';

// style-components
import {
  Container,
  WrapperHeaderRadius,
  WrapperHeaderIcon,
  WrapperHeaderDescription,
  Title,
  Subtitle,
  ContainerMain,
  WrapperInput,
  LabelText,
  WrapperForget,
  TextForget,
  WrapperButton,
  TextButtonLogin,
  WrapperFooter,
  TextNotAccount,
  TextRegister,
  WrapperRegister,
} from './styles';

export function SignIn() {
  const theme = useTheme();
  const navigation = useNavigation();
  const auth = useAuth();
  const {setAlert} = useAlert();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleOnLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = (await auth.handleAuthentication(
        email,
        password,
      )) as any;
      if (!response?.token) {
        setLoading(false);
        setAlert('Erro ao fazer login', 'E-mail ou senha inválidos');
      }
    } catch (error) {
      setAlert('Erro ao fazer login', 'E-mail ou senha inválidos');
    }
  };

  useEffect(() => {
    !auth.successLogin ? setLoading(false) : null;
  }, []);

  return (
    <>
      {auth.isLoading ? (
        <Loading />
      ) : (
        <View style={{flex: 1, backgroundColor: theme.colors.white}}>
          <Container contentContainerStyle={{justifyContent: 'space-between'}}>
            <WrapperHeaderRadius>
              <WrapperHeaderIcon>
                <Image
                  source={require('../../../assets/logo-full.png')}
                  style={{height: 85}}
                  resizeMode="contain"
                />
              </WrapperHeaderIcon>

              <WrapperHeaderDescription>
                <Title>Bem-vindo à Hollus!</Title>

                <Subtitle>Plataforma especializada em terapias</Subtitle>
              </WrapperHeaderDescription>
            </WrapperHeaderRadius>

            <ContainerMain>
              <WrapperInput>
                <KeyboardAvoidingView>
                  <LabelText>E-mail</LabelText>
                  <Input
                    placeholder="Digite o seu e-mail"
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={'50px'}
                    color={theme.colors.white}
                    autoCorrect={false}
                    onChangeText={text => setEmail(text)}
                    autoCapitalize="none"
                  />

                  <LabelText>Senha</LabelText>
                  <Input
                    placeholder="Digite a sua senha"
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={'50px'}
                    color={theme.colors.white}
                    keyboardType={'default'}
                    secureTextEntry={passwordVisible}
                    autoCorrect={false}
                    onChangeText={text => setPassword(text)}
                    autoCapitalize="none"
                  />
                </KeyboardAvoidingView>
              </WrapperInput>

              <WrapperForget
                onPress={() => navigation.navigate('ForgotPassword')}>
                <TextForget>Esqueceu a sua senha?</TextForget>
              </WrapperForget>

              <WrapperButton>
                <Button
                  width="100%"
                  height="45px"
                  background_color={
                    loading ? theme.colors.white : theme.colors.orange
                  }
                  border
                  disabled={loading}
                  activeOpacity={0.7}
                  onPress={() => {
                    handleOnLogin(email, password);
                  }}>
                  <TextButtonLogin>
                    {loading ? <ActivityIndication /> : 'Login'}
                  </TextButtonLogin>
                </Button>
              </WrapperButton>

              <WrapperFooter>
                <TextNotAccount>Não tem uma conta ?</TextNotAccount>
                <WrapperRegister
                  onPress={() => navigation.navigate('Register')}>
                  <TextRegister>Cadastre-se gratuitamente!</TextRegister>
                </WrapperRegister>
              </WrapperFooter>
            </ContainerMain>
          </Container>
        </View>
      )}
    </>
  );
}
