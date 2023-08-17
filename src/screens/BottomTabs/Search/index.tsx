import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import {useTheme} from 'styled-components';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {
  DotsThreeOutlineVertical,
  MapPin,
  MagnifyingGlass,
  Plus,
  CaretLeft,
} from 'phosphor-react-native';

import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ButtonTherapie} from '../../../components/ButtonTherapie';

// import EndPointTherapists from '../../../services/mirajeJs/index';

import {
  Cotainer,
  Main,
  WrapperInput,
  WrapperIcon,
  Input,
  WrapperFilter,
  TitleFilter,
  WrapperRecomendads,
  TitleRecomedados,
  WrapperContentInfo,
  ImageProfile,
  DescriptionInfo,
  HeaderTitle,
  WrapperPonts,
  TitlePont,
  TitleName,
  WrapperDate,
  TitleDate,
  WrapperLocation,
  TitleLocation,
  WrapperDestaque,
  WrapperSpace,
  ClearFilter,
  WrapperInputRow,
  ContainerLoading,
  ContentLoading,
  TitleLoading,
} from './styles';
import {IUserTherapists} from '../../../dtos/therepies-user-dto';
import {ActivityIndication} from '../../../components/Spinner';
import {getFilteredSearch} from '../../../context/hooks/Filter/useFilter';
import {ISpotlight} from '../../../dtos/spotlight-dto';
import useAlert from '../../../context/hooks/Alert/useAlert';

