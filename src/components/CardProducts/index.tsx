import React from 'react';
import { Container, WrapperImageProduct, ImageProduct, TitleProduct } from './styles';

export function CardProducts({ data }) {
  return (
    <Container>
      <WrapperImageProduct>
        <ImageProduct source={{ uri: data.image }} />
        <TitleProduct>Óleo Floral</TitleProduct>
      </WrapperImageProduct>
    </Container>
  );
}
