import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useTheme} from 'styled-components';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';

// components
import {Button} from '../../../components/Button';
import {Header} from '../../../components/Header';
import {Input} from '../../../components/Input';

// styles-components
import {
  Container,
  WrapperHeader,
  WrapperDescription,
  Title,
  SubTitle,
  WrapperInput,
  LabelInput,
  WrapperButtons,
  TitleSearchTherapy,
  LabelError,
  SubLabel,
  FieldsContainer,
  SubmitButtonContainer,
  CategoriesList,
  CategoryWrapper,
} from './styles';
import {useAuth, useRegister} from '../../../context/hooks/Auth/useAuth';
import {Alert, Switch, Text, TouchableOpacity, View} from 'react-native';
import {Form, Formik} from 'formik';
import {RegisterSchema} from './Schema/RegisterSchema';

import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import MaskInput from 'react-native-mask-input';
import {RFValue} from 'react-native-responsive-fontsize';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {ActivityIndication} from '../../../components/Spinner';
import {Api} from '../../../services/api';
import useAlert from '../../../context/hooks/Alert/useAlert';
import {CardCategoria} from '../../../components/CardCategoria';
import MultiSelectDropdown from '../../../components/DropDowns/MultipleSelect';
import {
  formatTimeString,
  getDayOfWeekFromIndex,
} from '../../../utils/formatdate';

