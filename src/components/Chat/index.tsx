/* eslint-disable import/order */
import React from "react";
import { Container, WrapperInput, WrapperIcon } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Input } from "../Input";

export function Chat() {
  return (
    <Container>
      <WrapperIcon>
        <Ionicons name="search" size={22} />
      </WrapperIcon>
      <WrapperInput>
        <Input
          placeholder="Busque um profissional ou local"
          
          color="#fff"
          height="40px"
          width="100%"
        />
      </WrapperInput>
    </Container>
  );
}
