import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Item, itemsStore, ItemState } from '../store/itemsStore';
import Checkbox from 'expo-checkbox';
import BouncyCheckbox from 'react-native-bouncy-checkbox';


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

  onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    itemsStore.toggleItemCheck(this.props.item.id)
  }

  render() {
    let item = this.props.item

    return (
      <Pressable onPress={this.onPress}>
        <View style={styles.container}>
          <Checkbox style={styles.checkbox} value={item.state == ItemState.Checked} onValueChange={this.onPress}/>
          <Text style={styles.txt}>{this.props.item.name}</Text>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "blue"
  },
  txt: {
    color: "white"
  },
  checkbox: {
    width: 30,
    height: 30
  }
});
