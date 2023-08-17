import React, { useState } from "react";
import { Alert, Modal as ModalRN } from "react-native";
import { useTheme } from "styled-components";
import {
  Modal,
  FormControl,
  Text,
  TextArea,
  VStack,
  Select,
  CheckIcon,
  View,
} from "native-base";

//components
import { Button as ButtonCancel } from "../../components/Button";

// component use productSelect
import { TextButton } from "../../screens/StackNavigation/ProductSelected/styles";

//typings
import { IModalCancelProps } from "./index.d";

import { styles } from "./styles";
import { Api } from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import useAlert from "../../context/hooks/Alert/useAlert";

export function ModalCancelScheduling({
  onIsModalCancel,
  isModalCancel,
  data,
  disabled = false,
  disabledText,
}: IModalCancelProps) {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  let [service, setService] = useState("");
  const navigation = useNavigation();
  function handleIsModal() {
    onIsModalCancel();
    setShowModal(!showModal);
  }
  const { setAlert } = useAlert();

  const submitCancel = async () => {
    const res = await Api.delete("v1/consulta/cancelar/" + data.id);
    setAlert('Erro', res.data.message);
    // Alert.alert(res.data.message, "Retorne à tela de consultas.", [
    //   {
    //     text: "OK",
    //     onPress: () => navigation.navigate("Consultas"),
    //     style: "cancel",
    //   },
    // ]);
    handleIsModal();
  };

  return (
    <>
      <ButtonCancel
        onPress={() => handleIsModal()}
        width="100%"
        height="50px"
        background_color={theme.colors.orange_100}
        border
        disabled={disabled}
      >
        <TextButton>
          {disabled ? disabledText : "Cancelar atendimento"}
        </TextButton>
      </ButtonCancel>

      <ModalRN
        transparent
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        style={styles.modalRN}
      >
        <Modal.Content style={styles.modalContent}>
          <View style={styles.wrapperHeader}>
            <Modal.CloseButton
              style={styles.iconClosed}
              onPress={() => setShowModal(false)}
            />
            <Text style={styles.titleCancelScheduling}>
              Cancelar agendamento
            </Text>
          </View>

          <Modal.Body>
            <FormControl>
              <Text style={styles.titleReason}>Motivo do cancelamento</Text>
              <TextArea
                style={{
                  fontSize: 16,
                }}
                shadow={0.8}
                h={180}
                w="100%"
                placeholder="Digite o motivo..."
                placeholderTextColor={theme.colors.gray_90}
              />
            </FormControl>
          </Modal.Body>

          <View style={styles.wrapperSelect}>
            <Text style={styles.titleRescheduling}>Reagendamento</Text>
            <VStack alignItems="center" space={4}>
              <Select
                borderRadius={6}
                shadow={0.1}
                selectedValue={service}
                width={"96%"}
                accessibilityLabel="Selecione a opção..."
                placeholder="Selecione motivo do cancelamento"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                _light={{ bg: "white" }}
                _dark={{ bg: "white" }}
                onValueChange={(itemValue) => setService(itemValue)}
              >
                <Select.Item shadow={2} label="SIM" value="ux" />
                <Select.Item shadow={2} label="NÃO" value="web" />
                <Select.Item
                  shadow={2}
                  label="ENTRE EM CONTATO"
                  value="cross"
                />
                <Select.Item shadow={2} label="REAGENDAMENTO" value="ui" />
                <Select.Item shadow={2} label="OUTRO DIA" value="backend" />
              </Select>
            </VStack>
          </View>

          <Modal.Footer>
            <ButtonCancel
              onPress={() => submitCancel()}
              width="100%"
              height="50px"
              background_color={theme.colors.orange_100}
              border
            >
              <TextButton>Confirmar cancelamento</TextButton>
            </ButtonCancel>
          </Modal.Footer>
        </Modal.Content>
      </ModalRN>
    </>
  );
}
