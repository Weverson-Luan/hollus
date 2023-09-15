import React, {useEffect, useState} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import {launchImageLibrary} from 'react-native-image-picker';
import {Formik} from 'formik';

//components
import {Button} from '../../../../components/Button';
import {ActivityIndication} from '../../../../components/Spinner';
import {MaskedTextInputForm} from '../../../../components/Input/styles';
import {Input} from '../../../../components/Input';
import {Loading} from '../../../../components/Loading';

// contexto
import {getMyInfo} from '../../../../context/hooks/User/useUser';

// service
import {Api} from '../../../../services/api';

// commons
import {imagNotFound} from '../../../../common/constants';

// typings
import {IUserInfo, IUserInfoResponseApi} from '../../../../dtos/user-dtos';
import {EditProfileSchema} from './schema';
import {IResponseImageSelected} from './interface';

//styled-components
import {LabelInput} from '../../RegisterSeptOne/styles';
import {
  Container,
  WrapperButton,
  ContentButton,
  TextButton,
  PhotoWrapper,
  PhotoTouchable,
  Photo,
  PhotoChangeText,
} from './styles';

export function EditProfileClient() {
  const theme = useTheme();
  const isFocused = useIsFocused();

  const [emailChanged, setEmailChanged] = useState(false);
  const [myInfo, setMyInfo] = useState<IUserInfo>({} as IUserInfo);
  const [loading, setLoading] = useState(true);
  const [newValues, setNewValues] = useState(myInfo);

  const pickImage = async () => {
    await launchImageLibrary(
      {mediaType: 'photo', quality: 1, selectionLimit: 1},
      async (response: IResponseImageSelected | any) => {
        if (!response.didCancel) {
          setLoading(true);
          const data = new FormData();
          const mime = require('mime');
          data.append('foto', {
            uri: `${response?.assets[0]?.uri}`,
            type: mime.getType(response?.assets[0]?.uri),
            name: response?.assets[0]?.uri.split('/').pop(),
          });
          await Api.post('v1/user/my-info', data, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
            .then(res => {
              if (res.status === 200) {
                handleGetUserInfo();
              }
            })
            .catch(res => {
              setLoading(false);
            });
        }
      },
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleGetUserInfo = async () => {
    try {
      setLoading(true);
      const {data}: IUserInfoResponseApi = await getMyInfo();

      if (data) {
        setMyInfo(data);
      }
    } catch (error) {
      //trataento de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestCameraPermission();
    handleGetUserInfo();
  }, [isFocused]);

  const saveInfo = async (values: any) => {
    try {
      setLoading(true);
      const response = await Api.post('v1/user/my-info', values);
      if (response?.data?.data) {
        const responseMyInfo = await getMyInfo();
        setMyInfo(responseMyInfo.data);
      }
    } catch (error) {
      //tratamento de eror
    } finally {
      setLoading(false);
    }
  };

  const handleNewValue = (field: any, value: any) => {
    const temp: any = newValues;
    temp[field] = value;
    setNewValues(temp);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{
            email: myInfo.email,
            nome: myInfo.nome,
            celular: myInfo.celular,
            rg: myInfo.rg,
            cpf: myInfo.cpf,
            emailConfirmation: '',
            password: '',
            passwordConfirmation: '',
          }}
          onSubmit={(values: any) => saveInfo(values)}
          validationSchema={EditProfileSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            setFieldValue,
          }) => (
            <>
              <Container
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <PhotoWrapper>
                  <PhotoTouchable onPress={pickImage}>
                    <Photo
                      source={{
                        uri: `${
                          myInfo?.link_foto ? myInfo.link_foto : imagNotFound
                        }`,
                      }}
                    />
                    <PhotoChangeText>Trocar foto</PhotoChangeText>
                  </PhotoTouchable>
                </PhotoWrapper>
                <View>
                  <LabelInput style={{textAlign: 'center'}}>
                    Informações pessoais
                  </LabelInput>
                  <LabelInput>Nome</LabelInput>
                  {errors.nome && touched.nome && (
                    <LabelInput style={{color: 'red'}}>
                      {errors.nome as string}
                    </LabelInput>
                  )}
                  <Input
                    defaultValue={values.nome}
                    value={values.nome}
                    onBlur={handleBlur('nome')}
                    placeholder="Digite o seu nome"
                    onChangeText={value => {
                      setFieldValue('nome', value);
                      handleNewValue('nome', value);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={'50px'}
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  <LabelInput>Celular</LabelInput>
                  {errors.celular && touched.nome && (
                    <LabelInput style={{color: 'red'}}>
                      {errors.celular as any}
                    </LabelInput>
                  )}
                  <MaskedTextInputForm
                    defaultValue={values.celular}
                    onBlur={handleBlur('celular')}
                    placeholder="Digite o seu celular"
                    onChangeText={(masked, unmasked) => {
                      setFieldValue('celular', unmasked);
                      handleNewValue('celular', unmasked);
                    }}
                    value={values.celular}
                    placeholderTextColor={theme.colors.gray_80}
                    //@ts-ignore
                    width={'100%'}
                    height={'50px'}
                    color={theme.colors.white}
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={16}
                    mask={[
                      '(',
                      /\d/,
                      /\d/,
                      ')',
                      ' ',
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                  />
                  <LabelInput>CPF</LabelInput>
                  {errors.cpf && touched.cpf && (
                    <LabelInput style={{color: 'red'}}>
                      {errors.cpf as any}
                    </LabelInput>
                  )}
                  <MaskedTextInputForm
                    defaultValue={values.cpf}
                    onBlur={handleBlur('cpf')}
                    placeholder="Digite o seu CPF"
                    onChangeText={(masked, unmasked) => {
                      setFieldValue('cpf', unmasked);
                      handleNewValue('cpf', unmasked);
                    }}
                    value={values.cpf}
                    placeholderTextColor={theme.colors.gray_80}
                    //@ts-ignore
                    width={'100%'}
                    height={'50px'}
                    color={theme.colors.white}
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={16}
                    mask={[
                      /\d/,
                      /\d/,
                      /\d/,
                      '.',
                      /\d/,
                      /\d/,
                      /\d/,
                      '.',
                      /\d/,
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                    ]}
                  />
                  <LabelInput>RG</LabelInput>
                  {errors.rg && touched.rg && (
                    <LabelInput style={{color: 'red'}}>
                      {errors.rg as any}
                    </LabelInput>
                  )}
                  <Input
                    defaultValue={values.rg}
                    value={values.rg}
                    onBlur={handleBlur('rg')}
                    placeholder="Digite o seu RG"
                    onChangeText={value => {
                      setFieldValue('rg', value);
                      handleNewValue('rg', value);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={'50px'}
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                </View>
                <View>
                  <LabelInput style={{textAlign: 'center'}}>
                    Informações de login
                  </LabelInput>
                  <LabelInput>E-mail</LabelInput>
                  {errors.email && touched.email && (
                    <LabelInput style={{color: 'red'}}>
                      {errors.email as any}
                    </LabelInput>
                  )}
                  <Input
                    onFocus={() => setEmailChanged(true)}
                    defaultValue={values.email}
                    value={values.email}
                    onBlur={handleBlur('email')}
                    placeholder="Digite o seu e-mail"
                    onChangeText={value => {
                      setFieldValue('email', value);
                      handleNewValue('email', value);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={'50px'}
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  {emailChanged ? (
                    <>
                      <LabelInput>Confirme o e-mail</LabelInput>
                      {errors.emailConfirmation &&
                        touched.emailConfirmation && (
                          <LabelInput style={{color: 'red'}}>
                            {errors.emailConfirmation as any}
                          </LabelInput>
                        )}
                      <Input
                        defaultValue={values.emailConfirmation}
                        value={values.emailConfirmation}
                        onBlur={handleBlur('emailConfirmation')}
                        placeholder="Confirme o novo e-mail"
                        onChangeText={handleChange('emailConfirmation')}
                        placeholderTextColor={theme.colors.gray_80}
                        width={'100%'}
                        height={'50px'}
                        color={theme.colors.white}
                        autoCorrect={false}
                      />
                    </>
                  ) : null}
                  <LabelInput>Senha</LabelInput>
                  {errors.password && touched.password && (
                    <LabelInput style={{color: 'red'}}>
                      {errors.password as any}
                    </LabelInput>
                  )}
                  <Input
                    defaultValue={values.password}
                    value={values.password}
                    onBlur={handleBlur('password')}
                    placeholder="Digite a sua nova senha"
                    onChangeText={value => {
                      setFieldValue('password', value);
                      handleNewValue('password', value);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={'50px'}
                    color={theme.colors.white}
                    autoCorrect={false}
                    secureTextEntry
                  />
                  <LabelInput>Confirme a nova senha</LabelInput>
                  {errors.passwordConfirmation &&
                    touched.passwordConfirmation && (
                      <LabelInput style={{color: 'red'}}>
                        {errors.passwordConfirmation as any}
                      </LabelInput>
                    )}
                  <Input
                    defaultValue={values.passwordConfirmation}
                    value={values.passwordConfirmation}
                    onBlur={handleBlur('passwordConfirmation')}
                    placeholder="Confirme a nova senha"
                    onChangeText={handleChange('passwordConfirmation')}
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={'50px'}
                    color={theme.colors.white}
                    autoCorrect={false}
                    secureTextEntry
                  />
                </View>
              </Container>
              <WrapperButton>
                {/* {isValid && ( */}
                <ContentButton>
                  <Button
                    width="100%"
                    height="50px"
                    background_color={
                      loading ? theme.colors.white : theme.colors.orange_100
                    }
                    border
                    onPress={() => handleSubmit()}>
                    <TextButton>
                      {loading ? <ActivityIndication /> : 'Salvar'}
                    </TextButton>
                  </Button>
                </ContentButton>
                {/* )} */}
              </WrapperButton>
            </>
          )}
        </Formik>
      )}
    </>
  );
}
