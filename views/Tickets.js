import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Button, StyleSheet, StatusBar, FlatList} from 'react-native';
import {Searchbar} from 'react-native-paper';

import LotteryContext from '../context/lottery/lotteryContext';

import Ticket from '../components/ui/Ticket';
const Tickets = ({navigation}) => {
  const  { getTickets, tickets } = useContext(LotteryContext);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    getTickets();
  },[]);

  return (
    <>
    <StatusBar backgroundColor="#1f65ff" barStyle="dark-content"/>
    <View style={{marginHorizontal: '2.5%', marginTop: 10, marginBottom: 50, backgroundColor: '#fff'}}>
        <Searchbar
          placeholder="Consulta de tickets"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
    <FlatList
          data={tickets}
          renderItem={(item) => ( <Ticket item={item} key={item.index}/>)}
          keyExtractor={(ticket, index) => ticket.ticket+'+'+index}
        />
    </View>
    </>
  );
};

export default Tickets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: '2.5%',
    marginTop: 10,
  },
  contenido: {
  },
});
