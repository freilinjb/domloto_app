import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from './auth/SignUpScreen';
import SignInScreen from './auth/SignInScreen';
import LeadingPage from './LeadingPage';


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="LeadingPage" component={LeadingPage}/>
        <RootStack.Screen name="SignUp" component={SignUpScreen}/>
        <RootStack.Screen name="SignIn" component={SignInScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;