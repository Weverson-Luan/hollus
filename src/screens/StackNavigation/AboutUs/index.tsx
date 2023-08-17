import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "styled-components";
import { Main } from "./styles";

export function AboutUs({ route, navigation }) {
  const theme = useTheme();
  return (
    <Main>
      <View style={styles.mainView}>
        <View>
          <Text style={styles.header}>SOBRE NÓS</Text>
          <Text style={styles.subHeader}>Lorem ipsum sit amet</Text>
        </View>
        <View>
          <Text style={styles.firstText}>
            No Brasil, somos pioneiros no desenvolvimento de software, capazes
            de facilitar a vida dos usuàrios, que tange a captura de dados,
            fotos e identificação.
          </Text>
          <Text style={styles.secondText}>
            Fornecemos insumos para empresas de todos os setores, dentre eles:
            telecomunicações, bancos industriais, órgãos públicos, empresas de
            transportes, eventos, comércio e instituições de ensino.
          </Text>
        </View>
      </View>
    </Main>
  );
}

const styles = StyleSheet.create({
  mainView: { justifyContent: "flex-start", paddingHorizontal: 20 },
  header: {
    fontSize: 30,
    // fontWeight: "bold",
    marginVertical: 10,
    fontFamily: "cinzel-bold",
  },
  subHeader: {
    // fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
    textAlign: "left",
    color: "#38C7C7",
    fontFamily: "cinzel-bold",
  },
  firstText: {
    fontSize: 15,
    marginVertical: 10,
    textAlign: "justify",
    fontFamily: "cinzel-bold",
  },
  secondText: {
    fontSize: 15,
    marginVertical: 10,
    textAlign: "justify",
    fontFamily: "cinzel-bold",
  },
});
