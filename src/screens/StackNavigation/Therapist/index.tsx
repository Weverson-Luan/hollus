import React, {useState, useEffect} from 'react';
import {useTheme} from 'styled-components';
import {
  Alert,
  FlatList,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';

import {Button} from '../../../components/Button';
import {
  Container,
  Content,
  ImageTherapist,
  WrapperInfo,
  Title,
  WrapperHeader,
  ContentSpots,
  TitleSpots,
  WrapperAbout,
  TitleAbout,
  SubTitleAbout,
  WrapperExperience,
  TitleExperience,
  SubTitleExperience,
  WrapperAcademicFormation,
  TitleAcademicFormation,
  SubTitleAcademicFormation,
  WrapperLocation,
  WrapperLocationHeader,
  WrapperLocationIcon,
  TitleLocationMap,
  TitleLocation,
  SubTitleLocation,
  WrapperAboutQuery,
  TitleAboutQuery,
  SubTitleAboutQuery,
  WrapperClassification,
  TitleClassification,
  WrapperClassificationHeader,
  ContentClassification,
  WrapperClassificationIcon,
  SubTitleClassification,
  SubTitleClassificationPont,
  TitleComment,
  WrapperComment,
  WrapperCommentHeader,
  ImageUserComment,
  WrapperCommentInfo,
  SubTitleComment,
  WrapperDescription,
  DescriptionTextComment,
  WrapperButton,
  TextButton,
  Row,
  CategoryIcon,
  WrapperCategories,
  RowExpand,
  Col,
  CategoriesList,
  ContainerLoading,
  ContentLoading,
  TitleLoading,
} from './styles';

import {getTherapistData} from '../../../context/hooks/Therapist/useTherapist';
import {ActivityIndication} from '../../../components/Spinner';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import useAlert from '../../../context/hooks/Alert/useAlert';
import MandalaSVG from '../../../assets/svg/mandala.svg';

export function Therapist({navigation, route}: any) {
  const theme = useTheme();

  const [therapistInfo, setTherapistInfo] = useState<ITherapist | any>();
  const [loading, setLoading] = useState(true);
  const [expandCategories, setExpandCategories] = useState(false);

  const [messageError, setMessageError] = useState('');

  async function handleGetData() {
    try {
      const res = await getTherapistData(Number(route.params.therapist_id));

      // caso api não retorne um data e por que tivemos um problema interno
      if (res.data) {
        // console.log('res.data', res.data);
        setTherapistInfo(res.data);
      } else {
        console.log('res.data', res);
        setMessageError('Problemas interno, feche o app e tente novamente.');
      }
    } catch (error) {
      setMessageError('Problemas interno, feche o app e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const {setAlert} = useAlert();

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <>
      {loading ? (
        <ContainerLoading>
          <ContentLoading>
            <ActivityIndication color={theme.colors.orange} />
            <TitleLoading>Carregando...</TitleLoading>
          </ContentLoading>
        </ContainerLoading>
      ) : (
        <>
          {messageError ? (
            <ContainerLoading>
              <TitleLoading>{messageError}</TitleLoading>
            </ContainerLoading>
          ) : (
            <Container>
              <Content>
                <ImageTherapist
                  source={{
                    uri:
                      therapistInfo?.link_foto ??
                      'https://novakart.com.br/wp-content/uploads/2021/05/imagem-nao-disponivel.jpg',
                  }}
                />
                <WrapperInfo>
                  <WrapperHeader>
                    <Title>{therapistInfo?.nome}</Title>

                    <ContentSpots>
                      <TitleSpots>3</TitleSpots>

                      <MandalaSVG width={30} height={30} />
                      <MandalaSVG width={30} height={30} />
                      <MandalaSVG width={30} height={30} />
                    </ContentSpots>
                  </WrapperHeader>

                  <WrapperAbout>
                    <TitleAbout>Sobre o terapeuta</TitleAbout>
                    <SubTitleAbout>{therapistInfo?.sobre}</SubTitleAbout>
                  </WrapperAbout>

                  <WrapperExperience>
                    <TitleExperience>Experiências</TitleExperience>
                    <SubTitleExperience>
                      {therapistInfo?.experiencias}
                    </SubTitleExperience>
                  </WrapperExperience>

                  <WrapperAcademicFormation>
                    <TitleAcademicFormation>Formação</TitleAcademicFormation>
                    <SubTitleAcademicFormation>
                      {therapistInfo?.formacao}
                    </SubTitleAcademicFormation>
                  </WrapperAcademicFormation>

                  <WrapperLocation>
                    <WrapperLocationHeader>
                      <TitleLocation>Localização</TitleLocation>
                      {therapistInfo?.lat !== null &&
                      therapistInfo?.long !== null ? (
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(
                              `google.navigation:q=${therapistInfo?.lat}+${therapistInfo?.long}`,
                            ).catch(() =>
                              setAlert(
                                'Erro ao abrir o mapa',
                                'Verifique se o dispositivo possui um aplicativo de navegação instalado.',
                              ),
                            )
                          }>
                          <TitleLocationMap>Ver no mapa</TitleLocationMap>
                        </TouchableOpacity>
                      ) : null}
                    </WrapperLocationHeader>
                    <SubTitleLocation>
                      {therapistInfo?.endereco_completo}
                    </SubTitleLocation>

                    <SubTitleLocation>
                      {therapistInfo?.endereco}
                    </SubTitleLocation>
                  </WrapperLocation>

                  <WrapperAboutQuery>
                    <TitleAboutQuery>Sobre a consulta</TitleAboutQuery>
                    <SubTitleAboutQuery>
                      {therapistInfo?.sobre_consulta ?? 'Sem informação'}
                    </SubTitleAboutQuery>
                  </WrapperAboutQuery>
                  <WrapperCategories>
                    <TitleAboutQuery>Terapias oferecidas</TitleAboutQuery>
                    <CategoriesList>
                      <Col>
                        {therapistInfo?.categorias
                          .slice(
                            0,
                            expandCategories
                              ? therapistInfo?.categorias.length
                              : 2,
                          )
                          .map((category: any) => (
                            <Col key={category.id}>
                              <Row>
                                <CategoryIcon name="dot-circle" />
                                <Text
                                  style={{
                                    color: theme.colors.gray_150,
                                  }}>
                                  {category.nome}
                                </Text>
                              </Row>
                            </Col>
                          ))}
                        {therapistInfo?.categorias.length > 2 ? (
                          <RowExpand>
                            <TouchableOpacity
                              onPress={() =>
                                setExpandCategories(!expandCategories)
                              }>
                              <Text>
                                {expandCategories
                                  ? 'Mostrar menos'
                                  : 'Mostrar tudo'}{' '}
                                <FontAwesome5Icon
                                  name={
                                    expandCategories ? 'caret-up' : 'caret-down'
                                  }
                                />
                              </Text>
                            </TouchableOpacity>
                          </RowExpand>
                        ) : null}
                      </Col>
                    </CategoriesList>
                  </WrapperCategories>

                  <>
                    <TitleComment>Comentários</TitleComment>
                    <WrapperCommentInfo>
                      <WrapperComment>
                        <ImageUserComment
                          source={{
                            uri: 'https://s3-sa-east-1.amazonaws.com/doctoralia.com.br/doctor/b54941/b5494173c4942a21e97bd0baf3fdc756_large.jpg',
                          }}
                        />

                        <WrapperCommentHeader>
                          <TitleComment>Luann Sousa</TitleComment>
                          <SubTitleComment>
                            Avaliação em 18/02/2022
                          </SubTitleComment>
                        </WrapperCommentHeader>
                      </WrapperComment>

                      <WrapperDescription>
                        <DescriptionTextComment>
                          O profissional Pedro Gabriel e um fantàstico, me
                          ajudou a curar todas as minhas dores nas costas.
                          Recomendo uma consulta com ele para todos.
                        </DescriptionTextComment>
                      </WrapperDescription>
                    </WrapperCommentInfo>
                  </>
                </WrapperInfo>

                <WrapperButton>
                  <Button
                    width="100%"
                    height="50px"
                    background_color={
                      therapistInfo?.categorias.length === 0
                        ? theme.colors.gray_50
                        : theme.colors.orange
                    }
                    disabled={therapistInfo?.categorias.length === 0}
                    onPress={() =>
                      navigation.navigate('ScheduleAppointment1', {
                        therapist: therapistInfo,
                        cat: route.params.cat,
                      })
                    }>
                    <TextButton>Agendar consulta</TextButton>
                  </Button>
                </WrapperButton>
              </Content>
            </Container>
          )}
        </>
      )}
    </>
  );
}
