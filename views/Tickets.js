import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';

const Tickets = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
        <Searchbar
          placeholder="Consulta de tickets"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Text>Details Screen</Text>
        <Button
          title="Go to details screen...holka"
          onPress={() => navigation.push('Details')}
        />
        <Button
          title="Go to home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Tickets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: '2.5%',
    marginTop: 10
  },
  contenido: {
  },
});
