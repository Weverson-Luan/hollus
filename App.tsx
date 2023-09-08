/* eslint-disable prettier/prettier */
import React from 'react';
import './ignoreWarnings';
import {SheetProvider} from 'react-native-actions-sheet';
import {StatusBar} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {AuthProvider} from './src/context/AuthProvider';
import {ThemeProvider} from 'styled-components';
import theme from './src/styles/colors/theme';
import {CustomAlert} from './src/components/CustomAlert';
import {AppRoutes} from './src/routes';
import {AlertProvider} from './src/context/Alert';

function App() {
  return (
    <NativeBaseProvider>
      <SheetProvider>
        <AuthProvider>
          <AlertProvider>
            <ThemeProvider theme={theme}>
              <StatusBar barStyle={'light-content'} />

              <CustomAlert />
              <AppRoutes />
            </ThemeProvider>
          </AlertProvider>
        </AuthProvider>
      </SheetProvider>
    </NativeBaseProvider>
  );
}

export default App;
