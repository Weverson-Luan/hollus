import React, { useEffect, useRef, useState } from "react";
import { Image, Modal as ModalNative, Text, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Button } from "../Button";
import { Input } from "../Input";
import { IModalProps } from "./modalNews";

import {
  Wrapper,
  Title,
  WrapperModal,
  LabelText,
  WrapperButton,
} from "./styles";

export function ModalNews({ close, noticia, visible, ...rest }: IModalProps) {
  const theme = useTheme();
  // console.log(noticia);
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const open = () => {
    actionSheetRef.current?.show();
  };
  return (
    <>
      
    </>
  );
}
