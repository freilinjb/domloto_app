import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import {Searchbar, Modal, Portal, Button, Provider} from 'react-native-paper';

import LotteryContext from '../context/lottery/lotteryContext';

import Ticket from '../components/ui/Ticket';
import ModalTicket from '../components/modal/ModalTicket';
const Tickets = ({navigation}) => {
  const {getTickets, tickets} = useContext(LotteryContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [ticket, setTicket] = useState({});
  const onChangeSearch = (query) => setSearchQuery(query);


  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, marginHorizontal: '2.5%'};

  useEffect(() => {
    getTickets();
  }, []);


  return (
    <>
      <StatusBar backgroundColor="#1f65ff" barStyle="dark-content" />



       {/* <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button> */}
      <View

        style={{
          marginHorizontal: '2.5%',
          marginTop: 10,
          marginBottom: 50,
          backgroundColor: '#fff',
        }}>
        <Searchbar
          placeholder="Consulta de tickets"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
              
        <FlatList
          data={tickets}
          renderItem={(item) => <Ticket item={item} key={item.index} showModal={showModal} setTicket={setTicket}/>}
          keyExtractor={(ticket, index) => ticket.ticket + '+' + index}
        />
      </View>
      <ModalTicket visible={visible} setVisible={setVisible} ticket={ticket}/>
{/* 
      <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </Provider> */}
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
});
