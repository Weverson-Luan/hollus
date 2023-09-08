import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import {X} from 'phosphor-react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Masks} from 'react-native-mask-input';

import RNDateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

// api
import {Api} from '../../../services/api';

// components
import {Input} from '../../../components/Input';
import {Loading} from '../../../components/Loading';
import {TherapistCategory} from '../../../components/TherapistCategory';

// context
import useAlert from '../../../context/hooks/Alert/useAlert';

// utils
import {
  formatTimeString,
  getDayOfWeekFromIndex,
} from '../../../utils/formatdate';

//styled-components
import {
  EmptyMessage,
  EmptyMessageContainer,
  AddButton,
  AddButtonText,
  AddButtonContainer,
  ValueInput,
  WrapperButton,
} from './styles';
import {
  AddCategoryCardContent,
  AddCategoryFieldWrapper,
  AddCategoryLabel,
  AddCategoryTime,
  AddCategoryTimeCard,
  AddCategoryTimeDay,
  AddCategoryTimeDaysRow,
  AddCategoryTimeDayTouchable,
  AddCategoryTimeHeader,
  AddCategoryTimeHeaderButton,
  AddCategoryTimeHeaderText,
  AddCategoryTimeModal,
  AddCategoryTimeRow,
  AddCategoryTimeSaveButton,
  AddCategoryTimeTouchable,
  AddCategoryTimeView,
  LoadingContainer,
} from '../../../components/TherapistCategory/styles';

