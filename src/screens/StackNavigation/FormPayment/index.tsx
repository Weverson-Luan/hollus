import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'styled-components';
import {useNavigation, useRoute} from '@react-navigation/native';

//icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//components
import {Button} from '../../../components/Button';

//styled-components
import {
  Main,
  Title,
  WrapperButtonNext,
  WrapperCard,
  CardBand,
  TitleCard,
  WrapperCardBorder,
  WrapperCardBand,
  TitleCardBand,
  ButtonAddCard,
  TitleButtonAddCard,
  TitleMore,
  WrapperButtonAddCard,
  WrapperCardSelected,
  WrapperTitleBankNumber,
  TitleBankName,
  WrapperTitleBankName,
  TitleBankNumber,
  WrapperMainCarHolder,
  WrapperCarHolder,
  TitleHolder,
  SubTitleHolder,
  CreditCardWrapper,
  CardRow,
  CardCol,
  CardMaskedField,
  CardErrorText,
  CardLeftCol,
  CardField,
  CardRightCol,
} from './styles';
import {
  getCards,
  postPayment,
  postSaveCard,
} from '../../../context/hooks/Payment/usePayment';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {Input} from '../../../components/Input';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import {CCSchema} from '../PaymentInfo/Schema';
//@ts-ignore
import {CardView} from 'react-native-credit-card-input';
import cardValidator from 'card-validator';
import {ActivityIndication} from '../../../components/Spinner';
import useAlert from '../../../context/hooks/Alert/useAlert';
import {ModalCustom} from './modal/modal';
import {CheckSquare} from 'phosphor-react-native';

