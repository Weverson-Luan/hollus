import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components';

import {RFValue} from 'react-native-responsive-fontsize';
import {formatToBRL} from 'brazilian-values';
import {
  CaretDoubleDown,
  CaretDoubleUp,
  Clock,
  Pencil,
  DotsThree,
  Check,
  Trash,
} from 'phosphor-react-native';

// components
import {Box} from '../Box';
import {AddCategoryTimeModal} from './components/AddCategoryTimeModal/AddCategoryTimeModal';
import {DescriptionEditModal} from './components/EditCategoryDescriptionModal/EditCategoryDescriptionModal';

// api services
import {Api} from '../../services/api';

// contexto
import {useTherapist} from '../../context/hooks/Therapist/useTherapist';
import useAlert from '../../context/hooks/Alert/useAlert';

// utils
import {getDayOfWeek, getDayOfWeekFromIndex} from '../../utils/formatdate';

// typings
import {ITherapistCategoryProps} from './interface';

//styled-components
import {
  CategoryWrapper,
  CategoryPhoto,
  CategoryInfoWrapper,
  CategoryTitle,
  CategoryDescription,
  CategoryPhotoWrapper,
  CategoryTime,
  CategoryPrice,
  CategoryTimePriceWrapper,
  CategoryContainer,
  CategoryTimeWrapper,
  CategoryTimeBegin,
  CategoryTimeEnd,
  CategoryTimeDay,
  CategoryTimeTitle,
  CategoryTimeRow,
  CategoryTimeTitleRow,
  CategoryOptionToggle,
  TitleWrapper,
  CategoryTimeScheduleWrapper,
  AddCategoryTimeButton,
  AddCategoryTimeButtonTitle,
  CategoryTimeTitleHeader,
  CategoryHeaderEdit,
  CategoryTimeSelect,
  CategoryTimesContainer,
  CategoryDescriptionEditButton,
  CategoryDescriptionEditText,
  CategoryDetailsWrapper,
  CategoryTextLoding,
} from './styles';

