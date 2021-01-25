import React, {useState} from 'react';
// import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {DataTable} from 'react-native-paper';

// import React,{ useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Keyboard,
  TextInput,
  Platform,
  StyleSheet,
  Button,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Surface} from 'react-native-paper';
import VirtualKeyboardNumeros from 'react-native-virtual-keyboard';
import VirtualKeyboardMontos from 'react-native-virtual-keyboard';

const ProfileScreen = () => {
  const [operacion, setOperacion] = useState('monto');
  const [numeros, setNumeros] = useState('');
  const [montos, setMontos] = useState(0);
  const [tipoLoteria, setTipoLoteria] = useState('');

  const changeMonto = (texto) => {
    setMontos(Number(texto));
  }
  const changeText = (newText) => {
    if (newText.length <= 6 && operacion === 'numeros') {
      console.log('hola: ', newText);
      let contadorTipoJuego = 0;
      let temp = '';
      for (let i = 0; i < newText.length; i++) {
        console.log('hola: ', newText[i]);
        if (i > 0 && i % 2 == 0) {
          temp += ' - ';
          contadorTipoJuego++;
        }
        temp += newText[i];
      }

      if (contadorTipoJuego !== 0 && contadorTipoJuego < 3) {
        const tipo = ['SUPER PALE', 'TRIPLETA'];
        setTipoLoteria(tipo[contadorTipoJuego - 1]);
      } else if (contadorTipoJuego === 0) {
        setTipoLoteria('PALE');
      } else if (newText.length === 1) {
        setTipoLoteria(' - - - ');
      }

      setNumeros(temp);
    }
     else {
      Alert.alert('Error!', 'Para donde vas tiguere', [{text: 'Okay'}]);
    }
  };

  const cambiarOperacion = () => {
    console.log('operacion antes: ', operacion);

    if(operacion === 'numeros') {
      setOperacion('monto');
    } else {
      setOperacion('numeros');
    }
    

    console.log('operacion: despues', operacion);
  }

  // const
  return (
    <>
      <View style={styles.container}>
        {/* <View style={styles.header}> */}
          {/* <Text style={styles.text_header}>Bienvenido!</Text> */}
        {/* </View> */}
        
        <Surface style={styles.surface}>
        <LinearGradient colors={['#D8CB00', '#FFDA00']}>

          <ScrollView>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>#</DataTable.Title>
                <DataTable.Title>Tipo de juego</DataTable.Title>
                <DataTable.Title numeric>Numeros</DataTable.Title>
                <DataTable.Title numeric>Cantidad</DataTable.Title>
                <DataTable.Title numeric>Accion</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>1</DataTable.Cell>
                <DataTable.Cell>TRIPLETA</DataTable.Cell>
                <DataTable.Cell numeric>10 - 45 -10</DataTable.Cell>
                <DataTable.Cell numeric>RD$ 50.00</DataTable.Cell>
                <DataTable.Cell numeric>
                  <FontAwesome name="user-o" color="#000" size={20}/>
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>2</DataTable.Cell>
                <DataTable.Cell>TRIPLETA</DataTable.Cell>
                <DataTable.Cell numeric>10 - 45 -10</DataTable.Cell>
                <DataTable.Cell numeric>RD$ 50.00</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Pagination
                page={1}
                numberOfPages={3}
                onPageChange={(page) => {
                  console.log(page);
                }}
                label="1-2 of 6"
              />
            </DataTable>
          </ScrollView>
        </LinearGradient>
        </Surface>

        {/* <View style={([styles.action], {textAlign: 'center', borderColor: 'red'})}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', borderWidth: 1}}>
            {texto.length > 0 ? texto : ' -  -  - '}
          </Text>
          <Text style={{fontSize: 10,fontWeight: 'bold',textAlign: 'center',borderWidth: 1}}>
            {tipoLoteria.length > 0 ? tipoLoteria : ' -  -  - '}
          </Text>
        </View> */}

        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', borderWidth: 1, width: '50%' }}>
            {/* {texto.length > 0 ? texto : ' -  -  - '} */}
            {numeros ? numeros : ' -  -  - '}

          </Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', borderWidth: 1, width: '50%' }}>
            {/* {tipoLoteria.length > 0 ? tipoLoteria : ' -  -  - '} */}
            {montos > 0 ? `RD$ ${montos}.00` : '$RD 0.00'}
            {/* $100.00 */}
          </Text>
          <Text style={{fontSize: 20,fontWeight: 'bold',textAlign: 'center',borderWidth: 1, width: '100%'}}>
            {tipoLoteria.length > 0 ? tipoLoteria : ' -  -  - '}
          </Text>
        </View>
        {/* SEPARADOR */}
        <View style={styles.separator} />
        <View style={{marginBottom: 10}}>
          {/* <Text>{texto.text}</Text> */}

          {operacion === 'numeros' ? 
          (
            <VirtualKeyboardNumeros
                key={1}
                color="#000000"
                pressMode="string"
                // rowStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}
                cellStyle={{borderWidth: 3, borderColor: '#000000'}}
                onPress={(val) => changeText(val)}
                // style={{fontSize: 30}}
              />
          )
          :
          (
            <VirtualKeyboardMontos
                key={2}
                color="#000000"
                pressMode="string"
                // rowStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}
                cellStyle={{borderWidth: 3, borderColor: '#000000'}}
                onPress={(texto) => setMontos(Number(texto))}
                // style={{fontSize: 30}}
              />
          )}
          
          <View>
        </View>

        </View>

        <Surface>
        <Button title={operacion} color="#000000"
          onPress={() => cambiarOperacion()}
        />        
        </Surface>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    elevation: 4,
    margin: 10,
  },
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
  },
});
