import React from 'react';

import {App as MaterialTopTabs} from '../../MaterialTopTabs';

import {Container} from './styles';

export function ScreenQuery({navigation}: any) {
  return (
    <Container>
      {/* <HeaderDrawer navigation={navigation} /> */}
      <MaterialTopTabs navigation={navigation} />
    </Container>
  );
}
