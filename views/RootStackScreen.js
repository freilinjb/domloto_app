import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from './auth/SignUpScreen';
import SignInScreen from './auth/SignInScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SignUp" component={SignUpScreen}/>
        <RootStack.Screen name="SignIn" component={SignInScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;