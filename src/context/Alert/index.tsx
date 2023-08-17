import React from 'react';
import {createContext, useState} from 'react';
import {ISetAlertProps} from './index.d';

const initialState = {
  text: '',
  title: '',
};

const AlertContext = createContext({
  ...initialState,
  setAlert: (title: string, text: string) => {},
});

export const AlertProvider = ({children}) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const setAlert = (title: string, text: string) => {
    if (typeof title !== 'string' || typeof text !== 'string') {
      return 'Error: title and text must be strings';
    }
    setText(text);
    setTitle(title);
    return;
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        title,
        setAlert,
      }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