export function GerenciarConsultas() {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const {setAlert} = useAlert();

  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedBeginTime, setSelectedBeginTime] = useState(false);
  const [beginTime, setBeginTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [openBeginTimePicker, setOpenBeginTimePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [selectedPrice, setSelectedPrice] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [openDropDown, setOpenDropdown] = useState(false);

  const fetchMyInfo = async () => {
    setLoading(true);
    clearStates();
    const {data} = await Api.get('/v1/user/pesquisar-minhas-categorias');
    // console.log(data.data);
    setCategorias(data.data);
    setLoading(false);
  };

  const parseErrors = (errors: any) => {
    const errArr = Object.values(errors).map(err => err);
    //@ts-ignore
    return errArr[0][0];
  };

  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const onTimeChangeBegin = async (event: any, selectedTime: any) => {
    if (typeof selectedTime === 'undefined') {
      setOpenBeginTimePicker(false);
      return;
    }
    if (selectedBeginTime && selectedEndTime) {
      setSelectedEndTime(false);
    }
    beginTime.setHours(selectedTime.getHours() - 3);
    beginTime.setMinutes(selectedTime.getMinutes());
    setSelectedBeginTime(true);
    setOpenBeginTimePicker(false);
  };

  const onTimeChangeEnd = async (event: any, selectedTime: any) => {
    if (typeof selectedTime === 'undefined') {
      setOpenEndTimePicker(false);
      return;
    }
    const correctedTime = new Date();
    correctedTime.setHours(selectedTime.getHours() - 3);
    correctedTime.setMinutes(selectedTime.getMinutes());

    if (selectedBeginTime && correctedTime.getTime() < beginTime.getTime()) {
      setAlert(
        'Erro',
        'Selecione um horário final para depois do horário inicial!',
      );
      return;
    }
    endTime.setHours(selectedTime.getHours() - 3);
    endTime.setMinutes(selectedTime.getMinutes());
    setSelectedEndTime(true);
    setOpenEndTimePicker(false);
  };

  const selectDay = (index: any) => {
    const dayOfWeekName = getDayOfWeekFromIndex(index);
    //@ts-ignore
    if (!selectedDays.includes(dayOfWeekName)) {
      //@ts-ignore
      setSelectedDays(selectedDays => [...selectedDays, dayOfWeekName]);
      return;
    }
    const dayRemoved = selectedDays.filter(item => item !== dayOfWeekName);
    setSelectedDays(dayRemoved);
  };

  const checkDaySelected = (index: any) => {
    const dayOfWeekName = getDayOfWeekFromIndex(index);
    //@ts-ignore
    if (selectedDays.includes(dayOfWeekName)) {
      return true;
    }
    return false;
  };

  const fetchCategories = async () => {
    const {data} = await Api.get('/v1/user/pesquisar-categorias');
    //@ts-ignore
    let arr = [];
    data.data.forEach((cat: any) => {
      arr.push({
        label: cat.nome,
        value: cat.id,
      });
    });
    //@ts-ignore
    setCategoriesList(arr);
  };

  const handleSubmit = async () => {
    setLoading(true);
    //@ts-ignore
    if (selectedCategory.length === 1) {
      Api.post('/v1/user/adicionar-categoria', {
        //@ts-ignore
        categoria_id: selectedCategory[0],
        tempo: 60,
        descricao: categoryDescription,
        horario_inicio: formatTimeString(beginTime),
        horario_fim: formatTimeString(endTime),
        dias_semana: JSON.stringify(selectedDays),
        valor: selectedPrice,
      })
        .then(res => {
          if (res.data.success) {
            fetchMyInfo();
            fetchCategories();
            setOpenModal(false);
          }
          if (res.data.error) {
            setAlert('Erro', parseErrors(res.data.error));
          }
          // console.log(res.data);
        })
        .catch(err => console.log(err));
      setLoading(false);
      return;
    }

    //@ts-ignore
    selectedCategory.forEach(selCat => {
      setIsLoading(true);
      Api.post('/v1/user/adicionar-categoria', {
        categoria_id: selCat,
        tempo: 60,
        descricao: categoryDescription,
        horario_inicio: formatTimeString(beginTime),
        horario_fim: formatTimeString(endTime),
        dias_semana: JSON.stringify(selectedDays),
        valor: selectedPrice,
      })
        .then(res => {
          if (res.data.error) {
            setAlert('Erro', parseErrors(res.data.error));
          }
        })
        .catch(err => console.log(err));
    });
    fetchMyInfo();
    fetchCategories();
    setIsLoading(false);
    setOpenModal(false);
    return;
  };

  const clearStates = () => {
    setSelectedTimes([]);
    setSelectedBeginTime(false);
    setSelectedEndTime(false);
    setEndTime(new Date());
    setBeginTime(new Date());
    setSelectedDays([]);
    setOpenBeginTimePicker(false);
    setOpenEndTimePicker(false);
    setSelectedCategory(null);
    setSelectedPrice('');
    setCategoryDescription('');
  };

  useEffect(() => {
    if (isFocused) {
      fetchMyInfo();
      fetchCategories();
    }
  }, [isFocused]);
  return (
    <>
      <AddCategoryTimeModal
        onRequestClose={() => setOpenModal(false)}
        visible={openModal}
        transparent>
        <AddCategoryTimeView>
          <AddCategoryTimeCard>
            <AddCategoryTimeHeader>
              <AddCategoryTimeHeaderText>
                Nova Categoria
              </AddCategoryTimeHeaderText>

              <AddCategoryTimeHeaderButton onPress={() => setOpenModal(false)}>
                <X size={`${RFValue(18)}px`} color={theme.colors.white} />
              </AddCategoryTimeHeaderButton>
            </AddCategoryTimeHeader>
            {openBeginTimePicker ? (
              <RNDateTimePicker
                value={beginTime}
                mode="time"
                is24Hour={true}
                onChange={onTimeChangeBegin}
              />
            ) : (
              <></>
            )}
            {openEndTimePicker ? (
              <RNDateTimePicker
                value={endTime}
                mode="time"
                is24Hour={true}
                onChange={onTimeChangeEnd}
              />
            ) : (
              <></>
            )}
            <AddCategoryCardContent showsVerticalScrollIndicator={false}>
              {isLoading ? (
                <LoadingContainer>
                  <ActivityIndicator
                    size={'large'}
                    color={theme.colors.orange}
                  />
                </LoadingContainer>
              ) : (
                <>
                  <AddCategoryTimeRow>
                    <DropDownPicker
                      open={openDropDown}
                      value={selectedCategory}
                      items={categoriesList}
                      setOpen={setOpenDropdown}
                      setValue={setSelectedCategory}
                      //@ts-ignore
                      setItems={setCategoriesList}
                      placeholder={
                        categoriesList.length > 0
                          ? 'Selecione uma categoria'
                          : 'Sem categorias disponíveis'
                      }
                      disabled={categoriesList.length === 0}
                      placeholderStyle={{textAlign: 'center'}}
                      style={{borderColor: theme.colors.gray_50}}
                      containerStyle={{width: RFValue(225)}}
                      textStyle={{textAlign: 'center'}}
                      arrowIconContainerStyle={{
                        position: 'absolute',
                        right: '5%',
                        transform: [{scale: 1.2}],
                      }}
                      selectedItemContainerStyle={{
                        backgroundColor: theme.colors.orange,
                      }}
                      dropDownContainerStyle={{
                        borderColor: theme.colors.gray_50,
                      }}
                      selectedItemLabelStyle={{color: theme.colors.white}}
                      showTickIcon={false}
                      closeOnBackPressed
                      multiple
                      mode="BADGE"
                      listMode="SCROLLVIEW"
                      showBadgeDot={false}
                      extendableBadgeContainer
                      // searchable
                      searchContainerStyle={{
                        borderColor: theme.colors.gray_50,
                      }}
                      searchTextInputStyle={{
                        borderColor: theme.colors.gray_50,
                      }}
                      itemSeparatorStyle={{
                        backgroundColor: 'red',
                        borderColor: 'red',
                      }}
                      searchPlaceholder="Pesquisar categoria..."
                    />
                  </AddCategoryTimeRow>
                  <AddCategoryTimeRow>
                    <AddCategoryFieldWrapper>
                      <AddCategoryLabel>Horário Inicial</AddCategoryLabel>
                      <AddCategoryTimeTouchable
                        onPress={() => setOpenBeginTimePicker(true)}>
                        <AddCategoryTime>
                          {selectedBeginTime
                            ? formatTimeString(beginTime)
                            : '00:00'}
                        </AddCategoryTime>
                      </AddCategoryTimeTouchable>
                    </AddCategoryFieldWrapper>

                    <AddCategoryFieldWrapper>
                      <AddCategoryLabel>Horário Final</AddCategoryLabel>
                      <AddCategoryTimeTouchable
                        onPress={() => setOpenEndTimePicker(true)}>
                        <AddCategoryTime>
                          {selectedEndTime
                            ? formatTimeString(endTime)
                            : '00:00'}
                        </AddCategoryTime>
                      </AddCategoryTimeTouchable>
                    </AddCategoryFieldWrapper>
                  </AddCategoryTimeRow>

                  <AddCategoryFieldWrapper>
                    <AddCategoryLabel>Dia da Semana</AddCategoryLabel>
                    <AddCategoryTimeDaysRow>
                      {days.map((day, index) => (
                        <AddCategoryTimeDayTouchable
                          //@ts-ignore
                          selected={checkDaySelected(index)}
                          onPress={() => selectDay(index)}
                          key={index}>
                          <AddCategoryTimeDay
                            //@ts-ignore
                            selected={checkDaySelected(index)}>
                            {day}
                          </AddCategoryTimeDay>
                        </AddCategoryTimeDayTouchable>
                      ))}
                    </AddCategoryTimeDaysRow>
                  </AddCategoryFieldWrapper>

                  <AddCategoryFieldWrapper>
                    <AddCategoryLabel>Particularidades</AddCategoryLabel>
                    <Input
                      color={theme.colors.white}
                      width="auto"
                      height="auto"
                      multiline
                      maxLength={300}
                      textAlignVertical="top"
                      placeholder="Escreva um pouco sobre a consulta"
                      onChangeText={setCategoryDescription}
                    />
                  </AddCategoryFieldWrapper>

                  <AddCategoryFieldWrapper>
                    <AddCategoryLabel>Valor da Consulta</AddCategoryLabel>
                    <ValueInput
                      value={selectedPrice}
                      placeholder="R$ 000,00"
                      maxLength={12}
                      blurOnSubmit
                      onChangeText={(masked, unmasked) => {
                        setSelectedPrice(unmasked);
                      }}
                      placeholderTextColor={theme.colors.gray_80}
                      keyboardType="number-pad"
                      mask={Masks.BRL_CURRENCY}
                      autoCorrect={false}
                    />
                  </AddCategoryFieldWrapper>
                </>
              )}
            </AddCategoryCardContent>

            <WrapperButton>
              <AddCategoryTimeSaveButton
                disabled={
                  isLoading ||
                  !selectedBeginTime ||
                  !selectedEndTime ||
                  selectedDays.length === 0 ||
                  typeof selectedCategory === 'undefined' ||
                  selectedPrice === ''
                }
                onPress={handleSubmit}>
                <AddCategoryTime>Salvar</AddCategoryTime>
              </AddCategoryTimeSaveButton>
            </WrapperButton>
          </AddCategoryTimeCard>
        </AddCategoryTimeView>
      </AddCategoryTimeModal>
      {loading ? (
        <Loading />
      ) : categorias?.length === 0 ? (
        <EmptyMessageContainer>
          <EmptyMessage>Sem horários ainda</EmptyMessage>
        </EmptyMessageContainer>
      ) : (
        <FlatList
          data={categorias}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TherapistCategory refresh={fetchMyInfo} data={item} />
          )}
        />
      )}
      {categoriesList.length > 0 ? (
        <AddButtonContainer>
          <AddButton onPress={() => setOpenModal(true)}>
            <AddButtonText>Adicionar</AddButtonText>
          </AddButton>
        </AddButtonContainer>
      ) : null}
    </>
  );
}
