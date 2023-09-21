import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {Input} from '../../../components/Input';
import {LabelText} from '../../../components/Modal/styles';
import useAlert from '../../../context/hooks/Alert/useAlert';
import {Api} from '../../../services/api';
import {Main} from './styles';
import {useNavigation} from '@react-navigation/native';

import {Box} from '../../../components/Box';
import {Button} from '../../../components/Button';

export function FaleConosco() {
  const theme = useTheme();
  const navigation = useNavigation();
  const {setAlert} = useAlert();

  const [texto, setTexto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const {data} = await Api.post('/v1/fale-conosco/criar-solicitacao', {
        titulo: 'Solicitação Fale Conosco',
        texto: texto,
      });

      if (texto === '') {
        setAlert(
          'Preencha todos os campos',
          'Preencha o campo de texto com sua dúvida ou problema encontrado!',
        );
        return;
      }

      if (data.success) {
        setAlert(
          'Solicitação criada',
          'A sua solicitação foi criada com sucesso. Agradecemos pelo contato!',
        );
        navigation.navigate('HomeTherapist');
        setTexto('');
      } else {
        setAlert('Erro ao criar solicitação', 'Por favor, tente novamente');
      }
    } catch (error) {
      setAlert('Erro ao criar solicitação', 'Por favor, tente novamente');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Main>
      <View style={styles.mainView}>
        <Box width="100%" height={60}>
          <LabelText>
            Teve uma dúvida ou um problema?{`\n`} Fale conosco!
          </LabelText>
        </Box>
        <Box width="100%" height={100} marginBottom={24}>
          <Input
            onChangeText={setTexto}
            multiline
            width="100%"
            height="100px"
          />
        </Box>

        <Box
          width="100%"
          height={'80px'}
          flexDirection="row"
          alignItems="center"
          justifyContent="center">
          <Button
            width="100%"
            height="45px"
            background_color={
              isLoading ? theme.colors.white : theme.colors.orange
            }
            border
            disabled={isLoading}
            activeOpacity={0.7}
            onPress={() => {
              handleSubmit();
            }}>
            <Text style={styles.text}>
              {isLoading ? (
                <ActivityIndicator color={theme.colors.orange} size={24} />
              ) : (
                'Enviar'
              )}
            </Text>
          </Button>
        </Box>
      </View>
    </Main>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: RFValue(16),
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '500',
  },
});
