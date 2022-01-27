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
import * as Haptics from 'expo-haptics';


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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    LayoutAnimation.configureNext({
      duration: 100,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.linear,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      }
    })

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
  },
  txt: {
    color: "white"
  },
  checkbox: {
    width: 30,
    height: 30,
    marginRight: 10
  }
});
