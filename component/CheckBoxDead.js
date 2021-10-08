import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';


function CheckBoxDead({ label, status, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' , paddingRight: 50}}>
      <Checkbox
      status={status}
      color='#2e3f6e'
      position='trailing'

    />
    <Text>{label}</Text>
    </View>
      
    </TouchableOpacity>
  );
}

export default CheckBoxDead;