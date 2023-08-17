import { useContext } from 'react';
import AlertContext from '../../Alert';

const useAlert = () => useContext(AlertContext);

export default useAlert;