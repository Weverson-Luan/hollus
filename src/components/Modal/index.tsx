import React, {useState} from 'react';
import {Modal as ModalNative, Text} from 'react-native';
import {useTheme} from 'styled-components';
import {Button} from '../Button';
import {Input} from '../Input';
import {IModalProps} from './modal';

import {
  Wrapper,
  Title,
  WrapperModal,
  LabelText,
  WrapperButton,
  WrapperInput,
} from './styles';
import {ActivityIndication} from '../Spinner';

export function Address({
  visible,
  onChangeCep,
  handleFetchCepAPI,
  onChangeCity,
  valueCity,
  onChangeLogadouro,
  valueLogadouro,
  valueDistrict,
  onChangeDistrict,
  valueNumber,
  onChangeNumber,
  valueComplement,
  onChangeComplement,
  handleSaveAndress,
  ...rest
}: IModalProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  console.log('Setting', onChangeCep);
  return (
    <Wrapper>
      <Title>Cadastre novo enderço</Title>

      <WrapperModal>
        <WrapperInput>
          <LabelText>Cep</LabelText>
          <Input
            width={'350px'}
            height={'50px'}
            color={theme.colors.white}
            placeholder="Informe seu cep"
            placeholderTextColor={theme.colors.gray_80}
            onChangeText={onChangeCep}
            onEndEditing={handleFetchCepAPI}
          />
        </WrapperInput>
        <WrapperInput>
          <LabelText>Cidade</LabelText>
          <Input
            width={'350px'}
            height={'50px'}
            color={theme.colors.white}
            autoCorrect={false}
            placeholder="Informe sua cidade"
            placeholderTextColor={theme.colors.gray_80}
            onChangeText={onChangeCity}
            value={valueCity}
          />
        </WrapperInput>

        <WrapperInput>
          <LabelText>Rua</LabelText>
          <Input
            color="white"
            width={'350px'}
            height={'50px'}
            placeholder="Informe sua rua"
            placeholderTextColor={theme.colors.gray_80}
            onChangeText={onChangeLogadouro}
            value={valueLogadouro}
          />
        </WrapperInput>

        <WrapperInput>
          <LabelText>Bairro</LabelText>
          <Input
            color="white"
            width={'350px'}
            height={'50px'}
            placeholder="Informe seu bairro"
            placeholderTextColor={theme.colors.gray_80}
            onChangeText={onChangeDistrict}
            value={valueDistrict}
          />
        </WrapperInput>

        <WrapperInput>
          <LabelText>Numero</LabelText>
          <Input
            color="white"
            width={'350px'}
            height={'50px'}
            placeholder="Informe seu número"
            placeholderTextColor={theme.colors.gray_80}
            onChangeText={onChangeNumber}
            value={valueNumber}
          />
        </WrapperInput>

        <WrapperInput>
          <LabelText>Complemento</LabelText>
          <Input
            color="white"
            width={'350px'}
            height={'50px'}
            placeholder="Complemento ex: Bloco 01"
            placeholderTextColor={theme.colors.gray_80}
            onChangeText={onChangeComplement}
            value={valueComplement}
          />
        </WrapperInput>
      </WrapperModal>

      <WrapperButton>
        <Button
          height="50px"
          background_color={loading ? theme.colors.white : theme.colors.orange}
          onPress={handleSaveAndress}>
          {loading ? (
            <ActivityIndication />
          ) : (
            <Text
              style={{
                fontSize: 20,
                color: theme.colors.white,
                fontWeight: '500',
              }}>
              Cadastre
            </Text>
          )}
        </Button>
      </WrapperButton>
    </Wrapper>
  );
}
