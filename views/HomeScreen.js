import React from 'react';
import {Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({navigation}) => {

  const removerStorage = async() => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userToken');
    
    // navigation.replace('SignIn');
  }

  return (
    <>
      <Text>HomeScreen</Text>
      <Button
        onPress = {() => removerStorage()}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </>
  );
};

export default HomeScreen;
