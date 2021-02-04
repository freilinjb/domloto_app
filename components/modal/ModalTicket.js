import React,{useState} from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

const ModalTicket = ({ticket, visible, setVisible}) => {
  // const [visible, setVisible] = useState(false);
  console.log('ticketModal: ',ticket);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text style={styles.text_header}>Numero de Ticket: {ticket.ticket} </Text>
          
        </Modal>
      </Portal>
      {/* <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button> */}
    </Provider>
  );
};

export default ModalTicket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: '2.5%',
    marginTop: 10,
  },
  text_header: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
