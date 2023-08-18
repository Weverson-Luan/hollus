import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';

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
  CardBand,
  TitleCard,
  TitleCardBand,
  CreditCardWrapper,
  CardField,
  CardRow,
  CardCol,
  CardLeftCol,
  CardRightCol,
  CardErrorText,
  CardMaskedField,
} from './styles';
import {
  deleteCard,
  getCards,
  postPayment,
  postSaveCard,
} from '../../../context/hooks/Payment/usePayment';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {Input} from '../../../components/Input';
import {ScrollView} from 'react-native-gesture-handler';
import {Ball} from '../../../components/Header/styles';
import {ActivityIndication} from '../../../components/Spinner';
import {RFValue} from 'react-native-responsive-fontsize';
import {CardView} from 'react-native-credit-card-input';
import cardValidator from 'card-validator';
import {Formik} from 'formik';
import {CCSchema} from './Schema';

export function PaymentInfo({route, navigation}) {
  const theme = useTheme();
  const [cards, setCards] = useState<Object>();
  const [cardInfo, setCardInfo] = useState();
  const [name, setName] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);
  const newCardActionSheet = useRef<ActionSheetRef>(null);
  const deleteCardActionSheet = useRef<ActionSheetRef>(null);
  const [cardToDelete, setCardToDelete] = useState();
  const [loading, setLoading] = useState(false);
  const firstFieldRef = useRef(null);
  const secondFieldRef = useRef(null);
  const thirdFieldRef = useRef(null);
  const fourthFieldRef = useRef(null);
  const [cvcFocused, setCvcFocused] = useState(false);

  async function handleGetCards() {
    const res = await getCards();
    setCards(res.data);
  }

  async function handleSaveCard(values) {
    setLoading(true);
    const res = await postSaveCard(values);
    newCardActionSheet.current?.hide();
    handleGetCards();
    setLoading(false);
  }

  async function handleDeleteCard() {
    deleteCard(cardToDelete?.id).then(() => {
      handleGetCards();
      deleteCardActionSheet.current?.hide();
    });
  }

  const formatCCBrand = brand => {
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
    setLoading(false);
    // console.log("asd");
    // console.log(route.params);
  }, []);

  return (
    <Main>
      <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
        {cards?.length > 0 ? (
          <>
            <WrapperButtonNext>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  flexDirection: 'column',
                  width: '100%',
                }}>
                {/* <Button
          width="100%"
          height="45px"
          background_color={theme.colors.white}
          border
          activeOpacity={0.7}
        >
          <Title>Pix</Title>
        </Button> */}

                <Title style={{marginBottom: 10, textAlign: 'center'}}>
                  Cartões salvos
                </Title>
                <FlatList
                  data={cards}
                  scrollEnabled
                  keyExtractor={item => item?.id}
                  style={{
                    height: '100%',
                    width: '100%',
                    marginVertical: 10,
                  }}
                  contentContainerStyle={{
                    alignItems: 'center',
                  }}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => (
                        setCardToDelete(item),
                        deleteCardActionSheet.current.show()
                      )}>
                      <CardView
                        brand={formatCCBrand(item?.bandeira_nome)}
                        number={`**** **** **** ${item?.digitos_final}`}
                        // cvc={values.cvv}
                        // expiry={values.expiry}
                        // name={values.name}
                        placeholder={{name: ''}}
                      />
                    </TouchableOpacity>
                    // <CardBand
                    //   onPress={() => (
                    //     setCardToDelete(item),
                    //     deleteCardActionSheet.current.show()
                    //   )}
                    //   style={{
                    //     marginVertical: 10,
                    //     height: 175,
                    //     width: 300,
                    //   }}
                    // >
                    //   <View>
                    //     <TitleCard>
                    //       **** **** **** {item?.digitos_final}
                    //     </TitleCard>
                    //   </View>
                    //   <View style={{ height: "75%" }}>
                    //     <TitleCardBand style={{ textAlign: "right" }}>
                    //       {item?.bandeira_nome}
                    //     </TitleCardBand>
                    //   </View>
                    // </CardBand>
                  )}
                />
                <ActionSheet gestureEnabled ref={deleteCardActionSheet}>
                  <View
                    style={{
                      paddingHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        marginVertical: 10,
                        color: theme.colors.gray_150,
                        textAlign: 'center',
                        fontSize: 20,
                      }}>
                      Excluir cartão
                    </Text>
                    <Text
                      style={{
                        marginVertical: 10,
                        color: theme.colors.gray_150,
                        textAlign: 'center',
                        fontSize: 15,
                      }}>
                      O cartão será removido da sua conta. Tem certeza?
                    </Text>
                    <CardBand
                      style={{
                        marginVertical: 10,
                        height: 175,
                        width: 300,
                      }}>
                      <View>
                        <TitleCard>
                          **** **** **** {cardToDelete?.digitos_final}
                        </TitleCard>
                      </View>
                      <View style={{height: '75%'}}>
                        <TitleCardBand style={{textAlign: 'right'}}>
                          {cardToDelete?.bandeira_nome}
                        </TitleCardBand>
                      </View>
                    </CardBand>
                    <Button
                      height="35px"
                      background_color={theme.colors.red}
                      style={{
                        marginTop: 50,
                        width: '50%',
                      }}
                      onPress={() => handleDeleteCard()}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                        }}>
                        Remover
                      </Text>
                    </Button>
                  </View>
                </ActionSheet>
              </View>
            </WrapperButtonNext>
          </>
        ) : (
          <View
            style={{
              height: '90%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Nenhum cartão salvo ainda</Text>
          </View>
        )}
        <Button
          style={{
            height: '7%',
            width: '100%',
            backgroundColor: theme.colors.orange,
            marginBottom: RFValue(20),
          }}
          onPress={() => {
            newCardActionSheet.current?.show();
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
            }}>
            Adicionar cartão
          </Text>
        </Button>
      </View>
      <ActionSheet gestureEnabled ref={newCardActionSheet}>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'column',
          }}>
          <Text
            style={{
              marginVertical: 10,
              color: theme.colors.gray_150,
              textAlign: 'center',
              fontSize: 20,
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
                    placeholder={{name: 'Nome', expiry: 'MM/AA'}}
                    labels={{name: 'Nome', expiry: 'MES/ANO'}}
                    focused={cvcFocused ? 'cvc' : ''}
                  />
                  <CardRow>
                    <CardCol>
                      <CardMaskedField
                        autoFocus
                        value={values.number}
                        keyboardType="number-pad"
                        placeholder="Número do cartão"
                        maxLength={
                          values.brand === 'american-express' ? 19 : 20
                        }
                        style={{color: `${errors.number ? 'red' : 'black'}`}}
                        onChangeText={text => {
                          setFieldValue('number', text);
                          cardValidator.number(text).isValid
                            ? null
                            : setFieldError('number', 'Cartão inválido');
                          cardValidator.number(values.number)?.card?.type
                            ? setFieldValue(
                                'brand',
                                cardValidator.number(values.number).card.type,
                              )
                            : setFieldValue('brand', '');
                        }}
                        ref={firstFieldRef}
                        onSubmitEditing={() => secondFieldRef.current.focus()}
                        blurOnSubmit={false}
                        mask={[
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          ' ',
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          ' ',
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          ' ',
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
                        onSubmitEditing={() => thirdFieldRef.current.focus()}
                        blurOnSubmit={false}
                        value={values.expiry}
                        mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                        keyboardType="number-pad"
                        placeholder="Validade"
                        onChangeText={(masked, unmasked) => {
                          setFieldValue('expiry', masked);
                          !cardValidator.expirationDate(masked, 2040).isValid &&
                            setFieldError('expiry', 'Data inválida');
                          // (values.brand === "american-express" ||
                          //   values.brand === "diners-club") &&
                          // values.expiry.length < 10
                          //   ? setFieldError("expiry", "Data inválida")
                          //   : null;
                        }}
                        maxLength={values.brand === 'american-express' ? 10 : 7}
                      />
                      {errors.expiry && (
                        <CardErrorText>Validade inválida</CardErrorText>
                      )}
                    </CardLeftCol>
                    <CardRightCol>
                      <CardField
                        ref={thirdFieldRef}
                        onFocus={() => setCvcFocused(true)}
                        onBlur={() => setCvcFocused(false)}
                        onSubmitEditing={() => fourthFieldRef.current.focus()}
                        blurOnSubmit={false}
                        keyboardType="number-pad"
                        placeholder="CVV"
                        onChangeText={text => {
                          setFieldValue('cvv', text);
                        }}
                        maxLength={values.brand === 'american-express' ? 4 : 3}
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
                        placeholder="Nome"
                        onChangeText={text => {
                          setFieldValue('name', text);
                        }}
                      />
                    </CardCol>
                  </CardRow>
                  {isValid ? (
                    <Button
                      height="50px"
                      width="100%"
                      background_color={
                        loading || !isValid
                          ? theme.colors.white
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
                  ) : null}
                </>
              )}
            </Formik>
          </CreditCardWrapper>
        </View>
      </ActionSheet>
    </Main>
  );
}
