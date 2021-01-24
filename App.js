
import 'react-native-gesture-handler';
import React,{useState, useEffect, useContext} from 'react';
import {View,ActivityIndicator,StatusBar} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import SignUpScreen from './views/auth/SignUpScreen';
import SignInScreen from './views/auth/SignInScreen';
import SupportScreen from './views/SupportScreen';
import SplashScreen from './views/SplashScreen';
import RootStackScreen from './views/RootStackScreen';

//Importar los state del context
import AuthState from './context/auth/authState';

const Drawer = createDrawerNavigator();

const App = () => {
  
  const [cargando, setCargando] = useState(false);
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    const consultarToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setAutenticado(token);
      console.log('Token desde la App: ', token);
    }
    consultarToken();
  }, []);

  if(cargando) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <>
      <AuthState>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <NavigationContainer>
        { autenticado !== null ? (

            <Drawer.Navigator>
              <Drawer.Screen name="Splash" component={SplashScreen}/>
              <Drawer.Screen name="Support" component={SupportScreen}/>
              
              <Drawer.Screen name="SignIn" component={SignInScreen}/>
              <Drawer.Screen name="SignUp" component={SignUpScreen}/>            
            </Drawer.Navigator>
          )
        :
            <RootStackScreen/>
        }
        </NavigationContainer>
      </AuthState>
    </>
  );
};

export default App;
