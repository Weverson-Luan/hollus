import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'styled-components';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ButtonTherapie} from '../../../components/ButtonTherapie';
import {CardProducts} from '../../../components/CardProducts';
import {IProducts} from '../../../dtos/products-dto';
import {ActivityIndication} from '../../../components/Spinner';
import {
  Container,
  Main,
  WrapperInput,
  WrapperIcon,
  Input,
  WrapperFilter,
  WrapperProducts,
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
  WrapperSpaceProduct,
  TitleDate,
  WrapperLocation,
  TitlePrice,
  WrapperDestaque,
  TitleLoading,
} from './styles';
import {HeaderDrawer} from '../../../components/HeaderDrawer';
//services
import {useProducts} from '../../../context/hooks/Products/useProducts';
import {Api} from '../../../services/api';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import {BalaioSVGComponent} from '../../../assets/svg/BalaioSVG';
import {
  DotsThreeOutlineVertical,
  MagnifyingGlass,
  Plus,
} from 'phosphor-react-native';

export function ScreenProducts({navigation}: any) {
  const theme = useTheme();
  const {params} = useRoute() as any;
  const navigationAuth = useNavigation();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async (params: any = null) => {
    try {
      const res = await Api.get(
        `/v1/produto/pesquisar?search=${search}${
          params ? '&categoria_id=' + params?.selectedCategory?.id : ''
        }`,
      );
      setProducts(res.data.data);
    } catch (error) {
      //error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    isFocused ? fetchProducts(params) : null;
  }, [isFocused]);
  return (
    <>
      {isLoading ? (
        <Main>
          <ActivityIndication color={theme.colors.orange} />
          <TitleLoading>Carregando...</TitleLoading>
        </Main>
      ) : (
        <>
          <Container>
            <WrapperInput>
              <WrapperIcon>
                <MagnifyingGlass size={22} color={theme.colors.gray_80} />
              </WrapperIcon>

              <Input
                placeholder="Busque um produto"
                placeholderTextColor={theme.colors.gray_80}
                onChangeText={setSearch}
                onSubmitEditing={() => fetchProducts()}
              />
              <WrapperFilter>
                <ButtonTherapie
                  width={RFValue(90) + 'px'}
                  height={RFValue(35) + 'px'}
                  background_color={theme.colors.orange}
                  border
                  isActiveColor={true}
                  onPress={() =>
                    navigationAuth.navigate('FilterProducts', params)
                  }>
                  <Plus size={22} color={theme.colors.white} />
                  <TitleFilter>Filtros</TitleFilter>
                </ButtonTherapie>
                <ButtonTherapie
                  width={RFValue(100) + 'px'}
                  height={RFValue(35) + 'px'}
                  background_color={theme.colors.orange}
                  border
                  isActiveColor={true}
                  onPress={() =>
                    navigationAuth.navigate('ShoppingCart', params)
                  }>
                  <BalaioSVGComponent
                    width={25}
                    height={25}
                    color={theme.colors.white}
                  />
                  <TitleFilter>Cesta</TitleFilter>
                </ButtonTherapie>
              </WrapperFilter>
            </WrapperInput>
            {/* <WrapperProducts>
              <FlatList
                style={{ marginTop: 8 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigationAuth.navigate("ProductSelected")}>
                    <CardProducts data={item} />
                  </TouchableOpacity>
                  )}
              />
            </WrapperProducts> */}

            {/** RECOMENDADOS */}
            {/* <WrapperRecomendads>
              <TitleRecomedados>Recomendados</TitleRecomedados>
            </WrapperRecomendads>

            <FlatList
              keyExtractor={(item) => String(item.id)}
              data={products}
              renderItem={({ item }) => (
                <WrapperContentInfo
                  onPress={() =>
                    navigationAuth.navigate("ProductSelected")
                  }
                >
                  <ImageProfile
                    source={{
                      uri: item.image,
                    }}
                  />
                  <DescriptionInfo>
                    <HeaderTitle>
                      <TitleName>{item.name}</TitleName>

                      <WrapperPonts>
                        <AntDesign
                          name="star"
                          size={14}
                          color={theme.colors.orange_100}
                        />
                        <TitlePont>5.0</TitlePont>
                      </WrapperPonts>
                    </HeaderTitle>

                    <WrapperSpaceProduct>
                      <Entypo
                        name="shop"
                        size={14}
                        color={theme.colors.gray_150}
                      />
                      <TitleDate>{item.space}</TitleDate>
                    </WrapperSpaceProduct>

                    <WrapperLocation>
                      <TitlePrice>R$ {item.price},00</TitlePrice>
                    </WrapperLocation>
                  </DescriptionInfo>

                  <Ionicons name="ellipsis-vertical" size={36} />
                </WrapperContentInfo>
              )}
            /> */}

            {/** DESTAQUES */}
            <WrapperDestaque>
              <TitleRecomedados>Destaques</TitleRecomedados>
            </WrapperDestaque>

            <FlatList
              keyExtractor={item => String(item.id)}
              data={products}
              renderItem={({item}) => (
                <WrapperContentInfo
                  onPress={() =>
                    navigationAuth.navigate('ProductSelected', {item: item})
                  }>
                  <ImageProfile
                    source={{
                      uri: item.fotos[0].foto_link,
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
                        <TitlePont>{item.nota_media}</TitlePont>
                      </WrapperPonts>
                    </HeaderTitle>

                    {/* <WrapperSpaceProduct>
                      <Entypo
                        name="shop"
                        size={14}
                        color={theme.colors.gray_150}
                      />
                      <TitleDate>{item.space}</TitleDate>
                    </WrapperSpaceProduct> */}

                    <WrapperLocation>
                      <TitlePrice>R$ {item.valor}</TitlePrice>
                    </WrapperLocation>
                  </DescriptionInfo>
                  <DotsThreeOutlineVertical size={32} />
                </WrapperContentInfo>
              )}
            />
          </Container>
        </>
      )}
    </>
  );
}
