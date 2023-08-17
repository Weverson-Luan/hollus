import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";

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
  AddCategoryTimeModal,
  AddCategoryTimeView,
  AddCategoryTimeCard,
  AddCategoryTimeTouchable,
  AddCategoryTime,
  AddCategoryLabel,
  AddCategoryFieldWrapper,
  AddCategoryTimeRow,
  AddCategoryTimeSaveButton,
  AddCategoryTimeHeader,
  AddCategoryTimeDayTouchable,
  AddCategoryTimeDay,
  AddCategoryTimeDaysRow,
  LoadingContainer,
  CategoryTimeTitleHeader,
  CategoryHeaderEdit,
  CategoryTimeSelect,
  AddCategoryTimeHeaderText,
  AddCategoryTimeHeaderButton,
  CategoryTimesContainer,
  CategoryDescriptionEditButton,
  CategoryDescriptionEditText,
  CategoryDetailsWrapper,
  EditCategoryDescriptionModal,
  EditCategoryDescriptionView,
  CategoryDescriptionTextInput,
} from "./styles";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { RFValue } from "react-native-responsive-fontsize";
import {
  formatTimeString,
  getDayOfWeek,
  getDayOfWeekFromIndex,
} from "../../utils/formatdate";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useIsFocused } from "@react-navigation/native";
import useAlert from "../../context/hooks/Alert/useAlert";
import { Api } from "../../services/api";
import { ActivityIndicator } from "react-native";

