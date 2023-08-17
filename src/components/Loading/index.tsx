import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components';

type ComponentCustomProps = {
  text: string;
};

import {ContainerLoading, ContentLoading, TitleLoading} from './styles';

const Loading = () => {
  const theme = useTheme();
  return (
    <ContainerLoading>
      <ContentLoading>
        <ActivityIndicator size={32} color={theme.colors.orange} />
        <TitleLoading>Carregando...</TitleLoading>
      </ContentLoading>
    </ContainerLoading>
  );
};

export {Loading};
