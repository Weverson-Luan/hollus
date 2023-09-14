import React, {useRef, useState} from 'react';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';

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
  WrapperLabelInput,
  WrapperConfirmePolicy,
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
import {CheckSquare} from 'phosphor-react-native';

export function RegisterSeptOne() {
  const theme = useTheme();
  const auth = useAuth();
  const navigation = useNavigation();
  const policiesRef = useRef<ActionSheetRef>(null);
  const [loading, setLoading] = useState(false);
  const {setAlert} = useAlert();

  const parseErrors = errors => {
    const errArr = Object.values(errors).map(err => err);
    return errArr[0][0];
  };

  const handleRegister = async values => {
    // console.log(values);
    setLoading(true);
    await Api.post('/register', values).then(res => {
      console.log(res.data);
      if (res.data.success) {
        navigation.navigate('SignIn');
        setAlert('Cadastro', res.data.message);
      } else {
        setAlert('Cadastro', parseErrors(res.data.error));
      }
      // Alert.alert("Cadastro", res.data.message, [
      //   {
      //     text: "OK",
      //     onPress: () => navigation.navigate("SignIn"),
      //   },
      // ]);
    });
    setLoading(false);
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
              papel_id: 2,
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
                          policiesRef.current?.hide()
                        )}>
                        <TitleSearchTherapy>
                          Aceitar e voltar
                        </TitleSearchTherapy>
                      </Button>
                    </View>
                  </ActionSheet>

                  <WrapperLabelInput>
                    <LabelInput>
                      Nome{' '}
                      {errors.nome && <LabelError>{errors.nome}</LabelError>}
                    </LabelInput>
                    <Input
                      placeholder="Digite o seu nome"
                      placeholderTextColor={theme.colors.gray_80}
                      width={'100%'}
                      height={`${RFValue(50)}px`}
                      color={theme.colors.white} //background-color
                      autoCorrect={false}
                      onChangeText={handleChange('nome')}
                      onBlur={handleBlur('nome')}
                      value={values.nome}
                    />
                  </WrapperLabelInput>

                  <WrapperLabelInput>
                    <LabelInput>
                      Sobrenome{' '}
                      {errors.sobrenome && (
                        <LabelError>{errors.sobrenome}</LabelError>
                      )}
                    </LabelInput>
                    <Input
                      placeholder="Digite o seu sobrenome"
                      placeholderTextColor={theme.colors.gray_80}
                      width={'100%'}
                      height={`${RFValue(50)}px`}
                      color={theme.colors.white} //background-color
                      autoCorrect={false}
                      onChangeText={handleChange('sobrenome')}
                      onBlur={handleBlur('sobrenome')}
                      value={values.sobrenome}
                    />
                  </WrapperLabelInput>

                  <WrapperLabelInput>
                    <LabelInput>
                      E-mail{' '}
                      {errors.email && <LabelError>{errors.email}</LabelError>}
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
                      autoCapitalize="none"
                    />
                  </WrapperLabelInput>

                  <WrapperLabelInput>
                    <LabelInput>
                      Confirme o e-mail{' '}
                      {errors.emailConfirmation && (
                        <LabelError>{errors.emailConfirmation}</LabelError>
                      )}
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
                      autoCapitalize="none"
                    />
                  </WrapperLabelInput>

                  <WrapperLabelInput>
                    <LabelInput>
                      Celular{' '}
                      {errors.celular && (
                        <LabelError>{errors.celular}</LabelError>
                      )}
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
                  </WrapperLabelInput>

                  <WrapperLabelInput>
                    <LabelInput>
                      CPF {errors.cpf && <LabelError>{errors.cpf}</LabelError>}
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
                  </WrapperLabelInput>

                  <WrapperLabelInput>
                    <LabelInput>
                      RG {errors.rg && <LabelError>{errors.rg}</LabelError>}
                    </LabelInput>
                    <Input
                      placeholder="Digite o seu RG"
                      placeholderTextColor={theme.colors.gray_80}
                      width={'100%'}
                      height={`${RFValue(50)}px`}
                      color={theme.colors.white} // background-color
                      autoCorrect={false}
                      onChangeText={handleChange('rg')}
                      onBlur={handleBlur('rg')}
                      value={values.rg}
                    />
                  </WrapperLabelInput>

                  <WrapperLabelInput>
                    <LabelInput>
                      Senha
                      {errors.password && (
                        <LabelError> {errors.password}</LabelError>
                      )}
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
                  </WrapperLabelInput>

                  <View
                    style={{
                      width: '100%',
                      marginTop: -16,
                      marginBottom: 4,
                      justifyContent: 'flex-start',
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
                    {errors.passwordConfirmation && (
                      <LabelError>{errors.passwordConfirmation}</LabelError>
                    )}
                  </LabelInput>

                  <WrapperLabelInput>
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
                    />

                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}>
                      <LabelInput>Termos de uso </LabelInput>
                      {errors.policiesAccept && (
                        <LabelError>{errors.policiesAccept}</LabelError>
                      )}
                    </View>

                    <WrapperConfirmePolicy>
                      <TouchableOpacity
                        onPress={() => policiesRef.current?.show()}
                        style={{marginRight: 10}}>
                        {values.policiesAccept ? (
                          <CheckSquare
                            weight="fill"
                            color={theme.colors.orange}
                            size={RFValue(20)}
                          />
                        ) : (
                          <CheckSquare
                            color={theme.colors.gray_150}
                            size={RFValue(20)}
                          />
                        )}
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
                    </WrapperConfirmePolicy>

                    <SubmitButtonContainer>
                      <Button
                        width="100%"
                        height="45px"
                        background_color={theme.colors.orange}
                        onPress={() => handleSubmit()}
                        disabled={!isValid || loading}
                        // onPress={() => navigation.navigate('RegisterSeptFour')}
                        // onPress={() => navigation.navigate('RegisterSeptTwo')}
                      >
                        <TitleSearchTherapy>
                          {loading ? <ActivityIndication /> : 'Próximo'}
                        </TitleSearchTherapy>
                      </Button>
                    </SubmitButtonContainer>
                  </WrapperLabelInput>
                </FieldsContainer>
              </>
            )}
          </Formik>
        </WrapperInput>
      </Container>
    </>
  );
}
