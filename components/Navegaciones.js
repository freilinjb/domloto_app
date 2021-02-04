import 'react-native-gesture-handler';
import React, {useState, useEffect, useContext} from 'react';
import {View, ActivityIndicator, StatusBar, Text} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import SignUpScreen from '../views/auth/SignUpScreen';
import SignInScreen from '../views/auth/SignInScreen';
import SupportScreen from '../views/SupportScreen';
import RootStackScreen from '../views/RootStackScreen';

import MainTabScreen from '../views/MainTabScreen';

import {DrawerContent} from '../views/DrawerContent';

import {AuthContext} from '../context/auth/authContext';
import LotteryContext from '../context/lottery/lotteryContext';

// import AuthContext from './context/auth/authContext';
import tokenAuth from '../config/token';

const Drawer = createDrawerNavigator();

const Navegaciones = ({tokenLocal}) => {
  const {
    token,
    autenticado,
    cargando,
    cerrarSesion,
    usuarioAutenticado,
  } = useContext(AuthContext);
  const {getSorteos} = useContext(LotteryContext);
  // const {  } = useContext(LotteryContext);

  useEffect(() => {
    const iniciar = async () => {
      respuesta = await AsyncStorage.getItem('token').then((value) => {
  
        // if(value) {
        //   console.log('tokenApp: ', value);
        //   usuarioAutenticado(value);
        //   tokenAuth(value);
        // }  else {
        //   console.log('tokenApp: ', value);
        //   console.log('else');
        // }

        return value;
      });
      if(respuesta) {
        usuarioAutenticado(respuesta);
      } else {
        cerrarSesion();
      }
      console.log('respuesta: ', respuesta);
    }

    iniciar();
  }, []);

  // useEffect(() => {
  //   //Cargando informacion del usuario autenticado
  //   if (tokenLocal) {
  //     console.log('Token enviado: ', tokenLocal);
  //     usuarioAutenticado(tokenLocal);
  //     getSorteos();
  //   } else {
  //     console.log('hoka: ', tokenLocal);
  //     // cerrarSesion();
  //   }
  // }, []);

  //   console.log('cargando: ', cargando);
  if (cargando) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <>
      {/* <LotteryState> */}
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <NavigationContainer>
        {token !== null && autenticado === true ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            <Drawer.Screen name="Support" component={SupportScreen} />

            <Drawer.Screen name="SignIn" component={SignInScreen} />
            <Drawer.Screen name="SignUp" component={SignUpScreen} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
      {/* </LotteryState> */}
    </>
  );
};

export default Navegaciones;