export function TherapistCategory({ data, refresh }) {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { text, title, setAlert } = useAlert();

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
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [categoriaDescricao, setCategoriaDescricao] = useState("");

  const days = ["D", "S", "T", "Q", "Q", "S", "S"];

  const onTimeChangeBegin = async (event, selectedTime) => {
    if (typeof selectedTime === "undefined") {
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

  const onTimeChangeEnd = async (event, selectedTime) => {
    if (typeof selectedTime === "undefined") {
      setOpenEndTimePicker(false);
      return;
    }
    const correctedTime = new Date();
    correctedTime.setHours(selectedTime.getHours() - 3);
    correctedTime.setMinutes(selectedTime.getMinutes());

    if (selectedBeginTime && correctedTime.getTime() < beginTime.getTime()) {
      setAlert(
        "Erro",
        "Selecione um horário final para depois do horário inicial!"
      );
      return;
    }
    endTime.setHours(selectedTime.getHours() - 3);
    endTime.setMinutes(selectedTime.getMinutes());
    setSelectedEndTime(true);
    setOpenEndTimePicker(false);
  };

  const selectDay = (index) => {
    const dayOfWeekName = getDayOfWeekFromIndex(index);
    if (!selectedDays.includes(dayOfWeekName)) {
      setSelectedDays((selectedDays) => [...selectedDays, dayOfWeekName]);
      return;
    }
    const dayRemoved = selectedDays.filter((item) => item !== dayOfWeekName);
    setSelectedDays(dayRemoved);
    // setSelectedDays((selectedDays) => [
    //   ...selectedDays,
    //   selectedDays.filter((item) => item !== dayOfWeekName),
    // ]);
  };

  const checkDaySelected = (index) => {
    const dayOfWeekName = getDayOfWeekFromIndex(index);
    if (selectedDays.includes(dayOfWeekName)) {
      return true;
    }
    return false;
  };

  const selectTime = (time) => {
    if (!selectedTimes.includes(time.id)) {
      setSelectedTimes((selectedTimes) => [...selectedTimes, time.id]);
      return;
    }
    const timeRemoved = selectedTimes.filter((item) => item !== time.id);
    setSelectedTimes(timeRemoved);
    // setSelectedDays((selectedDays) => [
    //   ...selectedDays,
    //   selectedDays.filter((item) => item !== dayOfWeekName),
    // ]);
  };

  const checkTimeSelected = (time) => {
    if (selectedTimes.includes(time.id)) {
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await Api.post("v1/user/horario/adicionar", {
      dia_semana: JSON.stringify(selectedDays),
      horario_inicio: formatTimeString(beginTime),
      horario_fim: formatTimeString(endTime),
      terapeuta_categoria_id: data.id,
    })
      .then((res) => {
        if (res.data.success) {
          setOpenModal(false);
          refresh();
        }
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
    return;
  };

  const handleDelete = async (confirmed) => {
    setIsLoading(true);
    selectedTimes.forEach(async (item) => {
      await Api.delete("/v1/user/horario/remover/" + item)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    });
    setAlert("Horários excluídos", "Horários excluídos com sucesso!");
    setIsLoading(false);
    refresh();
  };

  const handleEditDescription = async () => {
    setIsLoading(true);
    await Api.post("/v1/user/categoria/editar/descricao", {
      categoria_id: data.id,
      descricao: categoriaDescricao,
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setAlert("Descrição alterada", "Descrição alterada com sucesso!");
    setIsLoading(false);
    refresh();
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
      <EditCategoryDescriptionModal
        onRequestClose={() => setOpenDescriptionModal(false)}
        visible={openDescriptionModal}
        transparent
      >
        <EditCategoryDescriptionView>
          <AddCategoryTimeCard>
            <AddCategoryTimeHeader>
              <AddCategoryTimeHeaderText>
                Editar Descrição
              </AddCategoryTimeHeaderText>
              <AddCategoryTimeHeaderButton
                onPress={() => setOpenDescriptionModal(false)}
              >
                <FontAwesome5Icon
                  name="times"
                  size={RFValue(18)}
                  color={theme.colors.white}
                />
              </AddCategoryTimeHeaderButton>
            </AddCategoryTimeHeader>
            <CategoryDescriptionTextInput
              placeholder="Escreva um pouco sobre a consulta"
              multiline
              defaultValue={data?.descricao}
              maxLength={300}
              onChangeText={setCategoriaDescricao}
            />
            {categoriaDescricao === "" || categoriaDescricao === data?.descricao ? null : (
              <AddCategoryTimeSaveButton
                disabled={isLoading || categoriaDescricao === ""}
                onPress={handleEditDescription}
              >
                <AddCategoryTime>Salvar</AddCategoryTime>
              </AddCategoryTimeSaveButton>
            )}
          </AddCategoryTimeCard>
        </EditCategoryDescriptionView>
      </EditCategoryDescriptionModal>
      <AddCategoryTimeModal
        onRequestClose={() => setOpenModal(false)}
        visible={openModal}
        transparent
      >
        <AddCategoryTimeView>
          <AddCategoryTimeCard>
            <AddCategoryTimeHeader>
              <AddCategoryTimeHeaderText>
                Novo Horário
              </AddCategoryTimeHeaderText>
              <AddCategoryTimeHeaderButton onPress={() => setOpenModal(false)}>
                <FontAwesome5Icon
                  name="times"
                  size={RFValue(18)}
                  color={theme.colors.white}
                />
              </AddCategoryTimeHeaderButton>
            </AddCategoryTimeHeader>
            {openBeginTimePicker ? (
              <RNDateTimePicker
                value={beginTime}
                mode="time"
                is24Hour={true}
                onChange={onTimeChangeBegin}
              />
            ) : null}
            {openEndTimePicker ? (
              <RNDateTimePicker
                value={endTime}
                mode="time"
                is24Hour={true}
                onChange={onTimeChangeEnd}
              />
            ) : null}
            {isLoading ? (
              <LoadingContainer>
                <ActivityIndicator size={"large"} color={theme.colors.orange} />
              </LoadingContainer>
            ) : (
              <>
                <AddCategoryTimeRow>
                  <AddCategoryFieldWrapper>
                    <AddCategoryLabel>Horário Inicial</AddCategoryLabel>
                    <AddCategoryTimeTouchable
                      onPress={() => setOpenBeginTimePicker(true)}
                    >
                      <AddCategoryTime>
                        {selectedBeginTime
                          ? formatTimeString(beginTime)
                          : "00:00"}
                      </AddCategoryTime>
                    </AddCategoryTimeTouchable>
                  </AddCategoryFieldWrapper>
                  <AddCategoryFieldWrapper>
                    <AddCategoryLabel>Horário Final</AddCategoryLabel>
                    <AddCategoryTimeTouchable
                      onPress={() => setOpenEndTimePicker(true)}
                    >
                      <AddCategoryTime>
                        {selectedEndTime ? formatTimeString(endTime) : "00:00"}
                      </AddCategoryTime>
                    </AddCategoryTimeTouchable>
                  </AddCategoryFieldWrapper>
                </AddCategoryTimeRow>
                <AddCategoryFieldWrapper>
                  <AddCategoryLabel>Dia da Semana</AddCategoryLabel>
                  <AddCategoryTimeDaysRow>
                    {days.map((day, index) => (
                      <AddCategoryTimeDayTouchable
                        key={index}
                        selected={checkDaySelected(index)}
                        onPress={() => selectDay(index)}
                      >
                        <AddCategoryTimeDay selected={checkDaySelected(index)}>
                          {day}
                        </AddCategoryTimeDay>
                      </AddCategoryTimeDayTouchable>
                    ))}
                  </AddCategoryTimeDaysRow>
                </AddCategoryFieldWrapper>
                <AddCategoryTimeSaveButton
                  disabled={
                    isLoading ||
                    !selectedBeginTime ||
                    !selectedEndTime ||
                    selectedDays.length === 0
                  }
                  onPress={handleSubmit}
                >
                  <AddCategoryTime>Salvar</AddCategoryTime>
                </AddCategoryTimeSaveButton>
              </>
            )}
          </AddCategoryTimeCard>
        </AddCategoryTimeView>
      </AddCategoryTimeModal>
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
            <CategoryOptionToggle onPress={() => setExpand(!expand)}>
              <FontAwesome5Icon
                name={expand ? "angle-up" : "angle-down"}
                size={RFValue(25)}
              />
            </CategoryOptionToggle>
          </TitleWrapper>
          <CategoryDescription textBreakStrategy="highQuality">
            {data?.descricao}
          </CategoryDescription>
          <CategoryTimePriceWrapper>
            <CategoryPrice>R$ {data?.valor}</CategoryPrice>
            <CategoryTimeScheduleWrapper>
              <FontAwesome5Icon name="clock" size={RFValue(15)} />
              <CategoryTime>
                {data?.tempo > 60 ? `${data.tempo / 60}h` : `${data.tempo}min`}
              </CategoryTime>
            </CategoryTimeScheduleWrapper>
          </CategoryTimePriceWrapper>
        </CategoryInfoWrapper>
      </CategoryWrapper>
      {expand ? (
        data.horarios.length > 0 ? (
          <CategoryDetailsWrapper>
            <CategoryDescriptionEditButton
              onPress={() => setOpenDescriptionModal(true)}
            >
              <CategoryDescriptionEditText>
                Editar descrição
              </CategoryDescriptionEditText>
              {/* <FontAwesome5Icon
                name="pen"
                size={RFValue(16)}
                color={theme.colors.gray_200}
              /> */}
            </CategoryDescriptionEditButton>
            <CategoryTimeWrapper>
              <CategoryTimeTitleHeader>
                <CategoryTimeTitle>Horários</CategoryTimeTitle>
                <CategoryHeaderEdit onPress={() => setEditMode(!editMode)}>
                  <FontAwesome5Icon
                    name="pen"
                    size={RFValue(16)}
                    color={theme.colors.white}
                  />
                </CategoryHeaderEdit>
              </CategoryTimeTitleHeader>
              {isLoading ? (
                <ActivityIndicator size={"large"} color={theme.colors.orange} />
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
                  {data.horarios.map((horario) => (
                    <CategoryTimeRow key={horario.id}>
                      {editMode ? (
                        <CategoryTimeSelect onPress={() => selectTime(horario)}>
                          <FontAwesome5Icon
                            name={
                              checkTimeSelected(horario)
                                ? "dot-circle"
                                : "circle"
                            }
                            size={RFValue(20)}
                            color={theme.colors.orange}
                          />
                        </CategoryTimeSelect>
                      ) : null}
                      <CategoryTimeDay>
                        {getDayOfWeek(horario.dia_semana)}
                      </CategoryTimeDay>
                      <CategoryTimeBegin>
                        {horario.horario_inicio.substr(0, 5)}
                      </CategoryTimeBegin>
                      <CategoryTimeEnd>
                        {horario.horario_fim.substr(0, 5)}
                      </CategoryTimeEnd>
                    </CategoryTimeRow>
                  ))}
                  {editMode && selectedTimes.length > 0 ? (
                    <AddCategoryTimeButton onPress={() => setOpenModal(true)}>
                      <AddCategoryTimeButtonTitle
                        type="danger"
                        onPress={handleDelete}
                      >
                        <FontAwesome5Icon name="trash" size={RFValue(16)} />{" "}
                        Excluir
                        {selectedTimes.length === 1
                          ? " selecionado"
                          : " selecionados"}
                      </AddCategoryTimeButtonTitle>
                    </AddCategoryTimeButton>
                  ) : (
                    <AddCategoryTimeButton onPress={() => setOpenModal(true)}>
                      <AddCategoryTimeButtonTitle>
                        Adicionar
                      </AddCategoryTimeButtonTitle>
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
        )
      ) : null}
    </CategoryContainer>
  );
}
