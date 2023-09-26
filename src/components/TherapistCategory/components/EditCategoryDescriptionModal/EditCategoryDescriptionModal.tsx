/**
 * IMPORTS
 */
import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Box} from '../../../Box';

import {X} from 'phosphor-react-native';

// api services
import {Api} from '../../../../services/api';

// contexto
import {useTherapist} from '../../../../context/hooks/Therapist/useTherapist';
import useAlert from '../../../../context/hooks/Alert/useAlert';

// typings
import {IDescriptionModalProps} from './interface';

//styled-components
import {
  EditCategoryDescriptionModal,
  EditCategoryDescriptionView,
  AddCategoryTimeHeader,
  AddCategoryTime,
  AddCategoryTimeHeaderButton,
  AddCategoryTimeSaveButton,
  AddCategoryTimeHeaderText,
  CategoryDescriptionTextInput,
} from './styles';

const DescriptionEditModal = ({
  setOpenDescriptionModal,
  openDescriptionModal,
  setCategoriaDescricao,
  categoriaDescricao,
  data,
}: IDescriptionModalProps) => {
  const theme = useTheme();
  const {setAlert} = useAlert();
  const {handleGetTherapistInfo} = useTherapist();
  const [isLoading, setIsLoading] = useState(false);

  const handleEditDescription = async () => {
    try {
      setIsLoading(true);

      await Api.post('/v1/user/horario/salvar-descricao', {
        terapia_id: data?.horarios[0]?.terapeuta_categoria_id,
        descricao: categoriaDescricao,
      });

      setAlert('Descrição alterada', 'Descrição alterada com sucesso!');

      setOpenDescriptionModal(false);

      handleGetTherapistInfo();
    } catch (error) {
      setAlert('Descrição', 'Não foi possível editar descrição!');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <EditCategoryDescriptionModal
      onRequestClose={() => setOpenDescriptionModal(false)}
      visible={openDescriptionModal}
      transparent>
      <EditCategoryDescriptionView>
        <Box
          width="350px"
          height="250px"
          backgroundColor={theme.colors.white}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius={8}>
          <AddCategoryTimeHeader>
            <AddCategoryTimeHeaderText>
              Editar Descrição
            </AddCategoryTimeHeaderText>
            <AddCategoryTimeHeaderButton
              onPress={() => setOpenDescriptionModal(false)}>
              <X size={16} color={theme.colors.white} />
            </AddCategoryTimeHeaderButton>
          </AddCategoryTimeHeader>
          <CategoryDescriptionTextInput
            placeholder="Escreva um pouco sobre a consulta"
            multiline
            defaultValue={data?.descricao}
            maxLength={300}
            onChangeText={setCategoriaDescricao}
          />
          {categoriaDescricao === '' ||
          categoriaDescricao === data?.descricao ? null : (
            <AddCategoryTimeSaveButton
              disabled={isLoading || categoriaDescricao === ''}
              onPress={handleEditDescription}>
              {isLoading ? (
                <ActivityIndicator size={24} color={theme.colors.white} />
              ) : (
                <AddCategoryTime>Salvar</AddCategoryTime>
              )}
            </AddCategoryTimeSaveButton>
          )}
        </Box>
      </EditCategoryDescriptionView>
    </EditCategoryDescriptionModal>
  );
};

/**
 * EXPORTS
 */
export {DescriptionEditModal};