export function ScreenSearch({route, navigation}: any) {
  const WindowHeight = Dimensions.get('window').height;
  const theme = useTheme();
  const params = route.params;
  const isFocused = useIsFocused();
  const [therapists, setTherapists] = useState<IUserTherapists | any>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [generalInfo, setGeneralInfo] = useState<ISpotlight | any>();
  const [searched, setSearched] = useState(false);
  const {setAlert} = useAlert();

  const search = async () => {
    try {
      const response = await getFilteredSearch(
        params?.cat?.id,
        searchTerm,
        params?.order,
        params?.orderDistance,
      );

      setGeneralInfo(response.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, [isFocused]);
  return (
    <>
      {isLoading ? (
        <ContainerLoading>
          <ContentLoading>
            <ActivityIndication color={theme.colors.orange} />
            <TitleLoading>Carregando...</TitleLoading>
          </ContentLoading>
        </ContainerLoading>
      ) : (
        <>
          <Cotainer>
            {/* <HeaderDrawer navigation={navigation} /> */}
            <WrapperInput>
              <WrapperInputRow>
                <WrapperIcon>
                  <MagnifyingGlass size={22} color={theme.colors.gray_80} />
                </WrapperIcon>

                <Input
                  placeholder="Busque uma terapia, um profissional ou local"
                  placeholderTextColor={theme.colors.gray_80}
                  onChangeText={e => setSearchTerm(e)}
                  defaultValue={searchTerm}
                  onSubmitEditing={() => search()}
                />
              </WrapperInputRow>
              <WrapperFilter>
                <ButtonTherapie
                  width="90px"
                  height="40px"
                  background_color={theme.colors.orange}
                  border
                  isActiveColor={true}
                  onPress={() =>
                    navigation.navigate('Filter', {
                      cat: params?.cat,
                      order: params?.order,
                      search: searchTerm,
                      type: params?.type,
                    })
                  }>
                  <Plus size={22} color={theme.colors.white} />
                  <TitleFilter>Filtros</TitleFilter>
                </ButtonTherapie>
                {typeof params?.cat !== 'undefined' && (
                  <ButtonTherapie
                    width="75%"
                    height="40px"
                    background_color={theme.colors.white}
                    border
                    isActiveColor={true}
                    style={{marginHorizontal: 10}}
                    onPress={() => {
                      typeof params.cat !== 'undefined'
                        ? (params.cat = undefined)
                        : null;
                      setSearchTerm('');
                      search();
                    }}>
                    <Entypo
                      name="trash"
                      size={22}
                      color={theme.colors.gray_90}
                    />
                    <ClearFilter style={{}}>
                      {params?.cat
                        ? 'Limpar (' + params?.cat?.nome + ')'
                        : 'Limpar'}
                    </ClearFilter>
                  </ButtonTherapie>
                )}
              </WrapperFilter>
            </WrapperInput>

            {/** RECOMENDADOS */}
            {!searched && generalInfo?.terapeutas?.length > 0 && (
              <>
                <WrapperRecomendads>
                  <TitleRecomedados>Recomendados</TitleRecomedados>
                </WrapperRecomendads>

                <FlatList
                  data={generalInfo?.terapeutas}
                  keyExtractor={item => String(item?.id)}
                  style={{height: WindowHeight / 3}}
                  renderItem={({item}: any) => (
                    <WrapperContentInfo
                      onPress={() =>
                        navigation.navigate('Therapist', {
                          therapist_id: item.id,
                          cat: params?.cat,
                        })
                      }>
                      <ImageProfile
                        source={{
                          uri: item.link_foto
                            ? item.link_foto
                            : 'https://novakart.com.br/wp-content/uploads/2021/05/imagem-nao-disponivel.jpg',
                        }}
                      />
                      <DescriptionInfo>
                        <HeaderTitle>
                          <TitleName>{item.nome}</TitleName>
                        </HeaderTitle>

                        <WrapperLocation>
                          <MapPin size={14} color={theme.colors.gray_150} />
                          <TitleLocation>
                            {item?.espaco?.nome ?? 'Sem informação'}
                          </TitleLocation>
                        </WrapperLocation>
                      </DescriptionInfo>

                      <DotsThreeOutlineVertical size={32} />
                    </WrapperContentInfo>
                  )}
                />
              </>
            )}

            {/** TERAPEUTAS */}
            {searched && therapists.terapeutas.length > 0 && (
              <>
                <WrapperRecomendads>
                  <TitleRecomedados>Terapeutas</TitleRecomedados>
                </WrapperRecomendads>

                <FlatList
                  data={therapists.terapeutas}
                  keyExtractor={item => String(item?.id)}
                  renderItem={({item}) => (
                    <WrapperContentInfo
                      onPress={() =>
                        navigation.navigate('Therapist', {
                          therapist_id: item.id,
                          cat: params?.cat,
                        })
                      }>
                      <ImageProfile
                        source={{
                          uri: item.link_foto,
                        }}
                      />
                      <DescriptionInfo>
                        <HeaderTitle>
                          <TitleName>{item.nome}</TitleName>
                        </HeaderTitle>

                        <WrapperLocation>
                          <Entypo
                            name="location-pin"
                            size={14}
                            color={theme.colors.gray_150}
                          />
                          <TitleLocation style={{}}>
                            {item?.espaco?.nome}
                          </TitleLocation>
                        </WrapperLocation>
                      </DescriptionInfo>

                      <Ionicons name="ellipsis-vertical" size={36} />
                    </WrapperContentInfo>
                  )}
                />
              </>
            )}

            {/** DESTAQUES */}
            {!searched && generalInfo?.destaques?.length > 0 && (
              <>
                <WrapperDestaque>
                  <TitleRecomedados>Destaques</TitleRecomedados>
                </WrapperDestaque>
                <FlatList
                  data={generalInfo?.destaques}
                  keyExtractor={item => String(item?.id)}
                  renderItem={({item}) => (
                    <WrapperContentInfo>
                      <ImageProfile
                        source={{
                          uri: item.link_foto,
                        }}
                      />
                      <DescriptionInfo>
                        <HeaderTitle>
                          <TitleName>{item.nome}</TitleName>

                          <WrapperPonts>
                            <AntDesign
                              name="star"
                              size={14}
                              color={theme.colors.orange_100}
                            />
                            <TitlePont>5.0</TitlePont>
                          </WrapperPonts>
                        </HeaderTitle>

                        <WrapperLocation>
                          <Entypo
                            name="location-pin"
                            size={14}
                            color={theme.colors.gray_150}
                          />
                          <TitleLocation>Espaço Terapeuta solar</TitleLocation>
                        </WrapperLocation>
                      </DescriptionInfo>

                      <Ionicons name="ellipsis-vertical" size={36} />
                    </WrapperContentInfo>
                  )}
                />
              </>
            )}

            {/** ESPAÇOS */}
            {!searched && generalInfo?.espacos?.length > 0 && (
              <>
                <WrapperSpace>
                  <TitleRecomedados>Espaços</TitleRecomedados>
                </WrapperSpace>
                <FlatList
                  data={generalInfo?.espacos}
                  keyExtractor={item => String(item?.id)}
                  renderItem={({item}) => (
                    <WrapperContentInfo>
                      <ImageProfile
                        source={{
                          uri: item?.link_logo,
                        }}
                      />
                      <DescriptionInfo>
                        <HeaderTitle>
                          <TitleName>{item?.nome_fantasia}</TitleName>
                        </HeaderTitle>

                        <WrapperLocation>
                          <MapPin size={14} color={theme.colors.gray_150} />
                          <TitleLocation>Espaço Terapeuta solar</TitleLocation>
                        </WrapperLocation>
                      </DescriptionInfo>

                      <DotsThreeOutlineVertical size={32} />
                    </WrapperContentInfo>
                  )}
                />
              </>
            )}

            {/** ESPAÇOS BUSCADOS */}
            {searched && therapists?.espacos?.length > 0 && (
              <>
                <WrapperSpace>
                  <TitleRecomedados style={{}}>Espaços</TitleRecomedados>
                </WrapperSpace>
                <FlatList
                  data={therapists?.espacos}
                  keyExtractor={item => String(item?.id)}
                  renderItem={({item}) => (
                    <WrapperContentInfo>
                      <ImageProfile
                        source={{
                          uri: item?.link_logo,
                        }}
                      />
                      <DescriptionInfo>
                        <HeaderTitle>
                          <TitleName style={{}}>
                            {item?.nome_fantasia}
                          </TitleName>
                        </HeaderTitle>

                        <WrapperLocation>
                          <Entypo
                            name="location-pin"
                            size={14}
                            color={theme.colors.gray_150}
                          />
                          <TitleLocation style={{}}>
                            Espaço Terapeuta solar
                          </TitleLocation>
                        </WrapperLocation>
                      </DescriptionInfo>

                      <Ionicons name="ellipsis-vertical" size={36} />
                    </WrapperContentInfo>
                  )}
                />
              </>
            )}

            {searched &&
              therapists?.espacos?.length === 0 &&
              therapists?.terapeutas?.length === 0 && (
                <View
                  style={{
                    height: '65%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      color: theme.colors.gray_150,
                      width: '50%',
                      textAlign: 'center',
                    }}>
                    Nenhum resultado encontrado para a pesquisa realizada
                  </Text>
                </View>
              )}
          </Cotainer>
        </>
      )}
    </>
  );
}
