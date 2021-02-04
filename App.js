import 'react-native-gesture-handler';
import React, {useState, useEffect, createContext} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

//Importar los state del context
import AuthState from './context/auth/authState';
import LotteryState from './context/lottery/lotteryState';

import Navegaciones from './components/Navegaciones';
import tokenAuth from './config/token';
const App = () => {
  const [tokenLocal, setTokenLocal] = useState(null);

  // if (AsyncStorage.getItem('token')) {
  //   AsyncStorage.getItem('token').then((value) => {

  //     if(typeof value === "string") {
  //       console.log('tokenApp: ', value);
  //       setTokenLocal(value);
  //       tokenAuth(value);
  //     }  else {
  //       console.log('else');
  //     }
  //   });
  // } else {
  //   console.log('hola');
  // }

  return (
    <>
      <AuthState>
        <LotteryState>
          <Navegaciones tokenLocal={tokenLocal}/>
        </LotteryState>
      </AuthState>
    </>
  );
};

export default App;
