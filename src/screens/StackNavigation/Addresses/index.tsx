import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'styled-components';
import {useNavigation, useRoute} from '@react-navigation/native';

import ModalAddress from 'react-native-modal';
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
} from './styles';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {Input} from '../../../components/Input';
import {ActivityIndication} from '../../../components/Spinner';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  deleteAddress,
  getMyAddresses,
  postSaveAddress,
} from '../../../context/hooks/Addresses/useAddresses';
import {MaskedTextInputForm} from '../../../components/Input/styles';
import axios from 'axios';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Address} from '../../../components/Modal';
import {Pencil, Trash} from 'phosphor-react-native';

export function Addresses({route, navigation}: any) {
  const theme = useTheme();
  const [addresses, setAddresses] = useState<any>();
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [unmaskedCep, setUnmaskedCep] = useState('');
  const [uf, setUf] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [addressToDelete, setAddressToDelete] = useState<Object>();
  const newAddressActionSheet = useRef<ActionSheetRef>(null);
  const deleteCardActionSheet = useRef<ActionSheetRef>(null);
  const [cardToDelete, setCardToDelete] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [modal, setModal] = useState(false);

  const teste = [
    {
      id: 1,
      logradouro: 'rua xxxxx',
      numero: 56,
      cidade: 'BELO HORIZONTE',
      estado: 'MG',
      cep: '31748-530',
    },
  ];

  const {params} = useRoute();

  async function handleGetAddresses() {
    setLoadingAddresses(true);
    const res = await getMyAddresses();
    setAddresses(res.data);
    setLoadingAddresses(false);
  }

  async function handleSaveAddress() {
    setLoading(true);
    const res = await postSaveAddress(
      logradouro,
      numero,
      complemento,
      cep,
      bairro,
      cidade,
      uf,
    );
    newAddressActionSheet.current?.hide();
    await handleGetAddresses();
  }

  const handleDeleteAddress = () => {
    // console.log(addressToDelete);
    deleteAddress(addressToDelete).then(
      () => (handleGetAddresses(), deleteCardActionSheet.current?.hide()),
    );
  };

  useEffect(() => {
    handleGetAddresses();
    setLoading(false);
    // console.log("asd");
    // console.log(route.params);
  }, []);

  const fetchCEP = async () => {
    const response = await axios
      .get('https://viacep.com.br/ws/' + cep + '/json/')
      .then(res => {
        setUf(res.data.uf);
        setLogradouro(res.data.logradouro);
        setBairro(res.data.bairro);
        setCidade(res.data.localidade);
      });
  };
  return (
    <Main>
      {loadingAddresses ? (
        <ActivityIndication />
      ) : (
        <>
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            {addresses?.length > 0 ? (
              <>
                <WrapperButtonNext>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '100%',
                    }}>
                    <FlatList
                      //@ts-ignore
                      data={addresses}
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
                        <View>
                          <View
                            style={{
                              backgroundColor: theme.colors.orange_25,
                              borderRadius: 5,
                              width: '100%',
                              height: 90,
                              flexWrap: 'wrap',
                              flexDirection: 'row',
                              paddingLeft: 8,
                              marginTop: 16,
                            }}>
                            <Text
                              style={{
                                color: 'black',
                                width: 360,
                                lineHeight: 24,
                              }}>
                              {item?.logradouro}, {item?.numero}, {item?.cidade}{' '}
                              - {item?.estado}
                              {''}
                              {item?.cep}
                            </Text>

                            <View
                              style={{
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '25%',
                                marginTop: 6,
                              }}>
                              <TouchableOpacity>
                                <Pencil size={18} color={theme.colors.white} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => (
                                  //@ts-ignore
                                  deleteCardActionSheet.current.show(),
                                  setAddressToDelete(item?.id)
                                )}>
                                <Trash size={18} color={theme.colors.white} />
                              </TouchableOpacity>
                            </View>
                          </View>

                          <TouchableOpacity
                            style={{
                              padding: 10,
                              borderRadius: 5,
                              backgroundColor: theme.colors.orange,
                              justifyContent: 'center',
                              alignContent: 'center',
                              alignItems: 'center',
                              marginTop: 10,
                            }}
                            onPress={() => {
                              navigation.navigate('ResumeRequest', {
                                address: item,
                              });
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: 'white',
                              }}>
                              Selecionar endereço
                            </Text>
                          </TouchableOpacity>
                        </View>
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
                          Excluir endereço
                        </Text>
                        <Text
                          style={{
                            marginVertical: 10,
                            color: theme.colors.gray_150,
                            textAlign: 'center',
                            fontSize: 15,
                          }}>
                          O endereço será removido da sua conta. Tem certeza?
                        </Text>

                        <Button
                          height="35px"
                          background_color={theme.colors.red}
                          style={{
                            marginTop: 50,
                            width: '50%',
                          }}
                          onPress={() => handleDeleteAddress()}>
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
                <Text>Nenhum endereço salvo ainda</Text>
              </View>
            )}

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 16,
              }}>
              <Button
                style={{
                  width: '90%',
                  height: 45,
                  backgroundColor: theme.colors.orange,
                }}
                onPress={() => {
                  // newAddressActionSheet.current?.show();
                  setModal(!modal);
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                  }}>
                  Novo endereço
                </Text>
              </Button>
            </View>
          </View>

          <ModalAddress
            animationIn={'fadeIn'}
            isVisible={modal}
            onBackdropPress={() => setModal(!modal)}>
            <Address
              visible={modal}
              onChangeCep={setCep}
              valueCep={cep}
              onChangeCity={setCidade}
              valueCity={cidade}
              onChangeLogadouro={setLogradouro}
              valueLogadouro={logradouro}
              valueDistrict={bairro}
              onChangeDistrict={setBairro}
              onChangeNumber={setNumero}
              valueNumber={numero}
              onChangeComplement={setComplemento}
              valueComplement={complemento}
              handleFetchCepAPI={() => {
                fetchCEP();
              }}
              handleSaveAndress={handleSaveAddress}
            />
          </ModalAddress>

          {/* <ActionSheet gestureEnabled ref={newAddressActionSheet}>
            <View style={{paddingHorizontal: 20, flexDirection: 'column'}}>
              <Text
                style={{
                  marginVertical: 10,
                  color: theme.colors.gray_150,
                  textAlign: 'center',
                  fontSize: 20,
                }}>
                Adicionar novo endereço
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <MaskedTextInputForm
                  style={{
                    marginVertical: 10,
                    width: 125,
                  }}
                  mask={[
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  onEndEditing={() => fetchCEP()}
                  maxLength={11}
                  keyboardType="number-pad"
                  onChangeText={(masked, unmasked) => {
                    setUnmaskedCep(unmasked), setCep(masked);
                  }}
                  value={cep}
                  placeholder="CEP"
                />
                {unmaskedCep.length == 8 && (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      position: 'absolute',
                      left: 100,
                      top: 17,
                    }}
                    onPress={() => fetchCEP()}>
                    <FontAwesome5Icon name="search" size={15} />
                  </TouchableOpacity>
                )}
                <Input
                  style={{
                    marginVertical: 10,
                    width: 200,
                  }}
                  value={cidade}
                  onChangeText={setCidade}
                  placeholder="Cidade"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <Input
                  style={{
                    marginVertical: 10,
                    width: 160,
                  }}
                  value={bairro}
                  onChangeText={setBairro}
                  placeholder="Bairro"
                />
                <Input
                  style={{
                    marginVertical: 10,
                    width: 175,
                  }}
                  onChangeText={setLogradouro}
                  value={logradouro}
                  placeholder="Logradouro"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <Input
                  style={{
                    marginVertical: 10,
                    width: 175,
                  }}
                  width={'175px'}
                  onChangeText={setComplemento}
                  placeholder="Complemento"
                  placeholderTextColor={theme.colors.gray_80}
                />

                <Input
                  style={{
                    marginVertical: 10,
                    width: 75,
                  }}
                  onChangeText={setNumero}
                  keyboardType="number-pad"
                  placeholder="Número"
                  placeholderTextColor={theme.colors.gray_80}
                />
                <Input
                  style={{
                    marginVertical: 10,
                    width: 50,
                  }}
                  maxLength={8}
                  onChangeText={setUf}
                  value={uf}
                  placeholder="UF"
                  placeholderTextColor={theme.colors.gray_80}
                />
              </View>
              {numero.length > 0 && (
                <Button
                  height="50px"
                  background_color={
                    loading ? theme.colors.white : theme.colors.orange
                  }
                  style={{
                    marginTop: 10,
                  }}
                  onPress={() => handleSaveAddress()}>
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
              )}
            </View>
          </ActionSheet> */}
        </>
      )}
    </Main>
  );
}
