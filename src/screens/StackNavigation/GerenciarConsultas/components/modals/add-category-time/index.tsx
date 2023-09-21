/**
 * IMPORTS
 */

import React from 'react';

import {
  AddCategoryCardContent,
  AddCategoryLabel,
  AddCategoryTime,
  AddCategoryTimeCard,
  AddCategoryTimeDay,
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
  WrapperRow,
} from '../../../../../../components/TherapistCategory/styles';
import DropDownPicker from 'react-native-dropdown-picker';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components';
import {Box} from '../../../../../../components/Box';
import {X} from 'phosphor-react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Input} from '../../../../../../components/Input';
import {ValueInput} from './styles';
import {Masks} from 'react-native-mask-input';
import {TitleLoading} from '../../../../Therapist/styles';

interface AddCategoriesProps {
  setOpenModal: (value: boolean) => void;
  isVisible?: boolean;
  openBeginTimePicker?: boolean;
  beginTime: any;
  onTimeChangeBegin: any;
  openEndTimePicker: boolean;
  endTime: any;
  onTimeChangeEnd: any;
  isLoading: boolean;
  openDropDown: boolean;
  selectedCategory: any;
  categoriesList: any[];
  setOpenDropdown: () => void;
  setSelectedCategory: any;
  setOpenBeginTimePicker: (value: boolean) => void;
  selectedBeginTime: any;
  formatTimeString: any;
  setOpenEndTimePicker: (value: boolean) => void;
  selectedEndTime: any;
  days: any;
  selectDay: (value: any) => void;
  setCategoryDescription: (value: string) => void;
  selectedPrice: any;
  setSelectedPrice: any;
  selectedDays: any;
  handleSubmit: () => void;
  setCategoriesList: any;
  checkDaySelected: any;
}

const AddCategorieTime = ({
  isVisible,
  setOpenModal,
  openBeginTimePicker,
  beginTime,
  onTimeChangeBegin,
  openEndTimePicker,
  endTime,
  onTimeChangeEnd,
  isLoading,
  openDropDown,
  selectedCategory,
  categoriesList,
  setOpenDropdown,
  setSelectedCategory,
  setOpenBeginTimePicker,
  selectedBeginTime,
  formatTimeString,
  setOpenEndTimePicker,
  selectedEndTime,
  days,
  selectDay,
  setCategoryDescription,
  selectedPrice,
  setSelectedPrice,
  selectedDays,
  handleSubmit,
  setCategoriesList,
  checkDaySelected,
}: AddCategoriesProps) => {
  const theme = useTheme();
  return (
    <AddCategoryTimeModal
      onRequestClose={() => setOpenModal(false)}
      visible={isVisible}
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
                <ActivityIndicator size={'large'} color={theme.colors.orange} />
                <TitleLoading>Carregando...</TitleLoading>
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
                <Box
                  width="100%"
                  height={100}
                  flexDirection="row"
                  justifyContent="center"
                  paddingLeft={16}
                  paddingRight={16}>
                  <WrapperRow>
                    <AddCategoryLabel>Horário Inicial</AddCategoryLabel>
                    <AddCategoryTimeTouchable
                      onPress={() => setOpenBeginTimePicker(true)}>
                      <AddCategoryTime>
                        {selectedBeginTime
                          ? formatTimeString(beginTime)
                          : '00:00'}
                      </AddCategoryTime>
                    </AddCategoryTimeTouchable>
                  </WrapperRow>

                  <WrapperRow>
                    <AddCategoryLabel>Horário Final</AddCategoryLabel>
                    <AddCategoryTimeTouchable
                      onPress={() => setOpenEndTimePicker(true)}>
                      <AddCategoryTime>
                        {selectedEndTime ? formatTimeString(endTime) : '00:00'}
                      </AddCategoryTime>
                    </AddCategoryTimeTouchable>
                  </WrapperRow>
                </Box>

                <Box
                  width={'100%'}
                  height={80}
                  padding={10}
                  backgroundColor="transparent">
                  <AddCategoryLabel>Dia da Semana</AddCategoryLabel>

                  <Box
                    width="100%"
                    height={40}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    paddingLeft={16}
                    paddingRight={16}>
                    {days.map((day: any, index: any) => (
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
                  </Box>
                </Box>

                <Box
                  width={'100%'}
                  height={100}
                  paddingBottom={16}
                  paddingLeft={16}
                  paddingRight={16}
                  backgroundColor="transparent">
                  <AddCategoryLabel>Particularidades</AddCategoryLabel>
                  <Input
                    color={theme.colors.white}
                    width="auto"
                    height="70px"
                    multiline
                    maxLength={300}
                    textAlignVertical="top"
                    placeholder="Escreva um pouco sobre a consulta"
                    placeholderTextColor={theme.colors.gray_80}
                    onChangeText={(text: string) =>
                      setCategoryDescription(String(text))
                    }
                  />
                </Box>

                <Box
                  width="100%"
                  height={80}
                  flexDirection={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  padding={10}>
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
                </Box>
              </>
            )}
          </AddCategoryCardContent>

          <Box
            width={'100%'}
            height={70}
            paddingLeft={12}
            paddingRight={12}
            backgroundColor={theme.colors.white}
            borderTopWidth={1}
            borderColor={theme.colors.gray_25}>
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
          </Box>
        </AddCategoryTimeCard>
      </AddCategoryTimeView>
    </AddCategoryTimeModal>
  );
};

/**
 * EXPORTS
 */
export {AddCategorieTime};
