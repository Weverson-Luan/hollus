import React from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';

//icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//components
import { CardConsultInfo } from '../../../components/CardConsultInfo';

//services
import { info } from '../../../services/api.fake-info-consutations';

//styled-components
import { styleSheet, Container, WrapperFilter, Title, TitleMore } from './styles';

export function FilterMoreRecent() {
  const theme = useTheme();
  return (
    <Container>
      <WrapperFilter>
        <Title>Filtrar por :</Title>
        <TitleMore>Mais recente</TitleMore>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={14}
          color={theme.colors.gray_150}
          style={styleSheet.container}
        />
      </WrapperFilter>

      <FlatList
        data={info}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <CardConsultInfo info={item} />}
      />
    </Container>
  );
}
