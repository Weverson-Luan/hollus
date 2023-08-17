import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  FlatList,
} from "react-native";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Calendar, CalendarProps, LocaleConfig } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button } from "../../../components/Button";
import { handleFormattedDate } from "../../../utils/formatdate";
import { ptBR } from "./localConfig";
import {
  Main,
  Title,
  WrapperButtonNext,
  TitleButtonNext,
  WrapperHorsSelected,
  TitleHorsSelect,
  styles,
} from "./styles";
import {
  changeAppointment,
  makeAppointment,
} from "../../../context/hooks/Appointment/useAppointment";
import ActionSheet from "react-native-actions-sheet";
import { ImageProfile } from "../../../components/Card/styles";
import { RFValue } from "react-native-responsive-fontsize";
import useAlert from "../../../context/hooks/Alert/useAlert";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export function ScheduleConsultation({ navigation, route }) {
  const theme = useTheme();
  const [initialDay, setInitialDay] = useState<any>(
    handleFormattedDate(new Date())
  );
  const [enableButton, setEnableButton] = useState(false);
  const [selectedValue, setSelectedValue] = useState(new Date());
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState<any>(false);
  const [data, setDate] = useState<any>();
  const [category, setCategory] = useState([]);
  let month = String(selectedValue?.getMonth() + 1).padStart(2, "0");

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { setAlert } = useAlert();

  useEffect(() => {
    // console.log(route.params);
  }, []);

  const showMode = (currentMode: any) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const getNewSelectedDate = useCallback(
    (date, shouldAdd) => {
      const newMonth = new Date(date).getMonth();
      const month = shouldAdd ? newMonth + 1 : newMonth - 1;
      const newDate = new Date(selectedValue.setMonth(month));
      const newSelected = new Date(newDate.setDate(1));

      return newSelected;
    },
    [selectedValue]
  );

  const onPressArrowLeft = useCallback(
    (subtract, month) => {
      const newDate = getNewSelectedDate(month, false);
      setSelectedValue(newDate);
      subtract();
    },
    [getNewSelectedDate]
  );

  const onPressArrowRight = useCallback(
    (add, month) => {
      const newDate = getNewSelectedDate(month, true);
      setSelectedValue(newDate);
      add();
    },
    [getNewSelectedDate]
  );

  //COMPONENT HEADER
  const CustomHeaderTitle = (
    <TouchableOpacity
      style={styles.customTitleContainer}
      onPress={() => console.log("Tapped!")}
    >
      <Text style={styles.customTitle}>
        {ptBR.monthNames[Number(month) - 1]} / {selectedValue?.getFullYear()}
      </Text>
    </TouchableOpacity>
  );

  const onDayPress: CalendarProps["onDayPress"] = (day) => {
    const todays = handleFormattedDate(day.dateString, true);
    setInitialDay(day.dateString);
    setDate(todays);
    setEnableButton(true);
  };

  const showTimePicker = () => {
    showMode("time");
    setShow(!show);
  };

  //ONCHANGE IN DATE-TIME-PICKER
  const onChange = async (event, selectedTime) => {
    const currentDate = selectedTime;
    // console.log(selectedTime);
    setShow(false);
    setSelectedValue(currentDate);
    if (route.params?.changeAppointment) {
      const res = await changeAppointment(
        currentDate
          .toISOString()
          .slice(0, 19)
          .replace(/-/g, "-")
          .replace("T", " "),
        route.params?.appointment_id,
        route.params?.therapist.id,
        route.params?.category.id
      );
      res.data.error
        ? setAlert("Erro ao alterar consulta", res.data.error)
        : (setAlert("Consulta alterada com sucesso!", res.data.error),
          navigation.navigate("Appointment", {
            id: route.params?.appointment_id,
          }));
    } else {
      const res = await makeAppointment(
        data,
        selectedTime,
        route.params.therapist,
        category?.id
      );
      // console.log(res.data);
      res.data.error
        ? setAlert("Erro ao agendar consulta", res.data.error)
        : (setAlert("Consulta agendada com sucesso!", res.data.message),
          navigation.navigate("FormPayment", { consulta_id: res.data.id }));
    }
    // : Alert.alert(
    //     "Consulta agendada com sucesso!",
    //     "Iremos te redirecionar para os detalhes da consulta",
    //     [
    //       {
    //         text: "OK",
    //         onPress: () =>
    //           navigation.navigate("AppointmentSchedule", { id: res.data.id }),
    //       },
    //     ]
    //   );
  };

  return (
    <>
      <Main>
        <Title>Selecione uma data e o tipo de consulta</Title>
        {/* <ActionSheet ref={actionSheetRef}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                color: theme.colors.gray_200,
                fontSize: 20,
                marginVertical: 10,
                width: "100%",
                textAlign: "center",
              }}
            >
              Selecione o tipo de consulta
            </Text>
            <FlatList
              data={route.params.therapist.categorias}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ alignItems: "center" }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    marginVertical: RFValue(5),
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: RFValue(250),
                    borderWidth: 1,
                    borderColor: theme.colors.gray_50,
                    borderRadius: RFValue(6),
                    padding: RFValue(10),
                  }}
                  onPress={() => (
                    setCategory(item),
                    actionSheetRef.current?.hide(),
                    showTimePicker()
                  )}
                >
                  <ImageProfile
                    source={{
                      uri: item.link_foto,
                    }}
                  />
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ color: theme.colors.gray_150 }}>
                      {item?.nome}
                    </Text>
                    <Text style={{ color: theme.colors.gray_150 }}>
                      R${item?.pivot.valor} - {item?.pivot.tempo} minutos
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </ActionSheet> */}
        <View style={styles.container}>
          <Calendar
            style={styles.calendar}
            customHeaderTitle={CustomHeaderTitle}
            onPressArrowLeft={onPressArrowLeft}
            onPressArrowRight={onPressArrowRight}
            onDayPress={onDayPress}
            markedDates={{
              [initialDay]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "orange",
                selectedTextColor: "red",
              },
            }}
            headerStyle={{
              backgroundColor: theme.colors.orange,
            }}
            minDate={new Date()}
          />

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={selectedValue}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
        {/* <WrapperHorsSelected>
          <AntDesign
            name="clockcircleo"
            size={22}
            color={theme.colors.gray_150}
          />

          <TitleHorsSelect>
            Sua consulta será no dia <>{data ? data : initialDay}</> às{" "}
            {selectedValue?.getHours()} horas e {selectedValue?.getMinutes()}{" "}
            minutos
          </TitleHorsSelect>
        </WrapperHorsSelected> */}
      </Main>
      <WrapperButtonNext>
        <View style={{ width: "100%", marginTop: 0 }}>
          <Button
            width="100%"
            height="50px"
            background_color={
              enableButton ? theme.colors.orange_100 : theme.colors.gray_80
            }
            border={false}
            disabled={!enableButton}
            onPress={() =>
              route.params?.changeAppointment
                ? showTimePicker()
                : actionSheetRef.current.show()
            }
          >
            <TitleButtonNext>
              {route.params?.changeAppointment
                ? "Alterar consulta"
                : "Pesquisar horários"}
            </TitleButtonNext>
          </Button>
        </View>
      </WrapperButtonNext>
    </>
  );
}
