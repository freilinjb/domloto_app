import React, {Fragment, useEffect, useState} from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import {DataTable, Surface} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ListarJugadas = ({setJuegos, juegos}) => {

    const [total, setTotal] = useState(0);
    // console.log('ListaJuego: '. juegos);


  return (
    <View style={styles.header}>
        {juegos.length > 0 ?  (
           <Surface style={{marginBottom: 10, marginTop: 10, borderRadius: 20}}>
             {/* <LinearGradient colors={['#D8CB00', '#FFDA00']}> */}
             <DataTable key={Math.random()}>
               <DataTable.Header
                 style={{
                   backgroundColor: '#FFDA00',
                   borderColor: '#fff',
                   borderRadius: 20,
                 }}>
                 <DataTable.Title>Tipo</DataTable.Title>
                 <DataTable.Title >Numeros</DataTable.Title>
                 <DataTable.Title numeric>Monto</DataTable.Title>
                 <DataTable.Title numeric>Loteria</DataTable.Title>
                 <DataTable.Title numeric>Accion</DataTable.Title>
               </DataTable.Header>
           <ScrollView style={{height: '60%', position: 'relative', left: 0}}>

               {console.log('props: :', juegos)}
     
               {juegos.map((juego, index) => {
                 const {
                   id,
                   idJuego,
                   nombreJuego,
                   numeros,
                   montos,
                   tipoJuego,
                 } = juego;
                 return (
                   <Fragment key={index +'-'+ idJuego + idJuego}>
                     <DataTable.Row key={idJuego + numeros}>
                       {/* <DataTable.Cell>{tipoJuego}</DataTable.Cell> */}
                       <DataTable.Cell>
                         {tipoJuego === 'PALE'
                           ? 'PL'
                           : tipoJuego === 'SUPER PALE'
                           ? 'SP'
                           : 'TR'}
                       </DataTable.Cell>
                       <DataTable.Cell numeric>{numeros}</DataTable.Cell>
                       <DataTable.Cell numeric>{montos}</DataTable.Cell>
                       <DataTable.Cell numeric>{nombreJuego}</DataTable.Cell>
                       <DataTable.Cell numeric>
                         <TouchableOpacity
                           onPress={(_id) =>
                             setJuegos((juegos) => {
                               return juegos.filter((juego) => juego.id !== id);
                             })
                           }>
                           <FontAwesome name="remove" color="#000" size={20} />
                         </TouchableOpacity>
                       </DataTable.Cell>
                     </DataTable.Row>
                   </Fragment>
                 );
               })}
           </ScrollView>

             </DataTable>
             <View style={styles.infoData}>
                 <Text style={styles.footerDataTable}>Cantidad: #{juegos.length}</Text>
                 <Text style={styles.footerDataTable}>Total: RD${juegos.map(item => item.montos).reduce((prev, next) => prev + next)}.00</Text>
             </View>
         </Surface>     
      )
      :
      (
        <Text 
          style={[styles.text_header,{color: '#000', textAlign: 'center', alignContent: 'center', paddingTop: 100}]}>
            No ha registrado jugadas!
          </Text>
      )}
    </View>
  );
};

export default ListarJugadas;

const styles = StyleSheet.create({
    surface: {
      padding: 8,
      elevation: 4,
      margin: 10,
    },
    header: {
      paddingTop: 20,
    },
    footer: {
      flex: 2,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '60%'
    },
    text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30,
    },
    infoData: {
        flexDirection: 'row', 
        justifyContent:'space-around', 
        backgroundColor: '#000', 
        paddingTop: 5
    },
    footerDataTable: {
        fontWeight: 'bold',
        fontSize: 15,
        borderRadius:30,
        color: '#fff'
    }
  });
