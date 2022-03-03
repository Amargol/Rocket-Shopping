import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { Item, itemsStore, ItemState } from '../store/itemsStore';
import Checkbox from 'expo-checkbox';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Checkbox2 from './Checkbox'


interface ItemCheckboxProps {
  item : Item,
  navigation : NativeStackNavigationProp<any, string>,
  callback : () => {} | undefined
}

interface ItemCheckboxState {
  isChecked : boolean,
}

class ItemCheckboxInner extends Component<ItemCheckboxProps, ItemCheckboxState> {
  openingModal: boolean;
  width: number;

  // shouldComponentUpdate (nextProps : ItemCheckboxProps) {
  //   return this.props.item.state != nextProps.item.state
  // }

  constructor(props : ItemCheckboxProps) {
    super(props);
    this.state = {
      isChecked: false,
    }
    this.openingModal = false
    this.width = Dimensions.get('window').width
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
    if (this.props.callback) {
      this.props.callback()
    }
  }

  render() {
    let item = this.props.item

    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        horizontal={true}
        onScroll={(e) => {
          const xOffset = e.nativeEvent.contentOffset.x;
          if (xOffset < -30 && !this.openingModal) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            this.openingModal = true
            this.props.navigation.push("Edit Item", {
              item: item
            })
          }
          if (xOffset == 0 && this.openingModal) {
            this.openingModal = false
          }
        }}
        scrollEventThrottle={16}
      >
        <Pressable onPress={this.onPress} style={{width: this.width - 40}}>
          <View style={styles.container}>
            {/* <Checkbox style={styles.checkbox} value={item.isChecked} onValueChange={this.onPress}/> */}
            <Checkbox2 isChecked={item.isChecked} />
            <Text style={styles.txt}>{this.props.item.name}</Text>
          </View>
        </Pressable>
      </ScrollView>
    );
  }
}

export default function ItemCheckbox(props : any) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return <ItemCheckboxInner {...props} navigation={navigation} />
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 11,
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
