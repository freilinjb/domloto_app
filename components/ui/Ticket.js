import React from 'react';
import { List, IconButton, Colors } from 'react-native-paper';

const Ticket = ({item}) => {
    const { ticket, fecha} = item.item;
    console.log('item: ', item);
  return (
    <List.Item style={{borderColor: 'gray', borderWidth:0.2}}
        key={item.index}
        title={ticket}
        sec
        description={fecha}
        left={(props) => <List.Icon {...props} icon="ticket" />}
        right={(props) => <IconButton
            icon="drag-horizontal-variant"
            size={20}
            onPress={() => console.log('Pressed')}
          />}
    />
  );
};

export default Ticket;
