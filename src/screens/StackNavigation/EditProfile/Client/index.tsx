import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//components
import {Button} from '../../../../components/Button';

//styled-components
import {
  Container,
  Content,
  ImageTherapist,
  WrapperInfo,
  Title,
  WrapperHeader,
  ContentPonts,
  TitlePonts,
  WrapperLocation,
  WrapperLocationHeader,
  WrapperLocatinIcon,
  TitleLocationMap,
  SubTitleLocation,
  WrapperButton,
  ContentButton,
  TextButton,
  PhotoWrapper,
  PhotoTouchable,
  Photo,
  PhotoChangeText,
} from './styles';
import {getMyInfo, saveMyInfo} from '../../../../context/hooks/User/useUser';
import {Input} from '../../../../components/Input';
import {LabelText} from '../../SignIn/styles';
import {LabelInput} from '../../RegisterSeptOne/styles';
import {View, PermissionsAndroid} from 'react-native';
import {ActivityIndication} from '../../../../components/Spinner';
import {MaskedTextInputForm} from '../../../../components/Input/styles';
import {Form, Formik, useFormik} from 'formik';
import {EditProfileSchema} from './schema';
import {Api} from '../../../../services/api';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import * as ImagePicker from "expo-image-picker";

export function EditProfileClient({route, navigation}) {
  const theme = useTheme();
  const [emailChanged, setEmailChanged] = useState(false);
  const [myInfo, setMyInfo] = useState({
    nome: '',
    email: '',
    celular: '',
    id: '',
    cpf: '',
    rg: '',
  });
  const [loading, setLoading] = useState(true);
  const [newValues, setNewValues] = useState(myInfo);

  const isFocused = useIsFocused();
  const [celular, setTelefone] = useState('');
  const fetchMyInfo = async () => {
    const res = await getMyInfo().then(
      res => (setMyInfo(res.data), setLoading(false)),
    );
  };

  const pickImage = async () => {
    // // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 1,
    //   allowsMultipleSelection: false,
    // });
    // if (!result.cancelled) {
    //   setLoading(true);
    //   const data = new FormData();
    //   const mime = require("mime");
    //   data.append("foto", {
    //     uri: `${result.uri}`,
    //     type: mime.getType(result.uri),
    //     name: result.uri.split("/").pop(),
    //   });
    //   await Api.post("v1/user/my-info", data, {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   })
    //     .then((res) => {
    //       if (res.status === 200) {
    //         // console.log(res.data);
    //         fetchMyInfo();
    //       }
    //     })
    //     .catch((res) => {
    //       setLoading(false);
    //       // console.log(res.data);
    //     });
    // }
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

  useEffect(() => {
    requestCameraPermission();
    fetchMyInfo();
  }, [isFocused]);

  const saveInfo = async () => {
    setLoading(true);
    const info = removeEmptyNewValues();
    await Api.post('v1/user/my-info', info)
      .then(res => {
        if (res.data.error) {
          // setApiError(res.data.error);
          // console.log(res.data.error);
        }
        fetchMyInfo();
      })
      .catch(error => console.log(error));
    // navigation.goBack();
  };

  const handleNewValue = (field, value) => {
    const temp = newValues;
    temp[field] = value;
    setNewValues(temp);
  };

  const removeEmptyNewValues = () => {
    return Object.fromEntries(
      Object.entries(newValues).filter(function ([key, value]) {
        if (value != myInfo[key] && value != '') {
          return true;
        }
        return false;
      }),
    );
    // return Object.fromEntries(
    //   Object.entries(newValues).filter(([_, v]) => v != "")
    // );
  };

  return (
    <>
      {loading ? (
        <ActivityIndication />
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
          onSubmit={values => saveInfo(values)}
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
                        uri: `${myInfo?.link_foto}`,
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
                      {errors.nome}
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
                      {errors.celular}
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
                    <LabelInput style={{color: 'red'}}>{errors.cpf}</LabelInput>
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
                    <LabelInput style={{color: 'red'}}>{errors.rg}</LabelInput>
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
                      {errors.email}
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
                            {errors.emailConfirmation}
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
                      {errors.password}
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
                        {errors.passwordConfirmation}
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
                    onPress={handleSubmit}>
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
