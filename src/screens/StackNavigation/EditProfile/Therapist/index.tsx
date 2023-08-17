import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';

//components

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
  TitleAboutQuery,
  TitleLocationMap,
  SubTitleLocation,
  WrapperButton,
  ContentButton,
  TextButton,
  WarningContainer,
  WarningText,
  WarningSubText,
  ProfileButton,
  ProfileButtonText,
} from './styles';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {Form, Formik, useFormik} from 'formik';
import {EditProfileSchema} from './schema';
import {RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';
import MaskInput from 'react-native-mask-input';
import {Button} from '../../../../components/Button';
import {Input} from '../../../../components/Input';
import {LabelInput} from '../../RegisterSeptOne/styles';
import {ActivityIndication} from '../../../../components/Spinner';
import {Api} from '../../../../services/api';
import {
  Photo,
  PhotoChangeText,
  PhotoTouchable,
  PhotoWrapper,
} from '../Client/styles';
// import * as ImagePicker from "expo-image-picker";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import useAlert from '../../../../context/hooks/Alert/useAlert';

export function EditProfileTherapist({route, navigation}) {
  const theme = useTheme();
  const [myInfo, setMyInfo] = useState({
    id: '',
    sobre: '',
    experiencias: '',
    formacao: '',
    endereco_cep: '',
    endereco_numero: '',
    endereco_complemento: '',
    endereco_logradouro: '',
    endereco_bairro: '',
    endereco_cidade: '',
    endereco_estado: '',
    celular: '',
    // lat: "",
    // long: "",
    nome: '',
    email: '',
    password: '',
    sobre_consulta: '',
    rg: '',
    cpf: '',
  });
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [loadingCep, setLoadingCep] = useState(false);
  const [cep, setCep] = useState('');
  const [enderecoInfo, setEnderecoInfo] = useState({});
  const [apiError, setApiError] = useState();
  const [newValues, setNewValues] = useState(myInfo);
  const {setAlert} = useAlert();

  const parseErrors = errors => {
    const errArr = Object.values(errors).map(err => err);
    return errArr[0][0];
  };

  const getMyInfo = async () => {
    const res = await Api.get('v1/user/my-info');
    return res.data;
  };
  const fetchMyInfo = async () => {
    const res = await getMyInfo();
    // console.log(res.data);
    setMyInfo(res.data);
    setLoading(false);
  };
  const handleFormatAddress = (numero, complemento) => {
    if (typeof enderecoInfo === 'undefined') {
      return;
    }
    return `${enderecoInfo?.logradouro}${numero ? ', número ' + numero : ''}${
      complemento ? ', ' + complemento + ',' : ','
    } ${enderecoInfo?.bairro}, ${enderecoInfo?.localidade} - ${
      enderecoInfo?.uf
    }`;
  };
  const handleCepSearch = async () => {
    // console.log("searching cep");
    setLoadingCep(true);
    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    !res.data.erro
      ? (setEnderecoInfo(res.data), handleNewValue('endereco_cep', cep))
      : null;
    setLoadingCep(false);
    // console.log(res.data);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // console.log(cep);
      cep ? handleCepSearch() : null;
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [cep]);

  const saveInfo = async () => {
    setLoading(true);
    const info = removeEmptyNewValues();
    if (info.endereco_cep && enderecoInfo) {
      info.endereco_logradouro = enderecoInfo.logradouro;
      info.endereco_bairro = enderecoInfo.bairro;
      info.endereco_cidade = enderecoInfo.localidade;
      info.endereco_estado = enderecoInfo.uf;
    }
    await Api.post('v1/user/my-info', info)
      .then(res => {
        if (res.data.error) {
          setAlert('Erro', parseErrors(res.data.error));
          fetchMyInfo();
          // console.log(res.data.error);
        } else {
          fetchMyInfo();
        }
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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
    //       fetchMyInfo();
    //     })
    //     .catch((res) => {
    //       setLoading(false);
    //       // console.log(res.data);
    //     });
    // }
  };

  const pickImageDocumento = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: false,
    });
    if (!result.cancelled) {
      setLoading(true);
      const data = new FormData();
      const mime = require('mime');
      data.append('foto_documento', {
        uri: `${result.uri}`,
        type: mime.getType(result.uri),
        name: result.uri.split('/').pop(),
      });
      await Api.post('v1/user/my-info', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(res => {
          // console.log(res.data);
          if (res.data.success) {
            fetchMyInfo();
          }
        })
        .catch(res => {
          setLoading(false);
          // console.log(res.data);
        });
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, [isFocused]);
  return (
    <>
      {loading ? (
        <ActivityIndication />
      ) : (
        <Formik
          initialValues={{
            nome: myInfo?.nome,
            email: myInfo?.email,
            password: myInfo?.password,
            sobre: myInfo?.sobre,
            experiencias: myInfo?.experiencias,
            formacao: myInfo?.formacao,
            endereco_logradouro: myInfo?.endereco_logradouro,
            endereco_numero: myInfo?.endereco_numero,
            endereco_complemento: myInfo?.endereco_complemento,
            endereco_bairro: myInfo?.endereco_bairro,
            endereco_cidade: myInfo?.endereco_cidade,
            endereco_estado: myInfo?.endereco_estado,
            endereco_cep: myInfo?.endereco_cep,
            endereco_completo: `${myInfo.endereco_logradouro}${
              myInfo.endereco_numero ? ', número ' + myInfo.endereco_numero : ''
            }${
              myInfo.endereco_complemento
                ? ', ' + myInfo.endereco_complemento + ','
                : ','
            } ${myInfo.endereco_bairro}, ${myInfo.endereco_cidade} - ${
              myInfo.endereco_estado
            }`,
            sobre_consulta: myInfo?.sobre_consulta,
            cpf: myInfo?.cpf,
            rg: myInfo?.rg,
            celular: myInfo?.celular,
          }}
          onSubmit={values =>
            // setLoading(true),
            saveInfo(values)
          }
          validationSchema={EditProfileSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isValid,
            setFieldError,
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
                  {myInfo?.documento_status === 'pendente' ? (
                    <WarningContainer onPress={pickImageDocumento}>
                      <Icon
                        name="alert-circle"
                        size={RFValue(32)}
                        color={theme.colors.orange}
                      />
                      <WarningText>Documentação pendente!</WarningText>
                      <WarningSubText>Clique aqui para enviar.</WarningSubText>
                    </WarningContainer>
                  ) : null}
                  {myInfo?.documento_status === 'reenvio' ? (
                    <WarningContainer onPress={pickImageDocumento}>
                      <Icon
                        name="refresh-circle"
                        size={RFValue(32)}
                        color={theme.colors.orange}
                      />
                      <WarningText>Reenvie a documentação!</WarningText>
                      <WarningSubText>
                        Por favor, clique aqui para reenviar a documentação.
                      </WarningSubText>
                    </WarningContainer>
                  ) : null}
                  {myInfo?.documento_status === 'enviado' ? (
                    <WarningContainer disabled>
                      <Icon
                        name="checkmark-circle"
                        size={RFValue(32)}
                        color={theme.colors.green}
                      />
                      <WarningText>Documentação enviada!</WarningText>
                      <WarningSubText>
                        Por favor, aguarde o retorno.
                      </WarningSubText>
                    </WarningContainer>
                  ) : null}
                  {myInfo?.documento_status === 'aprovado' ? (
                    <WarningContainer disabled>
                      <Icon
                        name="checkmark-done-circle"
                        size={RFValue(32)}
                        color={theme.colors.green}
                      />
                      <WarningText>Documentação aprovada!</WarningText>
                      <WarningSubText>
                        Utilize o aplicativo normalmente.
                      </WarningSubText>
                    </WarningContainer>
                  ) : null}
                  {myInfo?.documento_status === 'reprovado' ? (
                    <WarningContainer disabled>
                      <Icon
                        name="close-circle"
                        size={RFValue(32)}
                        color={theme.colors.red}
                      />
                      <WarningText>Documentação reprovada!</WarningText>
                      <WarningSubText>
                        Entre em contato para mais detalhes.
                      </WarningSubText>
                    </WarningContainer>
                  ) : null}
                  <View>
                    <TitleAboutQuery
                      style={{
                        textAlign: 'center',
                        marginVertical: RFValue(10),
                      }}>
                      Informações pessoais
                    </TitleAboutQuery>
                  </View>
                  <LabelInput>
                    Nome
                    {errors.nome && touched.nome ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {errors.nome}
                      </LabelInput>
                    ) : null}
                    {apiError?.nome ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {apiError.nome[0]}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <Input
                    defaultValue={values.nome}
                    value={values.nome}
                    onBlur={handleBlur('nome')}
                    placeholder="Escreva seu nome..."
                    onChangeText={value => {
                      setFieldValue('nome', value);
                      handleNewValue('nome', value);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    style={{padding: 10}}
                    width={'100%'}
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  <LabelInput>
                    E-mail
                    {errors.email && touched.email ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {errors.email}
                      </LabelInput>
                    ) : null}
                    {apiError?.email ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {apiError.email[0]}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <Input
                    defaultValue={values.email}
                    value={values.email}
                    onBlur={handleBlur('email')}
                    placeholder="Escreva seu email..."
                    onChangeText={value => {
                      setFieldValue('email', value);
                      handleNewValue('email', value);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    style={{padding: 10}}
                    width={'100%'}
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  <LabelInput>
                    Celular
                    {errors.celular && touched.celular ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {errors.celular}
                      </LabelInput>
                    ) : null}
                    {apiError?.celular ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {apiError.celular[0]}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <MaskInput
                    defaultValue={values.celular}
                    value={values.celular}
                    onBlur={handleBlur('celular')}
                    placeholder="Escreva seu celular..."
                    onChangeText={(masked, unmasked) => {
                      setFieldValue('celular', unmasked);
                      handleNewValue('celular', unmasked);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    style={{
                      padding: 10,
                      width: '100%',
                      borderRadius: RFValue(4),
                      borderWidth: 1,
                      borderColor: theme.colors.gray_50,
                      marginBottom: RFValue(15),
                    }}
                    keyboardType="number-pad"
                    mask={[
                      '(',
                      /\d/,
                      /\d/,
                      ')',
                      ' ',
                      /\d/,
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
                    autoCorrect={false}
                  />
                  <LabelInput>
                    Sobre você
                    {errors.sobre && touched.sobre ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {errors.sobre}
                      </LabelInput>
                    ) : null}
                    {apiError?.sobre ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {apiError.sobre[0]}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <Input
                    defaultValue={values.sobre}
                    value={values.sobre}
                    onBlur={handleBlur('sobre')}
                    placeholder="Escreva sobre você..."
                    onChangeText={value => {
                      setFieldValue('sobre', value);
                      handleNewValue('sobre', value);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    style={{padding: 10}}
                    width={'100%'}
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  <LabelInput>
                    RG
                    {errors.rg && touched.rg ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {errors.rg}
                      </LabelInput>
                    ) : null}
                    {apiError?.rg ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {apiError.rg[0]}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <MaskInput
                    defaultValue={values.rg}
                    value={values.rg}
                    onBlur={handleBlur('rg')}
                    placeholder="Escreva seu RG..."
                    onChangeText={(masked, unmasked) => {
                      setFieldValue('rg', unmasked);
                      handleNewValue('rg', unmasked);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    style={{
                      padding: 10,
                      width: '100%',
                      borderRadius: RFValue(4),
                      borderWidth: 1,
                      borderColor: theme.colors.gray_50,
                      marginBottom: RFValue(15),
                    }}
                    keyboardType="number-pad"
                    mask={[
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                    autoCorrect={false}
                  />
                  <LabelInput>
                    CPF
                    {errors.cpf && touched.cpf ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {errors.cpf}
                      </LabelInput>
                    ) : null}
                    {apiError?.cpf ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {apiError.cpf[0]}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <MaskInput
                    defaultValue={values.cpf}
                    value={values.cpf}
                    onBlur={handleBlur('cpf')}
                    placeholder="Escreva seu CPF..."
                    onChangeText={(masked, unmasked) => {
                      setFieldValue('cpf', unmasked);
                      handleNewValue('cpf', unmasked);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    style={{
                      padding: 10,
                      width: '100%',
                      borderRadius: RFValue(4),
                      borderWidth: 1,
                      borderColor: theme.colors.gray_50,
                      marginBottom: RFValue(15),
                    }}
                    keyboardType="number-pad"
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
                    autoCorrect={false}
                  />
                  <View>
                    <TitleAboutQuery
                      style={{
                        textAlign: 'center',
                        marginTop: RFValue(10),
                      }}>
                      Informações profissionais
                    </TitleAboutQuery>
                  </View>
                  {/* <ProfileButton>
                    <ProfileButtonText>Enviar certificado</ProfileButtonText>
                  </ProfileButton> */}
                  <LabelInput>
                    Sobre a consulta
                    {errors.sobre_consulta && touched.sobre_consulta ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {errors.sobre_consulta}
                      </LabelInput>
                    ) : null}
                    {apiError?.sobre_consulta ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {apiError.sobre_consulta[0]}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <Input
                    defaultValue={values.sobre_consulta}
                    value={values.sobre_consulta}
                    onBlur={handleBlur('sobre_consulta')}
                    placeholder="Escreva sobre a consulta..."
                    onChangeText={value => {
                      setFieldValue('sobre_consulta', value);
                      handleNewValue('sobre_consulta', value);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    style={{padding: 10}}
                    width={'100%'}
                    multiline
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  <LabelInput>
                    Experiências
                    {errors.experiencias && touched.experiencias ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {errors.experiencias}
                      </LabelInput>
                    ) : null}
                    {apiError?.experiencias ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {apiError.experiencias[0]}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <Input
                    defaultValue={values.experiencias}
                    value={values.experiencias}
                    onBlur={handleBlur('experiencias')}
                    placeholder="Escreva suas experiências..."
                    onChangeText={value => {
                      setFieldValue('experiencias', value);
                      handleNewValue('experiencias', value);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    style={{padding: 10}}
                    width={'100%'}
                    multiline
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  <LabelInput>
                    Formação
                    {errors.formacao && touched.formacao ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {errors.formacao}
                      </LabelInput>
                    ) : null}
                    {apiError?.formacao ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {apiError.formacao[0]}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <Input
                    defaultValue={values.formacao}
                    value={values.formacao}
                    onBlur={handleBlur('formacao')}
                    placeholder="Escreva sua formação..."
                    onChangeText={value => {
                      setFieldValue('formacao', value);
                      handleNewValue('formacao', value);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    style={{padding: 10}}
                    width={'100%'}
                    multiline
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  <View>
                    <TitleAboutQuery
                      style={{
                        textAlign: 'center',
                        marginVertical: RFValue(10),
                      }}>
                      Localização
                    </TitleAboutQuery>
                  </View>
                  <LabelInput>
                    Endereço Completo
                    {errors.endereco_completo && touched.endereco_completo ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {errors.endereco_completo}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <Input
                    defaultValue={values.endereco_completo}
                    value={
                      values.endereco_completo === ''
                        ? values.endereco_cep &&
                          !errors.endereco_cep &&
                          !loadingCep &&
                          enderecoInfo
                          ? handleFormatAddress(
                              values.endereco_numero,
                              values.endereco_complemento,
                            )
                          : loadingCep
                          ? 'Buscando pelo CEP...'
                          : ''
                        : values.endereco_completo
                    }
                    multiline
                    onBlur={handleBlur('endereco_completo')}
                    placeholder="Insira o CEP..."
                    onChangeText={handleChange('endereco_completo')}
                    placeholderTextColor={theme.colors.gray_80}
                    editable={false}
                    style={{padding: 10}}
                    width={'100%'}
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: 200}}>
                      <LabelInput>
                        CEP {loadingCep ? <ActivityIndicator /> : null}
                        {errors.endereco_cep && touched.endereco_cep ? (
                          <LabelInput style={{color: theme.colors.red}}>
                            {' '}
                            {errors.endereco_cep}
                          </LabelInput>
                        ) : null}
                      </LabelInput>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: RFValue(125),
                        }}>
                        <MaskInput
                          defaultValue={values.endereco_cep}
                          value={values.endereco_cep}
                          onBlur={handleBlur('endereco_cep')}
                          placeholder="Insira seu CEP..."
                          onChangeText={(masked, unmasked) => {
                            setCep(masked);
                            setFieldValue('endereco_completo', '');
                            setFieldValue('endereco_cep', masked);
                          }}
                          onSubmitEditing={() => {
                            setLoadingCep(true);
                            axios
                              .get(
                                `https://viacep.com.br/ws/${values.endereco_cep}/json/`,
                              )
                              .then(res => {
                                res.data.erro
                                  ? setFieldError(
                                      'endereco_cep',
                                      'CEP inválido',
                                    )
                                  : ((values.endereco_completo = res.data),
                                    (values.endereco_cep = res.data.cep));
                              })
                              .catch(() =>
                                setFieldError('endereco_cep', 'CEP inválido'),
                              )
                              .then(() => setLoadingCep(false));
                          }}
                          placeholderTextColor={theme.colors.gray_80}
                          style={{
                            padding: 10,
                            width: '100%',
                            borderRadius: RFValue(4),
                            borderWidth: 1,
                            borderColor: theme.colors.gray_50,
                          }}
                          mask={[
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            '-',
                            /\d/,
                            /\d/,
                            /\d/,
                          ]}
                          autoCorrect={false}
                          keyboardType="number-pad"
                        />
                      </View>
                    </View>
                    <View style={{width: '45%'}}>
                      <LabelInput>
                        Número
                        {errors.endereco_numero && touched.endereco_numero ? (
                          <LabelInput style={{color: theme.colors.red}}>
                            {' '}
                            {errors.endereco_numero}
                          </LabelInput>
                        ) : null}
                      </LabelInput>
                      <Input
                        defaultValue={values.endereco_numero}
                        value={values.endereco_numero}
                        onBlur={handleBlur('endereco_numero')}
                        placeholder="Insira o número..."
                        onChangeText={value => {
                          setFieldValue('endereco_numero', value);
                          handleNewValue('endereco_numero', value);
                        }}
                        placeholderTextColor={theme.colors.gray_80}
                        style={{padding: 10}}
                        maxLength={8}
                        width={'100%'}
                        color={theme.colors.white}
                        autoCorrect={false}
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                  <LabelInput>
                    Complemento
                    {errors.endereco_complemento &&
                    touched.endereco_complemento ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {errors.endereco_complemento}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <Input
                    defaultValue={values.endereco_complemento}
                    value={values.endereco_complemento}
                    onBlur={handleBlur('endereco_complemento')}
                    placeholder=""
                    onChangeText={value => {
                      setFieldValue('endereco_complemento', value);
                      handleNewValue('endereco_complemento', value);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    style={{padding: 10, marginBottom: 20}}
                    width={'100%'}
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  {/* <LabelInput>
                    Endereço Completo
                    {errors.endereco_completo && touched.endereco_completo ? (
                      <LabelInput style={{ color: theme.colors.red }}>
                        {" "}
                        {errors.endereco_completo}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <Input
                    defaultValue={values.endereco_completo}
                    value={values.endereco_completo}
                    onBlur={handleBlur("endereco_completo")}
                    placeholder="Escreva sua formação..."
                    onChangeText={handleChange("endereco_completo")}
                    placeholderTextColor={theme.colors.gray_80}
                    style={{ padding: 10 }}
                    width={"100%"}
                    color={theme.colors.white}
                    autoCorrect={false}
                  /> */}
                </View>
              </Container>
              <WrapperButton>
                <ContentButton>
                  <Button
                    width="100%"
                    height="50px"
                    background_color={
                      loading ? theme.colors.white : theme.colors.orange_100
                    }
                    border
                    onPress={() => handleSubmit()}
                    // onPress={() => console.log(values)}
                    disabled={loading}>
                    <TextButton>
                      {loading ? <ActivityIndication /> : 'Salvar'}
                    </TextButton>
                  </Button>
                </ContentButton>
              </WrapperButton>
            </>
          )}
        </Formik>
      )}
    </>
  );
}
