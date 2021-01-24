
import 'react-native-gesture-handler';
import React,{useState, useEffect, createContext} from 'react';
import {View,ActivityIndicator,StatusBar} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import SignUpScreen from './views/auth/SignUpScreen';
import SignInScreen from './views/auth/SignInScreen';
import SupportScreen from './views/SupportScreen';
import SplashScreen from './views/SplashScreen';
import RootStackScreen from './views/RootStackScreen';

import MainTabScreen from './views/MainTabScreen';

import { DrawerContent } from './views/DrawerContent';


//Importar los state del context
import AuthState from './context/auth/authState';
import { AuthContextApp } from './context/auth/authContext';
// import AuthContext from './context/auth/authContext';

const Drawer = createDrawerNavigator();

const App = () => {
  
  const [cargando, setCargando] = useState(false);
  const [autenticado, setAutenticado] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    };

    const loginReducer = (prevState, action) => {
      switch( action.type ) {
        case 'RETRIEVE_TOKEN': 
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGIN': 
          return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGOUT': 
          return {
            ...prevState,
            userName: null,
            userToken: null,
            isLoading: false,
          };
        case 'REGISTER': 
          return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
          };
      }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContextApp = React.useMemo(() => ({
      signIn: async(usuario, token) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        // console.log('foundUser: ', foundUser);
        const userToken = token;
        const userName = usuario;
        
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: async() => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {

      },
      toggleTheme: () => {
        setIsDarkTheme( isDarkTheme => !isDarkTheme );
      }
    }), []);

      useEffect(() => {
        cambiarPantalla = async () => {
          // setIsLoading(false);
          let userToken;
          userToken = null;
          try {
            userToken = await AsyncStorage.getItem('userToken');
          } catch(e) {
            console.log(e);
          }
          // console.log('user token: ', userToken);
          dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }

        cambiarPantalla();
      }, []);


  if(loginState.isLoading) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <>
      <AuthContextApp.Provider value={authContextApp}>
      <AuthState>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <NavigationContainer>
        { loginState.userToken !== null ? (

            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen}/>
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
      </AuthContextApp.Provider>
    </>
  );
};

export default App;
