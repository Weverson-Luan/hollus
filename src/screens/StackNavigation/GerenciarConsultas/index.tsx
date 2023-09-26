import React, {useEffect, useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

// api
import {Api} from '../../../services/api';

// components
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
} from './styles';

import {AddCategorieTime} from './components/modals/add-category-time';
import {useTherapist} from '../../../context/hooks/Therapist/useTherapist';
import {handleGetTherapistCategoriesList} from '../../../domain/use-cases/therapies';
import {useAuth} from '../../../context/hooks/Auth/useAuth';

export function GerenciarConsultas() {
  const isFocused = useIsFocused();
  const {setAlert} = useAlert();
  const {token} = useAuth();
  const {therapie, handleGetTherapistInfo} = useTherapist();

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

  const parseErrors = (errors: any) => {
    const errArr = Object.values(errors).map(err => err);
    //@ts-ignore
    return errArr[0][0];
  };

  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const onTimeChangeBegin = async (event: any, selectedTime: any) => {
    // if (typeof selectedTime === 'undefined') {
    //   setOpenBeginTimePicker(false);
    //   return;
    // }
    // if (selectedBeginTime && selectedEndTime) {
    //   setSelectedEndTime(false);
    // }
    // beginTime.setHours(selectedTime?.getHours() - 3);
    // beginTime.setMinutes(selectedTime?.getMinutes());
    // setSelectedBeginTime(true);
    // setOpenBeginTimePicker(false);
  };

  const onTimeChangeEnd = async (event: any, selectedTime: any) => {
    // if (typeof selectedTime === 'undefined') {
    //   setOpenEndTimePicker(false);
    //   return;
    // }
    // const correctedTime = new Date();
    // correctedTime.setHours(selectedTime?.getHours() - 3);
    // correctedTime.setMinutes(selectedTime?.getMinutes());
    // if (selectedBeginTime && correctedTime?.getTime() < beginTime?.getTime()) {
    //   setAlert(
    //     'Erro',
    //     'Selecione um horário final para depois do horário inicial!',
    //   );
    //   return;
    // }
    // endTime.setHours(selectedTime.getHours() - 3);
    // endTime.setMinutes(selectedTime.getMinutes());
    // setSelectedEndTime(true);
    // setOpenEndTimePicker(false);
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
    try {
      setLoading(true);
      const {data} = await handleGetTherapistCategoriesList(String(token));

      //@ts-ignore
      let arrayCategorieList = [];

      if (data.length > 0) {
        data.forEach((cat: any) => {
          arrayCategorieList.push({
            label: cat.nome,
            value: cat.id,
          });
        });

        //@ts-ignore
        setCategoriesList(arrayCategorieList);
      } else {
        setCategoriesList([]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      //@ts-ignore
      if (selectedCategory?.length === 1) {
        const response = await Api.post('/v1/user/adicionar-categoria', {
          //@ts-ignore
          categoria_id: selectedCategory[0],
          tempo: 60,
          descricao: String(categoryDescription) ?? '',
          horario_inicio: formatTimeString(beginTime),
          horario_fim: formatTimeString(endTime),
          dias_semana: JSON.stringify(selectedDays),
          valor: String(selectedPrice),
        });

        if (response.data) {
          if (response.data.success) {
            handleGetTherapistInfo();
            fetchCategories();
            setOpenModal(false);
          }
          if (response.data.error) {
            setAlert('Erro', parseErrors(response.data.error));
          }
        }
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

      await handleGetTherapistInfo();
      fetchCategories();
      setIsLoading(false);
      setOpenModal(false);
      return;
    } catch (error) {
      //@ts-ignore
      setAlert('Erro', parseErrors(error.message));
    }
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
      fetchCategories();
    }
  }, [isFocused]);
  return (
    <>
      <AddCategorieTime
        isVisible={openModal}
        beginTime={beginTime}
        categoriesList={categoriesList}
        days={days}
        endTime={endTime}
        checkDaySelected={checkDaySelected}
        formatTimeString={formatTimeString}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        onTimeChangeBegin={onTimeChangeBegin}
        onTimeChangeEnd={onTimeChangeEnd}
        openDropDown={openDropDown}
        openEndTimePicker={openEndTimePicker}
        selectDay={selectDay}
        selectedDays={selectedDays}
        selectedBeginTime={selectedBeginTime}
        selectedPrice={selectedPrice}
        setSelectedPrice={selectedPrice}
        selectedCategory={selectedCategory}
        selectedEndTime={selectedEndTime}
        setCategoryDescription={setCategoryDescription}
        setOpenBeginTimePicker={setOpenBeginTimePicker}
        setOpenDropdown={() => console.log('kk')}
        setOpenEndTimePicker={setOpenEndTimePicker}
        setOpenModal={setOpenModal}
        setSelectedCategory={selectedCategory}
        setCategoriesList={setCategoriesList}
      />

      {isLoading ? (
        <Loading />
      ) : therapie?.length === 0 ? (
        <EmptyMessageContainer>
          <EmptyMessage>Sem horários ainda</EmptyMessage>
        </EmptyMessageContainer>
      ) : (
        <FlatList
          data={therapie}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TherapistCategory refresh={handleGetTherapistInfo} data={item} />
          )}
        />
      )}

      {categoriesList.length > 0 && (
        <AddButtonContainer>
          <AddButton onPress={() => setOpenModal(true)}>
            <AddButtonText>Adicionar</AddButtonText>
          </AddButton>
        </AddButtonContainer>
      )}
    </>
  );
}