export function RegisterTherapist() {
  const theme = useTheme();
  const auth = useAuth();
  const navigation = useNavigation();
  const policiesRef = useRef<ActionSheetRef>(null);
  const [loading, setLoading] = useState(false);
  const {setAlert} = useAlert();

  const parseErrors = (errors: Object) => {
    const errArr = Object.values(errors).map(err => err);
    return errArr[0][0];
  };

  const handleRegister = async values => {
    console.log(values);
    setLoading(true);
    await Api.post('/register', values).then(async res => {
      // console.log(res.data);
      if (res.data.success) {
        await auth
          .handleAuthentication(values.email, values.password)
          .then(resAuth => {
            if (!resAuth?.token) {
              setAlert(
                'Erro ao conectar',
                'Ocorrreu um erro na comunicação com o servidor.',
              );
              setLoading(false);
              return;
            } else {
              setAlert('Cadastro', res.data.message);
              navigation.navigate('RegisterTherapistStep2');
              setLoading(false);
              return;
            }
          });
      } else {
        setAlert('Cadastro', parseErrors(res.data.error));
        setLoading(false);
        return;
      }
      // Alert.alert("Cadastro", res.data.message, [
      //   {
      //     text: "OK",
      //     onPress: () => navigation.navigate("SignIn"),
      //   },
      // ]);
      setLoading(false);
    });
  };
  return (
    <>
      <WrapperHeader>
        <Header
          background_color1={theme.colors.orange_100}
          text_color1={theme.colors.orange_100}
        />
      </WrapperHeader>
      <Container>
        <WrapperDescription>
          <Title>Cadastro</Title>
          <SubTitle>
            Para o seu acesso na plataforma, vamos precisar que você insira
            alguns dados abaixo:
          </SubTitle>
        </WrapperDescription>

        <WrapperInput>
          <Formik
            initialValues={{
              nome: '',
              sobrenome: '',
              password: '',
              passwordConfirmation: '',
              email: '',
              emailConfirmation: '',
              celular: '',
              policiesAccept: false,
              rg: '',
              cpf: '',
              papel_id: 3,
            }}
            validationSchema={RegisterSchema}
            onSubmit={values => handleRegister(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldValue,
            }) => (
              <>
                <FieldsContainer>
                  <ActionSheet ref={policiesRef}>
                    <View
                      style={{justifyContent: 'center', padding: RFValue(20)}}>
                      <Text
                        style={{
                          fontSize: RFValue(24),
                          textAlign: 'center',
                          marginBottom: RFValue(10),
                        }}>
                        Termos de uso
                      </Text>
                      <Text
                        style={{
                          fontSize: RFValue(14),
                          textAlign: 'justify',
                          marginBottom: RFValue(10),
                        }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque rhoncus eget massa vitae viverra. Cras dui
                        neque, iaculis at imperdiet non, elementum non mi.
                        Maecenas eu massa nisl. Quisque nec lectus mattis,
                        varius orci sit amet, varius dui. Vivamus nec massa eget
                        felis varius suscipit. Nulla non sollicitudin purus, ac
                        condimentum libero. Suspendisse commodo vel nulla sed
                        interdum. Pellentesque nisi sem, mollis tincidunt
                        euismod vitae, tincidunt vel nisl. Morbi facilisis erat
                        non nunc tincidunt efficitur. Donec aliquet dui dui, sed
                        fermentum nunc feugiat nec.
                      </Text>
                      <Button
                        width="100%"
                        height="45px"
                        background_color={theme.colors.orange}
                        onPress={() => (
                          setFieldValue(
                            'policiesAccept',
                            !values.policiesAccept,
                          ),
                          policiesRef.current?.hide('')
                        )}>
                        <TitleSearchTherapy>
                          Aceitar e voltar
                        </TitleSearchTherapy>
                      </Button>
                    </View>
                  </ActionSheet>
                  <LabelInput>
                    Nome{' '}
                    {errors.nome ? (
                      <LabelError>{errors.nome}</LabelError>
                    ) : null}
                  </LabelInput>
                  <Input
                    placeholder="Digite o seu nome"
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={`${RFValue(50)}px`}
                    color={theme.colors.white}
                    autoCorrect={false}
                    onChangeText={handleChange('nome')}
                    onBlur={handleBlur('nome')}
                    value={values.nome}
                  />

                  <LabelInput>
                    Sobrenome{' '}
                    {errors.sobrenome ? (
                      <LabelError>{errors.sobrenome}</LabelError>
                    ) : null}
                  </LabelInput>
                  <Input
                    placeholder="Digite o seu sobrenome"
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={`${RFValue(50)}px`}
                    color={theme.colors.white}
                    autoCorrect={false}
                    onChangeText={handleChange('sobrenome')}
                    onBlur={handleBlur('sobrenome')}
                    value={values.sobrenome}
                  />

                  <LabelInput>
                    E-mail{' '}
                    {errors.email ? (
                      <LabelError>{errors.email}</LabelError>
                    ) : null}
                  </LabelInput>
                  <Input
                    placeholder="Confirme o seu e-mail"
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={`${RFValue(50)}px`}
                    color={theme.colors.white}
                    autoCorrect={false}
                    onChangeText={handleChange('emailConfirmation')}
                    onBlur={handleBlur('emailConfirmation')}
                    value={values.emailConfirmation}
                    autoCompleteType="email"
                    autoCapitalize="none"
                  />
                  <LabelInput>
                    Confirme o e-mail{' '}
                    {errors.emailConfirmation ? (
                      <LabelError>{errors.emailConfirmation}</LabelError>
                    ) : null}
                  </LabelInput>
                  <Input
                    placeholder="Digite o seu e-mail"
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={`${RFValue(50)}px`}
                    color={theme.colors.white}
                    autoCorrect={false}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    autoCompleteType="email"
                    autoCapitalize="none"
                  />
                  <LabelInput>
                    Celular{' '}
                    {errors.celular ? (
                      <LabelError>{errors.celular}</LabelError>
                    ) : null}
                  </LabelInput>
                  <MaskInput
                    defaultValue={values.celular}
                    value={values.celular}
                    onBlur={handleBlur('celular')}
                    placeholder="Escreva seu Celular..."
                    onChangeText={(masked, unmasked) =>
                      setFieldValue('celular', unmasked)
                    }
                    placeholderTextColor={theme.colors.gray_80}
                    autoCompleteType="tel"
                    style={{
                      height: RFValue(50),
                      padding: 10,
                      marginBottom: RFValue(15),
                      width: '100%',
                      borderRadius: RFValue(4),
                      borderWidth: 1,
                      borderColor: theme.colors.gray_50,
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
                    CPF{' '}
                    {errors.cpf ? <LabelError>{errors.cpf}</LabelError> : null}
                  </LabelInput>
                  <MaskInput
                    defaultValue={values.cpf}
                    value={values.cpf}
                    onBlur={handleBlur('cpf')}
                    placeholder="Escreva seu CPF..."
                    onChangeText={(masked, unmasked) =>
                      setFieldValue('cpf', unmasked)
                    }
                    placeholderTextColor={theme.colors.gray_80}
                    style={{
                      height: RFValue(50),
                      padding: 10,
                      marginBottom: RFValue(15),
                      width: '100%',
                      borderRadius: RFValue(4),
                      borderWidth: 1,
                      borderColor: theme.colors.gray_50,
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
                  <LabelInput>
                    RG {errors.rg ? <LabelError>{errors.rg}</LabelError> : null}
                  </LabelInput>
                  <Input
                    placeholder="Digite o seu RG"
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={`${RFValue(50)}px`}
                    color={theme.colors.white}
                    autoCorrect={false}
                    onChangeText={handleChange('rg')}
                    onBlur={handleBlur('rg')}
                    value={values.rg}
                  />
                  <LabelInput>
                    Senha
                    {errors.password ? (
                      <LabelError> {errors.password}</LabelError>
                    ) : null}
                  </LabelInput>
                  <SubLabel>Deve conter pelo menos 8 caracteres</SubLabel>
                  <Input
                    placeholder="Digite a sua senha"
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={`${RFValue(50)}px`}
                    color={theme.colors.white}
                    autoCorrect={false}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                  <View
                    style={{
                      // paddingHorizontal: 10,
                      marginBottom: 15,
                      justifyContent: 'flex-start',
                      flex: 1,
                    }}>
                    <BarPasswordStrengthDisplay
                      levels={[
                        {
                          label: 'Extremamente fraca',
                          labelColor: '#ff2900',
                          activeBarColor: '#ff2900',
                        },
                        {
                          label: 'Bastante fraca',
                          labelColor: '#ff3e00',
                          activeBarColor: '#ff3e00',
                        },
                        {
                          label: 'Muito fraca',
                          labelColor: '#ff5400',
                          activeBarColor: '#ff5400',
                        },
                        {
                          label: 'Fraca',
                          labelColor: '#ff6900',
                          activeBarColor: '#ff6900',
                        },
                        {
                          label: 'Mais ou menos',
                          labelColor: '#f4d744',
                          activeBarColor: '#f4d744',
                        },
                        {
                          label: 'Mediana',
                          labelColor: '#f3d331',
                          activeBarColor: '#f3d331',
                        },
                        {
                          label: 'Boa',
                          labelColor: '#f2cf1f',
                          activeBarColor: '#f2cf1f',
                        },
                        {
                          label: 'Forte',
                          labelColor: '#14eb6e',
                          activeBarColor: '#14eb6e',
                        },
                        {
                          label: 'Muito forte',
                          labelColor: '#0af56d',
                          activeBarColor: '#0af56d',
                        },
                        {
                          label: 'Extremamente forte',
                          labelColor: '#00ff6b',
                          activeBarColor: '#00ff6b',
                        },
                      ]}
                      password={values.password}
                    />
                  </View>
                  <LabelInput>
                    Confirme a senha{' '}
                    {errors.passwordConfirmation ? (
                      <LabelError>{errors.passwordConfirmation}</LabelError>
                    ) : null}
                  </LabelInput>
                  <Input
                    placeholder="Confirme a sua senha"
                    placeholderTextColor={theme.colors.gray_80}
                    width={'100%'}
                    height={`${RFValue(50)}px`}
                    color={theme.colors.white}
                    autoCorrect={false}
                    onChangeText={handleChange('passwordConfirmation')}
                    onBlur={handleBlur('passwordConfirmation')}
                    value={values.passwordConfirmation}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                  <LabelInput>
                    Termos de uso{' '}
                    {errors.policiesAccept ? (
                      <LabelError>{errors.policiesAccept}</LabelError>
                    ) : null}
                  </LabelInput>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        setFieldValue('policiesAccept', !values.policiesAccept)
                      }
                      style={{marginRight: 10}}>
                      <FontAwesome5Icon
                        name={values.policiesAccept ? 'check-circle' : 'circle'}
                        size={RFValue(20)}
                      />
                    </TouchableOpacity>
                    <LabelInput>
                      Confirmo que li e concordo com os{' '}
                      <TouchableOpacity
                        onPress={() => policiesRef.current?.show()}>
                        <LabelInput style={{textDecorationLine: 'underline'}}>
                          termos de uso do aplicativo.
                        </LabelInput>
                      </TouchableOpacity>
                    </LabelInput>
                  </View>

                  <Button
                    width="100%"
                    height="45px"
                    background_color={
                      loading ? theme.colors.white : theme.colors.orange
                    }
                    onPress={handleSubmit}
                    disabled={false}>
                    <TitleSearchTherapy>
                      {loading ? <ActivityIndication /> : 'Próximo'}
                    </TitleSearchTherapy>
                  </Button>
                </FieldsContainer>
              </>
            )}
          </Formik>
        </WrapperInput>
      </Container>
    </>
  );
}

export function RegisterTherapistStep2() {
  const theme = useTheme();
  const auth = useAuth();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {setAlert} = useAlert();
  const route = useRoute();

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fieldsValid, setFieldsValid] = useState(false);

  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const getCategories = async () => {
    const {data} = await Api.get('/register/categorias');
    setCategoriesList(data.data);
    // let arr = [];
    // data.data.forEach((cat) => {
    //   arr.push({
    //     label: cat.nome,
    //     value: cat.id,
    //     beginTime: new Date(),
    //     endTime: new Date(),
    //     changedBeginTime: false,
    //     changedEndTime: false,
    //     days: Array(7).fill(false),
    //   });
    // });
    // setCategoriesList(arr);
    // setSelectedCategoriesDetails(arr);
    // console.log(categoriesList);
  };

  const validateValues = () => {
    if (selectedCategories.length === 0) {
      setFieldsValid(false);
      return;
    }
    let cats = selectedCategories;
    const valid = cats.every(cat => {
      return (
        !cat.days.every(d => d === false) &&
        cat.changedBeginTime &&
        cat.changedEndTime
      );
    });
    setFieldsValid(valid);
  };

  useMemo(() => {
    validateValues();
  }, [selectedCategories]);

  const handleSubmit = async () => {
    try {
      console.log('8', fieldsValid);
      if (!fieldsValid) {
        setAlert(
          'Campos vazios!',
          'Preencha todos os dados e tente novamente.',
        );
        return;
      }
      const total = selectedCategories.length;
      let count = 0;
      setSubmitLoading(true);
      selectedCategories.forEach(async cat => {
        await Api.post('/v1/user/adicionar-categoria', {
          categoria_id: cat.id,
          valor: '100',
          tempo: '90',
          descricao: 'descricao',
          horario_inicio: `${formatTimeString(cat.beginTime)}`,
          horario_fim: `${formatTimeString(cat.endTime)}`,
          dias_semana: JSON.stringify(
            cat.days
              .map((day, index) => (day ? getDayOfWeekFromIndex(index) : null))
              .filter(_ => _ !== null),
          ),
        }).then(res => (console.log(res.data), (count = count + 1)));
        if (count === total) {
          setAlert('Sucesso!', 'As terapias foram salvas com sucesso!');
          setSubmitLoading(false);
          navigation.navigate('HomeAuth');
        }
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onChangeDetails = catChanged => {
    const temp = [...selectedCategories];

    const index = temp.findIndex(v => v.id === catChanged.id);
    if (index === -1) {
      return;
    }
    temp[index] = catChanged;
    setSelectedCategories(temp);
    // setSelectedCategories([
    //   ...selectedCategories.slice(0, index),
    //   Object.assign({}, selectedCategories[index], catChanged),
    //   ...selectedCategories.slice(index + 1),
    // ]);
    // console.log(selectedCategories);
  };

  const changeSelected = newValues => {
    // console.log("# new", newValues.length);

    const newArr = newValues.map(nV => {
      // check if any of the
      // new values is already
      // selected

      const isSelected = selectedCategories.find(sC => sC?.id === nV.id);
      if (typeof isSelected !== 'undefined') {
        // console.log(nV.nome, " was selected, skipping");

        // return the value
        // that was already
        // selected
        return isSelected;
      }

      // console.log(nV.nome, " wasnt selected, adding");

      // return the new selected value
      return nV;
    });
    // console.log("# w/ new added", newArr.length);
    setSelectedCategories(newArr);
  };

  useEffect(() => {
    setLoading(false);
    getCategories();
    return () => {
      setLoading(true);
    };
  }, [isFocused]);

  return (
    <>
      <WrapperHeader>
        <Header
          background_color3={theme.colors.orange_100}
          text_color3={theme.colors.orange_100}
        />
      </WrapperHeader>
      <Container>
        <WrapperDescription>
          <Title>Cadastro - Terapias</Title>
          <SubTitle>
            Agora, vamos precisar que insira as terapias que você oferece:
          </SubTitle>
        </WrapperDescription>

        {loading ? (
          <ActivityIndication />
        ) : (
          <>
            <WrapperInput>
              <MultiSelectDropdown
                items={categoriesList}
                placeholder={'Selecione pelo menos uma terapia'}
                returnSelected={changeSelected}
              />
            </WrapperInput>
            <CategoriesList>
              {selectedCategories?.map((cat, index) => (
                // <Text key={index}>{cat.nome}</Text>
                <CardCategoria
                  key={cat?.id}
                  data={cat}
                  onChangeValue={onChangeDetails}
                />
              ))}
            </CategoriesList>
            <SubmitButtonContainer>
              <Button
                width="100%"
                height="45px"
                background_color={
                  submitLoading || !fieldsValid
                    ? theme.colors.gray_80
                    : theme.colors.orange
                }
                onPress={() => handleSubmit()}
                // onPress={() => console.log(navigation.getState())}
                disabled={!fieldsValid}>
                <TitleSearchTherapy>
                  {submitLoading ? (
                    <ActivityIndication bgColor={theme.colors.gray_80} />
                  ) : (
                    'Salvar'
                  )}
                </TitleSearchTherapy>
              </Button>
            </SubmitButtonContainer>
          </>
        )}
      </Container>
    </>
  );
}
