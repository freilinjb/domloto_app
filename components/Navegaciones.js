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
import LotteryState from './context/lottery/lotteryState';

import { AuthContextApp } from './context/auth/authContext';

// import AuthContext from './context/auth/authContext';

const Drawer = createDrawerNavigator();