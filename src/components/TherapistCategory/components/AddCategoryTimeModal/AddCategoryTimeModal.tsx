/**
 * IMPORTS
 */

import React, {useState} from 'react';
import {useTheme} from 'styled-components/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {ActivityIndicator} from 'react-native';
import {X} from 'phosphor-react-native';

// components
import {Box} from '../../../Box';

// api services
import {Api} from '../../../../services/api';

// contexto
import {useTherapist} from '../../../../context/hooks/Therapist/useTherapist';

// utils
import {formatTimeString} from '../../../../utils/formatdate';

// typings
import {IAddCategoryTimeModalProps} from './interface';

// styles
import {
  CategoryTimeModal,
  AddCategoryTimeView,
  AddCategoryTimeHeader,
  AddCategoryTimeHeaderText,
  AddCategoryTimeHeaderButton,
  CategoryTextLoding,
  AddCategoryLabel,
  AddCategoryTimeSaveButton,
  AddCategoryTimeTouchable,
  AddCategoryTime,
  AddCategoryFieldWrapper,
  AddCategoryTimeDaysRow,
  AddCategoryTimeDayTouchable,
  AddCategoryTimeDay,
} from './styles';

const AddCategoryTimeModal = ({
  selectedBeginTime,
  openModal,
  openBeginTimePicker,
  beginTime,
  onTimeChangeBegin,
  openEndTimePicker,
  endTime,
  onTimeChangeEnd,
  setOpenBeginTimePicker,
  setOpenEndTimePicker,
  selectedEndTime,
  selectDay,
  selectedDays,
  checkDaySelected,
  terapeuta_categoria_id,
  AddCategoryCleanState,
  days,
  setOpenModal,
}: IAddCategoryTimeModalProps) => {
  const theme = useTheme();
  const {handleGetTherapistInfo} = useTherapist();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddingANewSchedule = async () => {
    try {
      setIsLoading(true);
      //resposta da criação
      const responseAddHours = await Api.post('v1/user/horario/adicionar', {
        dia_semana: JSON.stringify(selectedDays),
        horario_inicio: formatTimeString(beginTime),
        horario_fim: formatTimeString(endTime),
        terapeuta_categoria_id,
      });

      if (responseAddHours.data.success) {
        setOpenModal(false);
        handleGetTherapistInfo();
        AddCategoryCleanState();
        return;
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }

    return;
  };

  return (
    <CategoryTimeModal
      onRequestClose={() => setOpenModal(false)}
      visible={openModal}
      transparent>
      <AddCategoryTimeView>
        <Box
          backgroundColor={theme.colors.white}
          borderRadius={8}
          width="350px"
          height="250px">
          <AddCategoryTimeHeader>
            <AddCategoryTimeHeaderText>Novo Horário</AddCategoryTimeHeaderText>
            <AddCategoryTimeHeaderButton onPress={() => setOpenModal(false)}>
              <X size={16} color={theme.colors.white} />
            </AddCategoryTimeHeaderButton>
          </AddCategoryTimeHeader>
          {openBeginTimePicker && (
            <RNDateTimePicker
              value={beginTime}
              mode="time"
              is24Hour={true}
              onChange={onTimeChangeBegin}
            />
          )}
          {openEndTimePicker && (
            <RNDateTimePicker
              value={endTime}
              mode="time"
              is24Hour={true}
              onChange={onTimeChangeEnd}
            />
          )}
          {isLoading ? (
            <Box
              width="100%"
              height={'400px'}
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              paddingTop={4}>
              <ActivityIndicator size={'small'} color={theme.colors.orange} />
              <CategoryTextLoding>Carregando...</CategoryTextLoding>
            </Box>
          ) : (
            <>
              <Box
                width="100%"
                height={'60px'}
                justifyContent="center"
                flexDirection="row"
                paddingTop={8}
                paddingLeft={16}
                paddingRight={16}>
                <Box width="150px" paddingRight={4}>
                  <AddCategoryLabel>Horário Inicial</AddCategoryLabel>
                  <AddCategoryTimeTouchable
                    onPress={() => setOpenBeginTimePicker(true)}>
                    <AddCategoryTime>
                      {selectedBeginTime
                        ? formatTimeString(beginTime)
                        : '00:00'}
                    </AddCategoryTime>
                  </AddCategoryTimeTouchable>
                </Box>

                <Box width="150px" paddingLeft={4}>
                  <AddCategoryLabel>Horário Final</AddCategoryLabel>
                  <AddCategoryTimeTouchable
                    onPress={() => setOpenEndTimePicker(true)}>
                    <AddCategoryTime>
                      {selectedEndTime ? formatTimeString(endTime) : '00:00'}
                    </AddCategoryTime>
                  </AddCategoryTimeTouchable>
                </Box>
              </Box>
              <AddCategoryFieldWrapper>
                <AddCategoryLabel>Dia da Semana</AddCategoryLabel>
                <AddCategoryTimeDaysRow>
                  {days.map((day: any, index: number) => (
                    <AddCategoryTimeDayTouchable
                      key={index}
                      //@ts-ignore
                      selected={checkDaySelected(index)}
                      onPress={() => selectDay(index)}>
                      <AddCategoryTimeDay
                        //@ts-ignore
                        selected={checkDaySelected(index)}>
                        {day}
                      </AddCategoryTimeDay>
                    </AddCategoryTimeDayTouchable>
                  ))}
                </AddCategoryTimeDaysRow>
              </AddCategoryFieldWrapper>

              <Box width="100%" paddingLeft={16} paddingRight={16} height={80}>
                <AddCategoryTimeSaveButton
                  disabled={
                    isLoading ||
                    !selectedBeginTime ||
                    !selectedEndTime ||
                    selectedDays.length === 0
                  }
                  onPress={handleAddingANewSchedule}>
                  <AddCategoryTime>Salvar</AddCategoryTime>
                </AddCategoryTimeSaveButton>
              </Box>
            </>
          )}
        </Box>
      </AddCategoryTimeView>
    </CategoryTimeModal>
  );
};

/**
 * EXPORTS
 */
export {AddCategoryTimeModal};