type IRoutesProps = {
  params: {
    consulta_id: number;
  };
};
export function FormPayment({route, navigation}: any) {
  const theme = useTheme();
  const [cards, setCards] = useState<any>();
  const [cardInfo, setCardInfo] = useState();
  const [openCards, setOpenCards] = useState(false);
  const [openUserCards, setOpenUserCards] = useState(false);
  const [bgCards, setBgCards] = useState(false);
  const [cardToUse, setCardToUse] = useState();
  const [name, setName] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {params} = useRoute() as IRoutesProps;

  const firstFieldRef = useRef(null);
  const secondFieldRef = useRef(null);
  const thirdFieldRef = useRef(null);
  const fourthFieldRef = useRef(null);
  const [cvcFocused, setCvcFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const {setAlert} = useAlert();

  // abrir modal
  const [isModal, setIsModal] = useState(false);
  async function handleGetCards() {
    const res = await getCards();
    setCards(res.data);
  }

  async function handleSaveCard(values: any) {
    try {
      setLoading(true);
      const responseSaveCard = await postSaveCard(values);

      if (responseSaveCard) {
        handleGetCards();
        setIsModal(false);
      }
    } catch (error) {
      //error message
    } finally {
      setLoading(false);
    }
  }

  async function handlePay() {
    if (params?.consulta_id) {
      const responsePagamento = await postPayment(route.params.consulta_id);

      if (responsePagamento) {
        setAlert(
          'Pagamento confirmado!',
          'Simulação de pagamento de produtos feita com sucesso!',
        );
        await AsyncStorageLib.removeItem('cart');
        navigation.navigate('Home');
      }
      console.log('response', responsePagamento);
    } else {
      const res = await postPayment(route.params.consulta_id);
      res.error
        ? setAlert('Erro ao confirmar o pagamento', res.error)
        : setAlert('Pagamento confirmado!', res.message),
        navigation.navigate('Appointment', {
          id: res.data.id,
        });
    }
  }
  const formatCCBrand = (brand: any) => {
    if (
      brand.indexOf('mastercard') !== -1 ||
      brand.indexOf('MasterCard') !== -1
    )
      return 'master-card';
    if (
      brand.indexOf('americanexpress') !== -1 ||
      brand.indexOf('AmericanExpress') !== -1
    )
      return 'american-express';
    if (
      brand.indexOf('dinersclub') !== -1 ||
      brand.indexOf('DinersClub') !== -1
    )
      return 'diners-club';
    return brand;
  };

  useEffect(() => {
    handleGetCards();
    setName('');
    // console.log("asd");
    // console.log(route.params);
  }, []);

  return (
    <Main>
      <WrapperButtonNext>
        <View style={{flex: 1, width: '100%'}}>
          <Button
            width="100%"
            height="45px"
            background_color={theme.colors.white}
            border
            activeOpacity={0.7}>
            <Title>Pix</Title>
          </Button>

          <Button
            width="100%"
            height="45px"
            background_color={theme.colors.white}
            border
            onPress={() => {
              setOpenCards(!openCards);
            }}
            activeOpacity={0.7}>
            <Title>Cartão</Title>
          </Button>
          {openCards && (
            <>
              <WrapperCard>
                {/*@ts-ignore */}
                <WrapperCardBorder
                  onPress={() => {
                    setOpenUserCards(!openUserCards);
                    setBgCards(!bgCards);
                  }}
                  background={bgCards}>
                  <TitleCard color={bgCards}>Cartão de crédito</TitleCard>
                  {bgCards ? (
                    <CheckSquare
                      weight="fill"
                      size={14}
                      color={theme.colors.orange_100}
                    />
                  ) : (
                    <CheckSquare size={14} color={theme.colors.black} />
                  )}
                </WrapperCardBorder>
                {openUserCards ? (
                  <>
                    {cards.map((item: any) => (
                      <CardBand
                        key={String(Math.random() * 2)}
                        onPress={() => setSelectedCard(item)}>
                        <View>
                          <TitleCardBand>{item.bandeira_nome}</TitleCardBand>
                          <TitleCard>Final {item.digitos_final}</TitleCard>
                        </View>
                        {/*@ts-ignore */}
                        {selectedCard?.id === item.id ? (
                          <CheckSquare
                            weight="fill"
                            size={14}
                            color={theme.colors.orange_100}
                          />
                        ) : (
                          <CheckSquare size={14} color={theme.colors.black} />
                        )}
                      </CardBand>
                    ))}
                    <WrapperButtonAddCard>
                      <ButtonAddCard
                        onPress={() => {
                          setIsModal(!isModal);
                        }}>
                        <TitleMore>+</TitleMore>
                        <TitleButtonAddCard>
                          Adicionar cartão
                        </TitleButtonAddCard>
                      </ButtonAddCard>
                    </WrapperButtonAddCard>
                  </>
                ) : null}

                <ModalCustom isOpen={isModal}>
                  <View
                    style={{
                      paddingHorizontal: 20,
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        marginVertical: 10,
                        color: theme.colors.gray_150,
                        textAlign: 'left',
                        fontSize: 24,
                        fontWeight: '500',
                      }}>
                      Adicionar novo cartão
                    </Text>

                    <CreditCardWrapper>
                      <Formik
                        initialValues={{
                          number: '',
                          cvv: '',
                          name: '',
                          expiry: '',
                          brand: '',
                        }}
                        validationSchema={CCSchema}
                        onSubmit={values => handleSaveCard(values)}>
                        {({
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          values,
                          errors,
                          isValid,
                          setFieldValue,
                          setFieldError,
                          touched,
                        }) => (
                          <>
                            <CardView
                              brand={formatCCBrand(values.brand)}
                              number={values.number}
                              cvc={values.cvv}
                              expiry={values.expiry}
                              name={values.name}
                              placeholder={{name: 'Nome'}}
                              focused={cvcFocused ? 'cvc' : ''}
                            />
                            <CardRow>
                              <CardCol>
                                <CardMaskedField
                                  autoFocus
                                  value={values.number}
                                  keyboardType="number-pad"
                                  placeholder="Número do cartão"
                                  placeholderTextColor={theme.colors.gray_150}
                                  maxLength={
                                    values.brand === 'american-express'
                                      ? 15
                                      : 16
                                  }
                                  style={{
                                    color: `${errors.number ? 'red' : 'black'}`,
                                  }}
                                  onChangeText={text => {
                                    setFieldValue('number', text);
                                    cardValidator.number(text).isValid
                                      ? null
                                      : setFieldError(
                                          'number',
                                          'Cartão inválido',
                                        );
                                    cardValidator.number(values.number)?.card
                                      ?.type
                                      ? setFieldValue(
                                          'brand',
                                          //@ts-ignore
                                          cardValidator.number(values.number)
                                            .card.type,
                                        )
                                      : setFieldValue('brand', '');
                                  }}
                                  ref={firstFieldRef}
                                  onSubmitEditing={() =>
                                    //@ts-ignore
                                    secondFieldRef.current.focus()
                                  }
                                  blurOnSubmit={false}
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
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                  ]}
                                />
                                {errors.number && touched.number && (
                                  <CardErrorText>Número inválido</CardErrorText>
                                )}
                              </CardCol>
                            </CardRow>

                            <CardRow>
                              <CardLeftCol>
                                <CardMaskedField
                                  ref={secondFieldRef}
                                  onSubmitEditing={() =>
                                    //@ts-ignore
                                    thirdFieldRef.current.focus()
                                  }
                                  blurOnSubmit={false}
                                  value={values.expiry}
                                  mask={[
                                    /\d/,
                                    /\d/,
                                    '/',
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                  ]}
                                  keyboardType="number-pad"
                                  placeholder="Data de Validade"
                                  placeholderTextColor={theme.colors.gray_150}
                                  onChangeText={(masked, unmasked) => {
                                    setFieldValue('expiry', masked);
                                    !cardValidator.expirationDate(masked, 2040)
                                      .isValid &&
                                      setFieldError('expiry', 'Data inválida');
                                  }}
                                  maxLength={
                                    values.brand === 'american-express' ? 10 : 7
                                  }
                                />
                                {errors.expiry && (
                                  <CardErrorText>
                                    Validade inválida
                                  </CardErrorText>
                                )}
                              </CardLeftCol>
                              <CardRightCol>
                                <CardField
                                  ref={thirdFieldRef}
                                  onFocus={() => setCvcFocused(true)}
                                  onBlur={() => setCvcFocused(false)}
                                  onSubmitEditing={() =>
                                    //@ts-ignore
                                    fourthFieldRef.current.focus()
                                  }
                                  blurOnSubmit={false}
                                  keyboardType="number-pad"
                                  placeholder="CVV"
                                  placeholderTextColor={theme.colors.gray_150}
                                  onChangeText={text => {
                                    setFieldValue('cvv', text);
                                  }}
                                  maxLength={
                                    values.brand === 'american-express' ? 4 : 3
                                  }
                                />
                                {errors.cvv && (
                                  <CardErrorText>CVV inválido</CardErrorText>
                                )}
                              </CardRightCol>
                            </CardRow>

                            <CardRow>
                              <CardCol>
                                <CardField
                                  ref={fourthFieldRef}
                                  blurOnSubmit={true}
                                  placeholder="Nome no cartão"
                                  placeholderTextColor={theme.colors.gray_150}
                                  onChangeText={text => {
                                    setFieldValue('name', text);
                                  }}
                                />
                              </CardCol>
                            </CardRow>

                            <Button
                              height="50px"
                              width="100%"
                              background_color={
                                loading || !isValid
                                  ? theme.colors.gray_90
                                  : theme.colors.orange
                              }
                              style={{
                                marginTop: 10,
                              }}
                              disabled={!isValid || loading}
                              onPress={() => handleSubmit()}>
                              {loading ? (
                                <ActivityIndication />
                              ) : (
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: theme.colors.white,
                                  }}>
                                  Adicionar
                                </Text>
                              )}
                            </Button>
                          </>
                        )}
                      </Formik>
                    </CreditCardWrapper>
                  </View>
                </ModalCustom>
                {/*@ts-ignore */}
                <WrapperCardBorder>
                  <TitleCard>Cartão de débito</TitleCard>
                  <CheckSquare size={14} color={theme.colors.black} />
                </WrapperCardBorder>
              </WrapperCard>
            </>
          )}
        </View>
        {typeof selectedCard !== 'undefined' ? (
          //@ts-ignore
          <Button
            style={{
              height: 50,
              width: '100%',
              backgroundColor: theme.colors.orange,
            }}
            onPress={handlePay}
            disabled={typeof selectedCard === 'undefined'}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
              }}>
              Finalizar
            </Text>
          </Button>
        ) : null}
      </WrapperButtonNext>
    </Main>
  );
}
