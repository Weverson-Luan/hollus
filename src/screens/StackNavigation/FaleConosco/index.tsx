import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { LabelText } from "../../../components/Modal/styles";
import useAlert from "../../../context/hooks/Alert/useAlert";
import { Api } from "../../../services/api";
import theme from "../../../styles/colors/theme";
import { Main } from "./styles";

export function FaleConosco({ route, navigation }) {
  const theme = useTheme();
  const [texto, setTexto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useAlert();

  const handleSubmit = async () => {
    setIsLoading(true);
    const { data } = await Api.post("/v1/fale-conosco/criar-solicitacao", {
      titulo: "Solicitação Fale Conosco",
      texto: texto,
    });
    setIsLoading(false);
    if (data.success) {
      setAlert(
        "Solicitação criada",
        "A sua solicitação foi criada com sucesso. Agradecemos pelo contato!"
      );
      navigation.navigate("Home");
    } else {
      setAlert("Erro ao criar solicitação", "Por favor, tente novamente");
    }
  };

  return (
    <Main>
      <View style={styles.mainView}>
        <LabelText>
          Teve uma dúvida ou um problema?{`\n`} Fale conosco!
        </LabelText>
        <Input onChangeText={setTexto} multiline style={styles.input} />
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => {
            if (texto === "") {
              setAlert(
                "Preencha todos os campos",
                "Preencha o campo de texto com sua dúvida ou problema encontrado!"
              );
            } else {
              handleSubmit();
            }
          }}
          style={styles.touchable}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.white} size={RFValue(30)} />
          ) : (
            <Text style={styles.text}>Enviar</Text>
          )}
        </TouchableOpacity>
      </View>
    </Main>
  );
}

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  input: {
    padding: 10,
    width: 300,
    height: 100,
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 100,
    borderRadius: 10,
    backgroundColor: theme.colors.orange_100,
  },
  text: {
    fontSize: RFValue(16),
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
