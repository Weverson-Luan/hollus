import React, { useRef, useState } from "react";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

// components
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/Input";

// styles-components
import {
  Container,
  WrapperHeader,
  WrapperDescription,
  Title,
  SubTitle,
  WrapperInput,
  LabelInput,
  WrapperButtons,
  TitleSearchTherapy,
  LabelError,
  SubLabel,
} from "./styles";
import { useAuth, useRegister } from "../../../context/hooks/Auth/useAuth";
import { Alert, Switch, Text, TouchableOpacity, View } from "react-native";
import { Form, Formik } from "formik";
import { RegisterSchema } from "./Schema/RegisterSchema";

import { BarPasswordStrengthDisplay } from "react-native-password-strength-meter";
import MaskInput from "react-native-mask-input";
import { RFValue } from "react-native-responsive-fontsize";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { ActivityIndication } from "../../../components/Spinner";
import { Api } from "../../../services/api";

export function ForgotPassword() {
  const theme = useTheme();
  const auth = useAuth();
  const navigation = useNavigation();
  const policiesRef = useRef<ActionSheetRef>(null);
  const [loading, setLoading] = useState(false);
  const handleForgot = (values) => {
    // console.log(values)
  };
  return (
    <>
      <Container>
        <WrapperDescription>
          {/* <Title>Recuperação de senha</Title> */}
          <SubTitle>
            Para redefinir sua senha, insira abaixo o e-mail da sua conta.
          </SubTitle>
        </WrapperDescription>

        <WrapperInput>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => handleForgot(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldValue,
            }) => (
              <>
                <LabelInput>
                  E-mail{" "}
                  {errors.email ? (
                    <LabelError>{errors.email}</LabelError>
                  ) : null}
                </LabelInput>
                <Input
                  placeholder="Digite o seu e-mail"
                  placeholderTextColor={theme.colors.gray_80}
                  width={"100%"}
                  height={`${RFValue(50)}px`}
                  color={theme.colors.white}
                  autoCorrect={false}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {isValid ? (
                  <Button
                    width="100%"
                    height="45px"
                    background_color={
                      loading ? theme.colors.white : theme.colors.orange
                    }
                    onPress={handleSubmit}
                    disabled={loading}
                    // onPress={() => navigation.navigate('RegisterSeptFour')}
                    // onPress={() => navigation.navigate('RegisterSeptTwo')}
                  >
                    <TitleSearchTherapy>
                      {loading ? <ActivityIndication /> : "Próximo"}
                    </TitleSearchTherapy>
                  </Button>
                ) : null}
              </>
            )}
          </Formik>
          {/* <LabelInput>Telefone*</LabelInput>
          <Input
            placeholder="(XX) X XXXX-XXXX"
            placeholderTextColor={theme.colors.gray_80}
            width={"100%"}
            height={`${RFValue(50)}px`}
            onChangeText={setPhone}
            color={theme.colors.white}
            autoCorrect={false}
          />

          <LabelInput>Estado*</LabelInput>
          <Input
            placeholder="Digite seu estado"
            placeholderTextColor={theme.colors.gray_80}
            width={"100%"}
            height={`${RFValue(50)}px`}
            color={theme.colors.white}
            autoCorrect={false}
          />

          <LabelInput>Cidade*</LabelInput>
          <Input
            placeholder="Digite sua cidade"
            placeholderTextColor={theme.colors.gray_80}
            width={"100%"}
            height={`${RFValue(50)}px`}
            color={theme.colors.white}
            autoCorrect={false}
          /> */}
        </WrapperInput>
      </Container>
    </>
  );
}
