import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "styled-components";

//styled-components
import {
  EmptyMessage,
  EmptyMessageContainer,
  AddButton,
  AddButtonText,
  AddButtonContainer,
  ValueInput,
} from "./styles";
import { ActivityIndication } from "../../../components/Spinner";
import { Api } from "../../../services/api";
import { RFValue } from "react-native-responsive-fontsize";
import { TherapistCategory } from "../../../components/TherapistCategory";
import { ActivityIndicator, FlatList, Text, TextInput } from "react-native";
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
  EmptyCategoryListComponent,
  LoadingContainer,
} from "../../../components/TherapistCategory/styles";
import useAlert from "../../../context/hooks/Alert/useAlert";
import {
  formatTimeString,
  getDayOfWeekFromIndex,
} from "../../../utils/formatdate";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import MaskInput, { Masks } from "react-native-mask-input";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Input } from "../../../components/Input";

export function GerenciarConsultas({ route, navigation }) {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { setAlert } = useAlert();

  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState();
  const [expand, setExpand] = useState(false);
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
  const [selectedDuration, setSelectedDuration] = useState({
    hours: 1,
    minutes: 0,
    seconds: 0,
  });
  const [selectedPrice, setSelectedPrice] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [openDropDown, setOpenDropdown] = useState(false);

  const fetchMyInfo = async () => {
    setLoading(true);
    clearStates();
    const { data } = await Api.get("/v1/user/pesquisar-minhas-categorias");
    // console.log(data.data);
    setCategorias(data.data);
    setLoading(false);
  };

  const parseErrors = (errors) => {
    const errArr = Object.values(errors).map((err) => err);
    return errArr[0][0];
  };

  const days = ["D", "S", "T", "Q", "Q", "S", "S"];

  const handleDurationChange = (newValue) => {
    setSelectedDuration(newValue);
  };

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

  const fetchCategories = async () => {
    const { data } = await Api.get("/v1/user/pesquisar-categorias");
    let arr = [];
    data.data.forEach((cat) => {
      arr.push({
        label: cat.nome,
        value: cat.id,
      });
    });
    setCategoriesList(arr);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (selectedCategory.length === 1) {
      Api.post("/v1/user/adicionar-categoria", {
        categoria_id: selectedCategory[0],
        tempo: 60,
        descricao: categoryDescription,
        horario_inicio: formatTimeString(beginTime),
        horario_fim: formatTimeString(endTime),
        dias_semana: JSON.stringify(selectedDays),
        valor: selectedPrice,
      })
        .then((res) => {
          if (res.data.success) {
            fetchMyInfo();
            fetchCategories();
            setOpenModal(false);
          }
          if (res.data.error) {
            setAlert("Erro", parseErrors(res.data.error));
          }
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
      setLoading(false);
      return;
    }
    let errCount = [];
    selectedCategory.forEach((selCat) => {
      setIsLoading(true);
      Api.post("/v1/user/adicionar-categoria", {
        categoria_id: selCat,
        tempo: 60,
        descricao: categoryDescription,
        horario_inicio: formatTimeString(beginTime),
        horario_fim: formatTimeString(endTime),
        dias_semana: JSON.stringify(selectedDays),
        valor: selectedPrice,
      })
        .then((res) => {
          if (res.data.error) {
            setAlert("Erro", parseErrors(res.data.error));
          }
        })
        .catch((err) => console.log(err));
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
    setSelectedPrice("");
    setCategoryDescription("");
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
        transparent
      >
        <AddCategoryTimeView>
          <AddCategoryTimeCard>
            <AddCategoryTimeHeader>
              <AddCategoryTimeHeaderText>
                Nova Categoria
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
            <AddCategoryCardContent showsVerticalScrollIndicator={false}>
              {isLoading ? (
                <LoadingContainer>
                  <ActivityIndicator
                    size={"large"}
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
                      setItems={setCategoriesList}
                      placeholder={
                        categoriesList.length > 0
                          ? "Selecione uma categoria"
                          : "Sem categorias disponíveis"
                      }
                      disabled={categoriesList.length === 0}
                      placeholderStyle={{ textAlign: "center" }}
                      style={{ borderColor: theme.colors.gray_50 }}
                      containerStyle={{ width: RFValue(225) }}
                      textStyle={{ textAlign: "center" }}
                      arrowIconContainerStyle={{
                        position: "absolute",
                        right: "5%",
                        transform: [{ scale: 1.2 }],
                      }}
                      selectedItemContainerStyle={{
                        backgroundColor: theme.colors.orange,
                      }}
                      dropDownContainerStyle={{
                        borderColor: theme.colors.gray_50,
                      }}
                      selectedItemLabelStyle={{ color: theme.colors.white }}
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
                        backgroundColor: "red",
                        borderColor: "red",
                      }}
                      searchPlaceholder="Pesquisar categoria..."
                    />
                  </AddCategoryTimeRow>
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
                          {selectedEndTime
                            ? formatTimeString(endTime)
                            : "00:00"}
                        </AddCategoryTime>
                      </AddCategoryTimeTouchable>
                    </AddCategoryFieldWrapper>
                  </AddCategoryTimeRow>
                  <AddCategoryFieldWrapper>
                    <AddCategoryLabel>Dia da Semana</AddCategoryLabel>
                    <AddCategoryTimeDaysRow>
                      {days.map((day, index) => (
                        <AddCategoryTimeDayTouchable
                          selected={checkDaySelected(index)}
                          onPress={() => selectDay(index)}
                          key={index}
                        >
                          <AddCategoryTimeDay
                            selected={checkDaySelected(index)}
                          >
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
            {isLoading ||
            !selectedBeginTime ||
            !selectedEndTime ||
            selectedDays.length === 0 ||
            typeof selectedCategory === "undefined" ||
            selectedPrice === "" ||
            categoryDescription === "" ? null : (
              <AddCategoryTimeSaveButton
                disabled={
                  isLoading ||
                  !selectedBeginTime ||
                  !selectedEndTime ||
                  selectedDays.length === 0 ||
                  typeof selectedCategory === "undefined" ||
                  selectedPrice === ""
                }
                onPress={handleSubmit}
              >
                <AddCategoryTime>Salvar</AddCategoryTime>
              </AddCategoryTimeSaveButton>
            )}
          </AddCategoryTimeCard>
        </AddCategoryTimeView>
      </AddCategoryTimeModal>
      {loading ? (
        <ActivityIndication />
      ) : categorias?.length === 0 ? (
        <EmptyMessageContainer>
          <EmptyMessage>Sem horários ainda</EmptyMessage>
        </EmptyMessageContainer>
      ) : (
        <FlatList
          data={categorias}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
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
