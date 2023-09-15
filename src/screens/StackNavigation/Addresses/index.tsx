import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import {useTheme} from 'styled-components';

import axios from 'axios';
import ModalAddress from 'react-native-modal';

//components
import {Button} from '../../../components/Button';

//styled-components
import {Main, WrapperButtonNext} from './styles';

import {
  deleteAddress,
  getMyAddresses,
  postSaveAddress,
} from '../../../context/hooks/Addresses/useAddresses';

import {Address} from '../../../components/Modal';
import {Pencil, Trash} from 'phosphor-react-native';
import theme from '../../../styles/colors/theme';
import {Loading} from '../../../components/Loading';
import {AddressProps} from '../../../dtos/adress-dtis';
import useAlert from '../../../context/hooks/Alert/useAlert';

export function Addresses({navigation}: any) {
  const theme = useTheme();
  const {setAlert} = useAlert();
  const [addresses, setAddresses] = useState<any>();
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [addressToDelete, setAddressToDelete] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  async function handleGetAddresses() {
    try {
      setLoadingAddresses(true);
      const responseAdressAPI: AddressProps = await getMyAddresses();

      setAddresses(responseAdressAPI.data);
    } catch (error) {
      //tratamento de error
      setAlert(
        'Endereços',
        'Não foi possível realizar a busca de endereços feche o aplicativo e tente novamente.',
      );
    } finally {
      setLoadingAddresses(false);
    }
  }

  async function handleSaveAddress() {
    try {
      setLoading(true);
      await postSaveAddress({
        logradouro,
        numero,
        complemento,
        cep,
        bairro,
        cidade,
        uf,
      });

      setModal(false);
      setAddresses('');
      setCep('');
      setCidade('');
      setLogradouro('');
      setBairro('');
      setNumero('');
      setComplemento('');

      await handleGetAddresses();
    } catch (error) {
      // tratamento de error
      setAlert(
        'Endereços',
        'Não foi possível realizar o cadastro de endereço feche o aplicativo e tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteAddress = async () => {
    setLoading(true);
    try {
      const responseDeleteAddress = await deleteAddress(addressToDelete);
      await handleGetAddresses();
      setModalDelete(false);
      return responseDeleteAddress;
    } catch (error) {
      //tratamento de error
      setAlert(
        'Excluir',
        'Não foi possível realizar a exclusão do endereço feche o app e tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAddresses();
    setLoading(false);
  }, []);

  const fetchCEP = async () => {
    try {
      const responsefetchCep = await axios.get(
        'https://viacep.com.br/ws/' + cep + '/json/',
      );
      setUf(responsefetchCep.data.uf);
      setLogradouro(responsefetchCep.data.logradouro);
      setBairro(responsefetchCep.data.bairro);
      setCidade(responsefetchCep.data.localidade);
    } catch (error) {
      //tratamento de error
      setAlert(
        'Endereços',
        'Não foi possível realizar a buscar do cep feche o aplicativo e tente novamente.',
      );
    } finally {
      // independente se da certo ou errado.
    }
  };

  return (
    <Main>
      {loadingAddresses ? (
        <Loading />
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
                  <View style={styles.wrapperMyAddress}>
                    <Text style={styles.titleAdrres}>Meus endereços</Text>
                  </View>
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
                        <>
                          <View style={styles.wrapperContentAddress}>
                            <Text style={styles.subTextAddres}>
                              {item?.logradouro}, {item?.numero}, {item?.cidade}{' '}
                              - {item?.estado}
                              {''}
                              {item?.cep}
                            </Text>

                            <View style={styles.wrapperDeleteIcons}>
                              <TouchableOpacity
                                onPress={() => {
                                  setAlert(
                                    'Endereços',
                                    'Não foi possível realizar a buscar do cep feche o aplicativo e tente novamente.',
                                  );
                                }}>
                                <Pencil size={24} color={theme.colors.blue} />
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={{marginLeft: 16}}
                                onPress={() => {
                                  //@ts-ignore
                                  setAddressToDelete(item?.id);
                                  setModalDelete(!modalDelete);
                                }}>
                                <Trash size={24} color={theme.colors.red} />
                              </TouchableOpacity>
                            </View>
                          </View>

                          <TouchableOpacity
                            style={{
                              height: 40,
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
                            <Text style={styles.titleButtonSelectAddress}>
                              Selecionar endereço
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                    />

                    <ModalAddress
                      isVisible={modalDelete}
                      animationIn={'fadeIn'}>
                      <View style={styles.containerModalEditAdress}>
                        <Text style={styles.titleDelete}>Excluir endereço</Text>
                        <Text style={styles.subTextDescription}>
                          O endereço será removido da sua conta. Tem certeza?
                        </Text>

                        <View style={styles.footer}>
                          <Button
                            width="150px"
                            height="35px"
                            background_color={theme.colors.orange}
                            onPress={() => {
                              handleDeleteAddress();
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                color: 'white',
                              }}>
                              Excluir
                            </Text>
                          </Button>
                          <Button
                            width="150px"
                            height="35px"
                            background_color={theme.colors.orange}
                            onPress={() => {
                              handleDeleteAddress();
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                color: 'white',
                              }}>
                              Cancelar
                            </Text>
                          </Button>
                        </View>
                      </View>
                    </ModalAddress>
                  </View>
                </WrapperButtonNext>
              </>
            ) : (
              <View style={styles.noContente}>
                <Text style={styles.textNoContent}>
                  Nenhum endereço salvo ainda.
                </Text>
              </View>
            )}

            <View style={styles.wrapperButtonNewAddAddress}>
              <Button
                width="90%"
                height={'45px'}
                background_color={theme.colors.orange}
                onPress={() => {
                  setModal(!modal);
                }}>
                <Text style={styles.titleButtonAddNewAddress}>
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
              handleOnCloseModal={() => setModal(!modal)}
            />
          </ModalAddress>
        </>
      )}
    </Main>
  );
}

const styles = StyleSheet.create({
  containerModalEditAdress: {
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 8,
    borderRadius: 8,
  },
  wrapperMyAddress: {
    paddingLeft: 16,
    width: '100%',
    height: 80,
  },
  titleAdrres: {
    fontWeight: '500',
    color: theme.colors.gray_150,
    fontSize: 20,
    marginTop: 20,
  },
  subTextAddres: {
    fontSize: 16,
    color: theme.colors.gray_200,
    width: 370,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  wrapperContentAddress: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    width: '100%',
    height: 90,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingLeft: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#cdcdcd',
  },
  wrapperDeleteIcons: {
    width: '90%',
    height: 26,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 6,
  },
  titleButtonSelectAddress: {
    fontWeight: '500',
    fontSize: 18,
    color: theme.colors.white,
  },

  titleDelete: {
    fontWeight: '500',
    color: theme.colors.gray_150,
    fontSize: 20,
  },
  subTextDescription: {
    marginVertical: 10,
    color: theme.colors.gray_150,
    textAlign: 'left',
    fontSize: 15,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapperButtonNewAddAddress: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  titleButtonAddNewAddress: {
    fontWeight: '500',
    fontSize: 18,
    color: theme.colors.white,
  },
  noContente: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNoContent: {
    color: theme.colors.gray_150,
    fontSize: 16,
  },
});
