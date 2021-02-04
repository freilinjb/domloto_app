import React, {useState} from 'react';
import {List, IconButton, Colors, Divider} from 'react-native-paper';

const Ticket = ({item, showModal, setTicket}) => {
  const {ticket, fecha} = item.item;
  // console.log('item: ', item);

  const mostrarModal = () => {
    setTicket(item.item);
    showModal();
  }


  return (
    <>
      <List.Item
        key={item.index}
        title={ticket}
        description={fecha}
        left={(props) => <List.Icon {...props} icon="ticket" />}
        right={(props) => (
          <IconButton
            icon="drag-horizontal-variant"
            size={20}
            onPress={() => mostrarModal()}
          />
        )}
      />
      <Divider />
    </>
  );
};

export default Ticket;