export function TherapistCategory({
  data,
  refresh,
  isIconArrow = true,
}: ITherapistCategoryProps) {
  const theme = useTheme();
  const {setAlert} = useAlert();
  const {handleGetTherapistInfo} = useTherapist();

  const [isLoading, setIsLoading] = useState(false);
  const [expand, setExpand] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [selectedBeginTime, setSelectedBeginTime] = useState(false);
  const [beginTime, setBeginTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [openBeginTimePicker, setOpenBeginTimePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<any>([]);
  const [categoriaDescricao, setCategoriaDescricao] = useState('');
  const [showDescricao, setShowDescricao] = useState(false);

  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const onTimeChangeBegin = async (_event: any, selectedTime: Date | any) => {
    if (selectedTime === null || selectedTime === undefined) {
      setOpenBeginTimePicker(false);
      return;
    } else {
      beginTime?.setHours(selectedTime?.getHours() - 3),
        beginTime?.setMinutes(selectedTime?.getMinutes());
      setSelectedBeginTime(true);
      setOpenBeginTimePicker(false);
      console.log('selected inicio time: ');
    }
  };

  const onTimeChangeEnd = async (
    _event: any,
    selectedTime: Date | undefined,
  ) => {
    if (selectedTime === null || selectedTime === undefined) {
      setOpenEndTimePicker(false);
      return;
    } else {
      const correctedTime = new Date();

      correctedTime?.setHours(selectedTime?.getHours() - 3);
      correctedTime?.setMinutes(selectedTime?.getMinutes());

      if (
        selectedBeginTime &&
        correctedTime?.getTime() < beginTime?.getTime()
      ) {
        setAlert(
          'Erro',
          'Selecione um horário final para depois do horário inicial!',
        );
        return;
      }
      endTime?.setHours(selectedTime?.getHours() - 3);
      endTime?.setMinutes(selectedTime?.getMinutes());
      setSelectedEndTime(true);
      setOpenEndTimePicker(false);
    }
  };

  const selectDay = (index: any) => {
    const dayOfWeekName: any = getDayOfWeekFromIndex(index);
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

  const selectTime = (time: any) => {
    //@ts-ignore
    if (!selectedTimes.includes(time.id)) {
      //@ts-ignore
      setSelectedTimes(selectedTimes => [...selectedTimes, time.id]);
      return;
    }
    const timeRemoved = selectedTimes.filter((item: any) => item !== time.id);
    setSelectedTimes(timeRemoved);
  };

  const checkTimeSelected = (time: any) => {
    //@ts-ignore
    if (selectedTimes.includes(time.id)) {
      return true;
    }
    return false;
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      if (selectedTimes) {
        selectedTimes?.forEach(async (item: any) => {
          await Api.delete('/v1/user/horario/remover/' + item);
        });
        handleGetTherapistInfo();
        setAlert('Horários excluídos', 'Horários excluídos com sucesso!');
      }
    } catch (error) {
      setAlert('Horários', 'Não foi possível excluír horários!');
    } finally {
      setIsLoading(false);
    }
  };

  const clearStates = () => {
    setSelectedDays([]);
    setSelectedBeginTime(false);
    setSelectedEndTime(false);
    setEndTime(new Date());
    setBeginTime(new Date());
    setSelectedTimes([]);
    setEditMode(false);
  };

  useEffect(() => {
    if (openModal) {
      clearStates();
    }
  }, [openModal]);

  useEffect(() => {
    if (expand) {
      clearStates();
    }
  }, [expand]);

  return (
    <CategoryContainer>
      <DescriptionEditModal
        data={data}
        categoriaDescricao={categoriaDescricao}
        setOpenDescriptionModal={setOpenDescriptionModal}
        openDescriptionModal={openDescriptionModal}
        setCategoriaDescricao={setCategoriaDescricao}
      />

      <AddCategoryTimeModal
        beginTime={beginTime}
        endTime={endTime}
        terapeuta_categoria_id={data.id}
        days={days}
        onTimeChangeBegin={onTimeChangeBegin}
        onTimeChangeEnd={onTimeChangeEnd}
        openBeginTimePicker={openBeginTimePicker}
        openEndTimePicker={openEndTimePicker}
        selectedBeginTime={selectedBeginTime}
        setOpenBeginTimePicker={setOpenBeginTimePicker}
        setOpenEndTimePicker={setOpenEndTimePicker}
        selectedEndTime={selectedEndTime}
        setOpenModal={setOpenModal}
        openModal={openModal}
        selectDay={selectDay}
        selectedDays={selectedDays}
        isLoading={isLoading}
        checkDaySelected={checkDaySelected}
        AddCategoryCleanState={clearStates}
      />

      <CategoryWrapper>
        <CategoryPhotoWrapper>
          <CategoryPhoto
            source={{
              uri: data.categoria?.link_foto,
            }}
            resizeMode="cover"
          />
        </CategoryPhotoWrapper>
        <CategoryInfoWrapper>
          <TitleWrapper>
            <CategoryTitle>{data.categoria?.nome}</CategoryTitle>
            {isIconArrow && (
              <CategoryOptionToggle
                onPress={() => {
                  setShowDescricao(!showDescricao);
                  setExpand(!expand);
                }}>
                {expand ? (
                  <CaretDoubleUp size={16} />
                ) : (
                  <CaretDoubleDown size={16} />
                )}
              </CategoryOptionToggle>
            )}
          </TitleWrapper>
          <CategoryDescription textBreakStrategy="highQuality">
            {showDescricao ? (
              data?.descricao
            ) : (
              <>
                {' '}
                {data?.descricao.length > 32
                  ? `${data.descricao.slice(0, 32)}...`
                  : data?.descricao}
              </>
            )}
          </CategoryDescription>
          <CategoryTimePriceWrapper>
            <CategoryPrice>
              {data?.valor && formatToBRL(data?.valor)}
            </CategoryPrice>
            <CategoryTimeScheduleWrapper>
              <Clock size={RFValue(16)} />
              <CategoryTime>
                {data?.tempo > 60 ? `${data.tempo / 60}h` : `${data.tempo}min`}
              </CategoryTime>
            </CategoryTimeScheduleWrapper>
          </CategoryTimePriceWrapper>
        </CategoryInfoWrapper>
      </CategoryWrapper>

      {expand &&
        (data.horarios.length > 0 ? (
          <CategoryDetailsWrapper>
            <CategoryDescriptionEditButton
              onPress={() => setOpenDescriptionModal(true)}>
              <CategoryDescriptionEditText>
                Editar descrição
              </CategoryDescriptionEditText>
            </CategoryDescriptionEditButton>
            <CategoryTimeWrapper>
              <CategoryTimeTitleHeader>
                <CategoryTimeTitle>Horários</CategoryTimeTitle>
                <CategoryHeaderEdit onPress={() => setEditMode(!editMode)}>
                  <Pencil size={RFValue(16)} color={theme.colors.white} />
                </CategoryHeaderEdit>
              </CategoryTimeTitleHeader>
              {isLoading ? (
                <Box
                  width="100%"
                  flexDirection={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <ActivityIndicator
                    size={'small'}
                    color={theme.colors.orange}
                  />
                  <CategoryTextLoding>Carregando...</CategoryTextLoding>
                </Box>
              ) : (
                <CategoryTimesContainer>
                  <CategoryTimeTitleRow>
                    {editMode ? (
                      <CategoryTimeSelect></CategoryTimeSelect>
                    ) : null}
                    <CategoryTimeDay>Dia</CategoryTimeDay>
                    <CategoryTimeBegin>De</CategoryTimeBegin>
                    <CategoryTimeEnd>Até</CategoryTimeEnd>
                  </CategoryTimeTitleRow>
                  {data.horarios.map(horario => (
                    <CategoryTimeRow key={horario.id}>
                      {editMode ? (
                        <CategoryTimeSelect onPress={() => selectTime(horario)}>
                          {checkTimeSelected(horario) ? (
                            <Check color={theme.colors.green} size={16} />
                          ) : (
                            <DotsThree />
                          )}
                        </CategoryTimeSelect>
                      ) : null}
                      <CategoryTimeDay>
                        {getDayOfWeek(horario.dia_semana) ?? ''}
                      </CategoryTimeDay>
                      <CategoryTimeBegin>
                        {horario.horario_inicio.substr(0, 5) ?? ''}
                      </CategoryTimeBegin>
                      <CategoryTimeEnd>
                        {horario.horario_fim.substr(0, 5) ?? ''}
                      </CategoryTimeEnd>
                    </CategoryTimeRow>
                  ))}
                  {editMode && selectedTimes.length > 0 ? (
                    <AddCategoryTimeButton
                      //@ts-ignore
                      type="danger"
                      onPress={() => {
                        handleDelete();
                      }}>
                      <Trash size={RFValue(16)} color={theme.colors.white} />

                      {isLoading ? (
                        <ActivityIndicator
                          size={'large'}
                          color={theme.colors.orange}
                        />
                      ) : (
                        <AddCategoryTimeButtonTitle>
                          Excluir
                          {selectedTimes.length === 1
                            ? ' selecionado'
                            : ' selecionados'}
                        </AddCategoryTimeButtonTitle>
                      )}
                    </AddCategoryTimeButton>
                  ) : (
                    <AddCategoryTimeButton onPress={() => setOpenModal(true)}>
                      {isLoading ? (
                        <ActivityIndicator color={'#fff'} size={24} />
                      ) : (
                        <AddCategoryTimeButtonTitle>
                          Adicionar
                        </AddCategoryTimeButtonTitle>
                      )}
                    </AddCategoryTimeButton>
                  )}
                </CategoryTimesContainer>
              )}
            </CategoryTimeWrapper>
          </CategoryDetailsWrapper>
        ) : (
          <CategoryTimeWrapper>
            <CategoryTimeTitle>Sem horários</CategoryTimeTitle>
            <AddCategoryTimeButton onPress={() => setOpenModal(true)}>
              <AddCategoryTimeButtonTitle>Adicionar</AddCategoryTimeButtonTitle>
            </AddCategoryTimeButton>
          </CategoryTimeWrapper>
        ))}
    </CategoryContainer>
  );
}
