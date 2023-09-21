import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useTheme} from 'styled-components';

//icons
import Icon from 'react-native-vector-icons/Ionicons';

//styled-components
import {
  Container,
  TitleAboutQuery,
  WrapperButton,
  ContentButton,
  TextButton,
  WarningContainer,
  WarningText,
  WarningSubText,
} from './styles';
import {ActivityIndicator, PermissionsAndroid, View} from 'react-native';
import {Formik} from 'formik';
import {EditProfileSchema} from './schema';
import {RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';
import MaskInput from 'react-native-mask-input';
import {Button} from '../../../../components/Button';
import {Input} from '../../../../components/Input';
import {
  LabelInput,
  LabelInputError,
  WrapperLabel,
} from '../../RegisterSeptOne/styles';
import {ActivityIndication} from '../../../../components/Spinner';
import {Api} from '../../../../services/api';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  Photo,
  PhotoChangeText,
  PhotoTouchable,
  PhotoWrapper,
} from '../Client/styles';

import useAlert from '../../../../context/hooks/Alert/useAlert';
import {Loading} from '../../../../components/Loading';

export function EditProfileTherapist() {
  const theme = useTheme();
  const [myInfo, setMyInfo] = useState<any>({
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
  const [enderecoInfo, setEnderecoInfo] = useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
  });
  const [apiError, setApiError] = useState();
  const [newValues, setNewValues] = useState(myInfo);
  const {setAlert} = useAlert();

  const parseErrors = (errors: any) => {
    const errArr = Object.values(errors).map(err => err);
    //@ts-ignore
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
  const handleFormatAddress = (numero: any, complemento: any) => {
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
    console.log('searching cep', cep?.length);
    try {
      if (cep?.length === 8 || cep?.length > 8) {
        setLoadingCep(true);
        const responseCep = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`,
        );

        console.log('searching cep', responseCep.data);
        if (responseCep.data) {
          setEnderecoInfo(responseCep.data);
          handleNewValue('endereco_cep', cep);
        }
        setLoadingCep(false);
        // console.log(res.data);
      } else {
        return;
      }
    } catch (error) {
      console.log('*8', error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // console.log(cep);
      cep ? handleCepSearch() : null;
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [cep]);

  const saveInfo = async (values: any) => {
    setLoading(true);
    await Api.post('v1/user/my-info', values)
      .then(res => {
        if (res.data.error) {
          setAlert('Erro', parseErrors(res.data.error));
          fetchMyInfo();
          // console.log(res.data.error);
        } else {
          setAlert('Sucesso', 'Dados atualizado com sucesso');
          fetchMyInfo();
        }
      })
      .catch(error => console.log(error));
  };

  const handleNewValue = (field: any, value: any) => {
    const temp = newValues;
    temp[field] = value;
    setNewValues(temp);
  };

  type IAssestsProps = {
    fileName: string;
    fileSize: number;
    width: number;
    height: number;
    type: string;
    uri: string;
  };
  type IResponseImageSelected = {
    assets: IAssestsProps[];
    didCancel: boolean;
  };

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
                fetchMyInfo();
              }
            })
            .catch(res => {
              setLoading(false);
            });
        }
      },
    );
  };

  const pickImageDocumento = async () => {
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
    //   const mime = require('mime');
    //   data.append('foto_documento', {
    //     uri: `${result.uri}`,
    //     type: mime.getType(result.uri),
    //     name: result.uri.split('/').pop(),
    //   });
    //   await Api.post('v1/user/my-info', data, {
    //     headers: {
    //       'content-type': 'multipart/form-data',
    //     },
    //   })
    //     .then(res => {
    //       // console.log(res.data);
    //       if (res.data.success) {
    //         fetchMyInfo();
    //       }
    //     })
    //     .catch(res => {
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
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();
    fetchMyInfo();
  }, [isFocused]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{
            nome: myInfo?.nome ?? '',
            email: myInfo?.email ?? '',
            password: myInfo?.password ?? '',
            sobre: myInfo?.sobre ?? '',
            experiencias: myInfo?.experiencias ?? '',
            formacao: myInfo?.formacao,
            endereco_logradouro: myInfo?.endereco_logradouro ?? '',
            endereco_numero: myInfo?.endereco_numero ?? '',
            endereco_complemento: myInfo?.endereco_complemento ?? '',
            endereco_bairro: myInfo?.endereco_bairro ?? '',
            endereco_cidade: myInfo?.endereco_cidade ?? '',
            endereco_estado: myInfo?.endereco_estado ?? '',
            endereco_cep: myInfo?.endereco_cep,
            endereco_completo: myInfo.endereco_logradouro
              ? `${myInfo.endereco_logradouro}${
                  myInfo.endereco_numero
                    ? ', número ' + myInfo.endereco_numero
                    : ''
                }${
                  myInfo.endereco_complemento
                    ? ', ' + myInfo.endereco_complemento + ','
                    : ','
                } ${myInfo.endereco_bairro}, ${myInfo.endereco_cidade} - ${
                  myInfo.endereco_estado
                }`
              : '',
            sobre_consulta: myInfo?.sobre_consulta,
            cpf: myInfo?.cpf,
            rg: myInfo?.rg,
            celular: myInfo?.celular,
          }}
          onSubmit={(values: any) =>
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
                        {/**@ts-ignore */}
                      </LabelInput>
                    ) : null}
                    {/**@ts-ignore */}
                    {apiError?.nome ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {/**@ts-ignore */}
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
                    height="50px"
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  <LabelInput>
                    E-mail
                    {errors.email && touched.email ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {' '}
                        {/**@ts-ignore */}
                      </LabelInput>
                    ) : null}
                    {/**@ts-ignore */}
                    {apiError?.email ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {/**@ts-ignore */}
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
                    height="50px"
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  <WrapperLabel>
                    <LabelInput>Celular</LabelInput>
                    {errors.celular && touched.celular && (
                      <LabelInputError>
                        {/**@ts-ignore */}
                        {errors.celular}
                      </LabelInputError>
                    )}
                  </WrapperLabel>

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
                      height: 50,
                      borderRadius: RFValue(4),
                      borderWidth: 1,
                      borderColor: theme.colors.gray_50,
                      marginBottom: RFValue(15),
                      color: theme.colors.gray_200,
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
                  <WrapperLabel>
                    <LabelInput>Sobre você</LabelInput>
                    {errors.sobre && touched.sobre && (
                      <LabelInputError>
                        {/**@ts-ignore */}
                        {errors.sobre}
                      </LabelInputError>
                    )}
                  </WrapperLabel>

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
                    height="80px"
                    color={theme.colors.white}
                    autoCorrect={false}
                    multiline
                  />
                  <WrapperLabel>
                    <LabelInput>RG</LabelInput>
                    {errors.rg && touched.rg && (
                      <LabelInputError>
                        {/**@ts-ignore */}
                        {errors.rg}
                      </LabelInputError>
                    )}
                  </WrapperLabel>

                  <MaskInput
                    // defaultValue={values.rg}
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
                      color: theme.colors.gray_200,
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
                  <WrapperLabel>
                    <LabelInput>CPF</LabelInput>
                    {errors.cpf && touched.cpf && (
                      <LabelInputError>
                        {/**@ts-ignore */}
                        {errors.cpf}
                      </LabelInputError>
                    )}
                  </WrapperLabel>
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
                      color: theme.colors.gray_200,
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
                  <View style={{marginBottom: 16}}>
                    <TitleAboutQuery
                      style={{
                        textAlign: 'center',
                        marginTop: RFValue(10),
                      }}>
                      Informações profissionais
                    </TitleAboutQuery>
                  </View>

                  <LabelInput>
                    Sobre a consulta
                    {errors.sobre_consulta && touched.sobre_consulta ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {/**@ts-ignore */}
                        {errors.sobre_consulta}
                      </LabelInput>
                    ) : null}
                    {/**@ts-ignore */}
                    {apiError?.sobre_consulta ? (
                      <LabelInput style={{color: theme.colors.red}}>
                        {/**@ts-ignore */}
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
                    height="80px"
                    multiline
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  <WrapperLabel>
                    <LabelInput>Experiências</LabelInput>
                    {errors.experiencias && touched.experiencias && (
                      <LabelInputError>
                        {/**@ts-ignore */}
                        {errors.experiencias}
                      </LabelInputError>
                    )}
                  </WrapperLabel>

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
                    height="80px"
                    multiline
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                  <WrapperLabel>
                    <LabelInput>Formação</LabelInput>
                    {errors.formacao && touched.formacao && (
                      <LabelInputError>
                        {/**@ts-ignore */}
                        {errors.formacao}
                      </LabelInputError>
                    )}
                  </WrapperLabel>
                  {/**@ts-ignore */}
                  {apiError?.formacao ? (
                    <LabelInputError>
                      {/**@ts-ignore */}
                      {apiError.formacao[0]}
                    </LabelInputError>
                  ) : null}
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
                    height="50px"
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
                            {/**@ts-ignore */}
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
                            color: theme.colors.gray_80,
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
                            {/**@ts-ignore */}
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
                        width={'98%'}
                        height="50px"
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
                        {/**@ts-ignore */}
                        {errors.endereco_complemento}
                      </LabelInput>
                    ) : null}
                  </LabelInput>
                  <Input
                    defaultValue={values.endereco_complemento}
                    value={values.endereco_complemento}
                    onBlur={handleBlur('endereco_complemento')}
                    placeholder="Informe complemento..."
                    onChangeText={value => {
                      setFieldValue('endereco_complemento', value);
                      handleNewValue('endereco_complemento', value);
                    }}
                    placeholderTextColor={theme.colors.gray_80}
                    style={{padding: 10, marginBottom: 20}}
                    width={'100%'}
                    height="50px"
                    color={theme.colors.white}
                    autoCorrect={false}
                  />
                </View>
                {enderecoInfo.bairro && (
                  <>
                    <LabelInput>
                      Endereço Completo
                      {errors.endereco_completo && touched.endereco_completo ? (
                        <LabelInput style={{color: theme.colors.red}}>
                          {/**@ts-ignore */}
                          {errors.endereco_completo}
                        </LabelInput>
                      ) : null}
                    </LabelInput>
                    <Input
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
                      placeholder="Aguandando..."
                      onChangeText={handleChange('endereco_completo')}
                      placeholderTextColor={theme.colors.gray_80}
                      editable={false}
                      style={{padding: 10}}
                      width={'100%'}
                      height="70px"
                      color={theme.colors.white}
                      autoCorrect={false}
                    />
                  </>
                )}
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
