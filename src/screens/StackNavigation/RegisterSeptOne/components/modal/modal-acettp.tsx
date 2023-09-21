/**
 * IMPORTS
 */
import React from 'react';
import {ScrollView} from 'react-native';
import Modal from 'react-native-modal';

import {Box} from '../../../../../components/Box';

import {IModalProps} from './interface';

import {Main, TitleModal, DescriptionModal, TitleButtonModal} from './styles';
import {Button} from '../../../../../components/Button';
import {useTheme} from 'styled-components';

const ModalAceppt = ({isVisible, handleAceppt, handleCancel}: IModalProps) => {
  const theme = useTheme();

  return (
    <Modal isVisible={isVisible}>
      <ScrollView>
        <Main>
          <Box
            width="100%"
            height={'45px'}
            flexDirection="column"
            alignItems="center"
            paddingTop={16}>
            <TitleModal>Termos de uso</TitleModal>
            <DescriptionModal>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              rhoncus eget massa vitae viverra. Cras dui neque, iaculis at
              imperdiet non, elementum non mi. Maecenas eu massa nisl. Quisque
              nec lectus mattis, varius orci sit amet, varius dui. Vivamus nec
              massa eget felis varius suscipit. Nulla non sollicitudin purus, ac
              condimentum libero. Suspendisse commodo vel nulla sed interdum.
              Pellentesque nisi sem, mollis tincidunt euismod vitae, tincidunt
              vel nisl. Morbi facilisis erat non nunc tincidunt efficitur. Donec
              aliquet dui dui, sed fermentum nunc feugiat nec.
            </DescriptionModal>
          </Box>

          <Box
            width="100%"
            height={'100px'}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginTop={24}>
            <Button
              activeOpacity={0.7}
              onPress={handleCancel}
              width="150px"
              height={'45px'}
              background_color={theme.colors.orange}>
              <TitleButtonModal>Não</TitleButtonModal>
            </Button>
            <Button
              activeOpacity={0.7}
              onPress={handleAceppt}
              width="150px"
              height={'45px'}
              background_color={theme.colors.orange}>
              <TitleButtonModal>SIM</TitleButtonModal>
            </Button>
          </Box>
        </Main>
      </ScrollView>
    </Modal>
  );
};

/**
 * EXPORTS
 */
export {ModalAceppt};
