import React, {useState, useEffect, Fragment, useContext} from 'react';
import {Snackbar, ActivityIndicator} from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Surface, Divider, Button, IconButton, Colors} from 'react-native-paper';
import VirtualKeyboard from 'react-native-virtual-keyboard';

import SelectorMultiple from '../components/SelectorMultiple';
import ListarJugadas from '../components/ListarJugadas';

import LotteryContext from '../context/lottery/lotteryContext';
import {AuthContext} from '../context/auth/authContext';

const ProfileScreen = () => {
  const {getSorteos, sorteos} = useContext(LotteryContext);

  const [operacion, setOperacion] = useState('monto');
  const [titulo, setTitulo] = useState('monto');
  const [numeros, setNumeros] = useState('');
  const [montos, setMontos] = useState(0);

  const [mensaje, setMensaje] = useState(null);
  const [visible, setVisible] = useState(false);

  const [tipoJuego, setTipoJuego] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedObjects, setSelectedIObjects] = useState([]);
  const [juegos, setJuegos] = useState([]);

  const changeText = (newText) => {
    if (newText.length <= 6 && operacion === 'numeros') {
      // console.log('hola: ', newText);
      let contadorTipoJuego = 0;
      let temp = '';
      for (let i = 0; i < newText.length; i++) {
        // console.log('hola: ', newText[i]);
        if (i > 0 && i % 2 == 0) {
          temp += ' - ';
          contadorTipoJuego++;
        }
        temp += newText[i];
      }

      if (contadorTipoJuego !== 0 && contadorTipoJuego < 3) {
        const tipo = ['SUPER PALE', 'TRIPLETA'];
        setTipoJuego(tipo[contadorTipoJuego - 1]);
      } else if (contadorTipoJuego === 0) {
        setTipoJuego('PALE');
      } else if (newText.length === 1) {
        setTipoJuego(' - - - ');
      }

      setNumeros(temp);
    } else {
      Alert.alert('Error!', 'Para donde vas tiguere', [{text: 'Okay'}]);
    }
  };

  const onDismissSnackBar = () => setVisible(false);

  const cancelar  = () => {

    if(juegos.length === 0) {
      setMensaje('No se han guardado jugadas!!');
      setVisible(true);
    } else {

    Alert.alert(
      "Advertencia",
      "Desea cancelar el Ticket",
      [
        {
          text: "No",
          style: "cancel"
        },
        { text: "Si", onPress: () => {
          setMontos(0);
          setJuegos([]);
          setNumeros('');
        }}
      ],
      { cancelable: false }
    );

    }
  }

  const imprimir =() => {
    console.log('hola');
  }

  const procesar = async () => {
    if (operacion === 'procesar') {
      setOperacion('monto');
    } else {
      setOperacion('procesar');
    }

    if (montos === 0) {
      setMensaje('Debe espesificar la cantidad de la jugada!');
      setVisible(true);
    }
    if (numeros.length === 0) {
      setMensaje('Debe espesificar los numeros de la');
      setVisible(true);
    }
    if (selectedItems.length === 0) {
      setMensaje('Debe seleccionar una loteria');
      setVisible(true);
    }
    if (titulo == 'procesar' && selectedItems.length > 0) {
      // Alert.alert('Bien!!', 'Listo para guardar en el State', [{text: 'Okay'}]);

      let objectTemp = [];
      selectedObjects.forEach((key, index) => {
        objectTemp.push({
          id: Math.random(),
          idJuego: key.id,
          nombreJuego: key.name,
          tipoJuego: tipoJuego,
          numeros: numeros,
          montos: montos,
        });
      });

      juegos.forEach((key, index) => {
        objectTemp.push(key);
      });

      setJuegos(objectTemp);

      setMontos(0);
      setNumeros('');
      setSelectedItems([]);
      setSelectedIObjects([]);

      console.log('operacion: despues', juegos);
    }
  };

  useEffect(() => {
    if (montos > 0 && numeros.length > 0 && selectedItems.length > 0) {
      setTitulo('procesar');
    } else if (montos === 0) {
      setTitulo('monto');
    } else if (numeros.length === 0) {
      setTitulo('numeros');
    } else if (selectedItems.length === 0) {
      setTitulo('seleccione una loteria');
    }
  }, [montos, numeros, selectedItems]);

  useEffect(() => {
    getSorteos();
  }, [juegos]);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  const onSelectedItemObjectsChange = (selectionObject) => {
    setSelectedIObjects(selectionObject);
  };

  return (
    <>
      <StatusBar backgroundColor="#FFDA00" barStyle="dark-content" />
      <View style={[styles.container, {marginHorizontal: '2%'}]}>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={3000}
          action={{
            label: 'Ok',
            onPress: () => {
              // Do something
              console.log('hola');
            },
          }}>
          {mensaje}
        </Snackbar>
        <ListarJugadas juegos={juegos} setJuegos={setJuegos} />

        <View
          style={[
            styles.footer,
            {height: '55%', position: 'absolute', left: 0, right: 0, bottom: 0},
          ]}>
          <ScrollView>
            <SelectorMultiple
              sorteos={sorteos}
              Icon={Icon}
              onSelectedItemsChange={onSelectedItemsChange}
              onSelectedItemObjectsChange={onSelectedItemObjectsChange}
              selectedItems={selectedItems}
            />
            <Surface style={styles.surface}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  borderRadius: 30,
                  width: '100%',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                  onPress={() => setOperacion('numeros')}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      width: '99%',
                    }}>
                    {numeros ? numeros : ' -  -  - '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                  onPress={() => setOperacion('monto')}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      width: '99%',
                    }}>
                    {montos > 0 ? `RD$ ${montos}.00` : '$RD 0.00'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Surface>

            <View style={{marginHorizontal: '2.5%'}}>
            <View>
              <IconButton
                icon="printer-pos"
                color="green"
                size={30}
                onPress={() => imprimir()}
                style={{position: 'absolute'}}
              />
            </View>

            <View style={{alignItems: 'center'}}>
              <IconButton
                icon="archive-arrow-up"
                color="#FFDA00"
                size={30}
                onPress={() => procesar()}
                style={{position: 'absolute'}}
              />
            </View>

            <View style={{alignItems: 'flex-end'}}>
              <IconButton
                icon="close-thick"
                color="red"
                size={30}
                onPress={() => cancelar()}
                style={{position: 'absolute'}}
              />
            </View>
            </View>

            <View style={{paddingTop: 20}}>
              {operacion === 'numeros' ? (
                <VirtualKeyboard
                  key={1}
                  color="#000000"
                  pressMode="string"
                  cellStyle={{borderWidth: 0.5, borderColor: '#000000'}}
                  onPress={(val) => changeText(val)}
                />
              ) : (
                <VirtualKeyboard
                  key={2}
                  color="#000000"
                  pressMode="string"
                  cellStyle={{
                    borderWidth: 0.5,
                    borderColor: '#000000',
                    backgroundColor: '#e1e1e1',
                  }}
                  onPress={(texto) => setMontos(Number(texto))}
                />
              )}
            </View>
            {/* <Button title={titulo} color onPress={() => procesar()} /> */}
          </ScrollView>
          {/* <Button icon="camera" mode="contained" onPress={() => procesar()}>
            Press me
          </Button> */}
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  surface: {
    padding: 5,
    elevation: 4,
    backgroundColor: '#e1e1e1',
  },
  container: {
    flex: 1,
    // backgroundColor: '#009387',
  },
  header: {
    paddingTop: 30,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
