import { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import { Api } from "../../services/api";

const ResumoConsulta = (data_hora, terapeuta) => {
  const theme = useTheme();

  useEffect(() => {
    // console.log(terapeuta);
  }, []);
  return (
    <Content>
      <ImageTherapist
        source={{
          uri: terapeuta.foto,
        }}
      />
      <WrapperInfo>
        <WrapperHeader>
          <Title>{terapeuta.nome}</Title>
        </WrapperHeader>

        <WrapperLocation>
          <WrapperLocationHeader>
            <WrapperLocatinIcon>
              <FontAwesome5Icon
                name="calendar"
                size={18}
                color={theme.colors.gray_150}
              />
              <SubTitleLocation>Dia da Consulta:</SubTitleLocation>
            </WrapperLocatinIcon>

            <TitleLocationMap>00/00/00</TitleLocationMap>
          </WrapperLocationHeader>

          <WrapperLocationHeader>
            <WrapperLocatinIcon>
              <FontAwesome5Icon
                name="clock"
                size={18}
                color={theme.colors.gray_80}
              />
              <SubTitleLocation>Horário da Consulta:</SubTitleLocation>
            </WrapperLocatinIcon>

            <TitleLocationMap>16:00</TitleLocationMap>
          </WrapperLocationHeader>

          <WrapperLocationHeader>
            <WrapperLocatinIcon>
              <Entypo
                name="location-pin"
                size={18}
                color={theme.colors.gray_80}
              />
              <SubTitleLocation>espaço terapeuta</SubTitleLocation>
            </WrapperLocatinIcon>
          </WrapperLocationHeader>

          <SubTitleLocation>endereço</SubTitleLocation>
        </WrapperLocation>
      </WrapperInfo>
    </Content>
  );
};

export default ResumoConsulta;
