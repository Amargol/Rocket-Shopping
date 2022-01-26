import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Item, itemsStore, ItemState } from '../store/itemsStore';
import Checkbox from 'expo-checkbox';


interface ItemCheckboxProps {
  item : Item,
}

interface ItemCheckboxState {
  isChecked : boolean
}

export default class ItemCheckbox extends Component<ItemCheckboxProps, ItemCheckboxState> {
  
  // shouldComponentUpdate (nextProps : ItemCheckboxProps) {
  //   return this.props.item.state != nextProps.item.state
  // }

  constructor(props : ItemCheckboxProps) {
    super(props);
    this.state = {
      isChecked: false
    }
  }

  render() {
    let item = this.props.item

    return (
      <View style={styles.container}>
        <Checkbox value={item.state == ItemState.Checked} onValueChange={(value) => {itemsStore.toggleItemCheck(item.id)}} />
        <Text style={styles.txt}>{this.props.item.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5
  },
  txt: {
    color: "white"
  }
});
