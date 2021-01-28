import React from 'react';
import { View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';


const SelectorMultiple = ({selectedItems, sorteos, Icon, onSelectedItemsChange, onSelectedItemObjectsChange}) => {
  return (
    <View
      style={{
        borderRadius: 5,
      }}>
      <SectionedMultiSelect
        items={sorteos}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="juegos"
        selectText="Seleccione la loteria..."
        showDropDowns={true}
        readOnlyHeadings={true}
        onSelectedItemsChange={onSelectedItemsChange}
        onSelectedItemObjectsChange={onSelectedItemObjectsChange}
        expandDropDowns={true}
        searchPlaceholderText="Buscar Loterias"
        selectedItems={selectedItems}
        confirmText="Confirmar"
        removeAllText="Todos Removidos"
        colors={{primary: '#000'}}
      />
    </View>
  );
};

export default SelectorMultiple;
