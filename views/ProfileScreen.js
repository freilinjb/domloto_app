import React,{useState
} from 'react';
// import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {DataTable} from 'react-native-paper';

// import React,{ useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableHighlightComponent,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
  const [numeros, setNumeros] = useState('');

  const numerosButton = (numero)=> {
    numero += numeros;
    setNumeros(numero);
  }

  // const 
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Bienvenido!</Text>
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            style={[styles.textInput, {backgroundColor: '#FFF', fontSize: 40, textAlign: 'center'}]}
            value={numeros}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
        </View>
        {/* SEPARADOR */}
        <View style={styles.separator} />
        <DataTable.Row style={{height: 80}}>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableHighlight style={{alignItems:'center'}} onPress={()=>numerosButton('7')}>
              <Text style={{fontSize: 40, textAlign: 'center'}}>M</Text>
            </TouchableHighlight>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}>8</Text>
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}>9</Text>
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}> - </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{height: 80}}>
        <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}>4</Text>
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}>5</Text>
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}>6</Text>
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}> - </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{height: 80}}>
        <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}>1</Text>
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}>2</Text>
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}>3</Text>
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}> - </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{height: 80}}>
        <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}> - </Text>
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}> 0 </Text>
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}> - </Text>
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{borderWidth: 0.5,justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 40}}> - </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});
