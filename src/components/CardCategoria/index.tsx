import React, {useEffect, useState} from 'react';
import {
  AddCategoryFieldWrapper,
  AddCategoryLabel,
  AddCategoryTime,
  AddCategoryTimeDay,
  AddCategoryTimeDayTouchable,
  AddCategoryTimeDaysRow,
  AddCategoryTimeRow,
  AddCategoryTimeTouchable,
} from '../TherapistCategory/styles';
import {
  CategoryTitleText,
  CategoryTitleWrapper,
  CategoryWrapper,
} from './styles';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {formatTimeString} from '../../utils/formatdate';
import useAlert from '../../context/hooks/Alert/useAlert';
export const CardCategoria = ({data, onChangeValue}) => {
  const initialCatState = {
    nome: '',
    id: null,
    beginTime: new Date(),
    endTime: new Date(),
    changedBeginTime: false,
    changedEndTime: false,
    days: Array(7).fill(false),
  };

  const [catDetails, setCatDetails] = useState(initialCatState);

  const [openBeginTimePicker, setOpenBeginTimePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);

  const defaultDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const [selectedDays, setSelectedDays] = useState(data?.days);

  const {setAlert} = useAlert();

  useEffect(() => {
    // console.log("useeff");
    setCatDetails(data);
    return () => {
      // console.log("cleanup useeff");
      setCatDetails(initialCatState);
    };
  }, []);

  const handleChange = (key, value) => {
    let temp = catDetails;
    temp[key] = value;
    if (key === 'beginTime') {
      temp.changedBeginTime = true;
    }
    if (key === 'endTime') {
      temp.changedEndTime = true;
    }
    setCatDetails({
      nome: temp.nome,
      id: temp.id,
      beginTime: temp.beginTime,
      endTime: temp.endTime,
      changedBeginTime: temp.changedBeginTime,
      changedEndTime: temp.changedEndTime,
      days: temp.days,
    });
    onChangeValue(catDetails);
    // onChangeDetails(catDetails);
  };

  const checkDaySelected = dayIndex => {
    return dayIndex in selectedDays;
  };

  const selectDay = i => {
    var temp = selectedDays.slice();
    temp[i] = !temp[i];
    // if(temp.every(t => t === false)){
    //   set
    // }
    setSelectedDays(temp);
    handleChange('days', temp);
    return;
  };

  const toggleOpenTimePicker = (time, show = true) => {
    if (show) {
      if (time === 'begin') {
        setOpenBeginTimePicker(true);
        return;
      }
      setOpenEndTimePicker(true);
      return;
    }
  };

  const onTimeChangeBegin = async (event: any, selectedTime: any) => {
    if (typeof selectedTime === 'undefined') {
      setOpenBeginTimePicker(false);
      return;
    }

    let newTime = new Date();
    newTime?.setHours(selectedTime?.getHours());
    newTime?.setMinutes(selectedTime?.getMinutes());

    handleChange('beginTime', newTime);

    setOpenBeginTimePicker(false);
  };

  const onTimeChangeEnd = async (event: any, selectedTime: any) => {
    if (typeof selectedTime === 'undefined') {
      setOpenEndTimePicker(false);
      return;
    }

    if (selectedTime?.getTime() < catDetails.beginTime?.getTime()) {
      setAlert(
        'Erro',
        'Selecione um horário final para depois do horário inicial!',
      );
      return;
    }

    let newTime = new Date();

    newTime?.setHours(selectedTime?.getHours());
    newTime?.setMinutes(selectedTime?.getMinutes());

    handleChange('endTime', newTime);

    setOpenEndTimePicker(false);
  };

  return (
    <CategoryWrapper>
      {openBeginTimePicker ? (
        <RNDateTimePicker
          value={catDetails?.beginTime}
          mode="time"
          is24Hour={true}
          onChange={onTimeChangeBegin}
          timeZoneOffsetInMinutes={0}
        />
      ) : null}
      {openEndTimePicker ? (
        <RNDateTimePicker
          value={catDetails?.endTime}
          mode="time"
          is24Hour={true}
          onChange={onTimeChangeEnd}
          timeZoneOffsetInMinutes={0}
        />
      ) : null}
      {/* <AddCategoryTimeRow> */}
      <CategoryTitleWrapper>
        <CategoryTitleText>{catDetails?.nome}</CategoryTitleText>
      </CategoryTitleWrapper>
      {/* </AddCategoryTimeRow> */}
      <AddCategoryTimeRow>
        <AddCategoryFieldWrapper>
          <AddCategoryLabel>Horário Inicial</AddCategoryLabel>
          <AddCategoryTimeTouchable
            onPress={() => toggleOpenTimePicker('begin')}>
            <AddCategoryTime>
              {catDetails?.changedBeginTime
                ? formatTimeString(catDetails?.beginTime)
                : '00:00'}
            </AddCategoryTime>
          </AddCategoryTimeTouchable>
        </AddCategoryFieldWrapper>
        <AddCategoryFieldWrapper>
          <AddCategoryLabel>Horário Final</AddCategoryLabel>
          <AddCategoryTimeTouchable onPress={() => toggleOpenTimePicker('end')}>
            <AddCategoryTime>
              {catDetails?.changedEndTime
                ? formatTimeString(catDetails?.endTime)
                : '00:00'}
            </AddCategoryTime>
          </AddCategoryTimeTouchable>
        </AddCategoryFieldWrapper>
      </AddCategoryTimeRow>
      <AddCategoryFieldWrapper>
        <AddCategoryLabel>Dia da Semana</AddCategoryLabel>
        <AddCategoryTimeDaysRow>
          {selectedDays?.map((day, dayIndex) => (
            <AddCategoryTimeDayTouchable
              selected={day}
              //   selected={false}
              onPress={() => selectDay(dayIndex)}>
              {/* <AddCategoryTimeDay selected={cat?.days.includes(dayIndex)}> */}
              <AddCategoryTimeDay selected={day}>
                {defaultDays[dayIndex]}
              </AddCategoryTimeDay>
            </AddCategoryTimeDayTouchable>
          ))}
        </AddCategoryTimeDaysRow>
      </AddCategoryFieldWrapper>
    </CategoryWrapper>
  );
};
