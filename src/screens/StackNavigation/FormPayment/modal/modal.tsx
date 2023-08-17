import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';

import Modal from 'react-native-modal';

type IModalCustomProps = {
  text?: string;
  isOpen: boolean;
  children: React.ReactNode;
};

import {Container, Text} from './styles';

const ModalCustom = ({children, isOpen}: IModalCustomProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisibly, setModalVisiby] = useState(false);
  return (
    <Modal isVisible={isOpen} animationIn={'fadeIn'} animationInTiming={5000}>
      <Container>
        {isLoading ? (
          <ActivityIndicator color="red" size={24} />
        ) : (
          <>{children}</>
        )}
      </Container>
    </Modal>
  );
};

export {ModalCustom};
