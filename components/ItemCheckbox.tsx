import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ActionSheetIOS
} from 'react-native';
import { Item, itemsStore, ItemState, Recipe } from '../store/itemsStore';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Checkbox, { CheckboxType } from './Checkbox'


interface ItemCheckboxProps {
  item : Item,
  isEditing: Recipe | undefined,
  navigation : NativeStackNavigationProp<any, string>,
  callback : () => {} | undefined,
}

interface ItemCheckboxState {
  isChecked : boolean,
}

class ItemCheckboxInner extends Component<ItemCheckboxProps, ItemCheckboxState> {
  openingModal: boolean;
  width: number;

  constructor(props : ItemCheckboxProps) {
    super(props);
    this.state = {
      isChecked: false,
    }
    this.openingModal = false
    this.width = Dimensions.get('window').width
  }

  onSwipeRight = () => {
    // Edit item
    this.props.navigation.push("Edit Item", {
      item: this.props.item
    })
  }

  onSwipeLeft = () => {
    // Move to low priority
    if (this.props.item.state == ItemState.Disabled) {
      itemsStore.setItemState(this.props.item.id, ItemState.Standard)
    } else {
      itemsStore.setItemState(this.props.item.id, ItemState.Disabled)
    }

    if (this.props.callback) {
      this.props.callback()
    }
  }

  onLongPress = () => {
    // Open Menu
    let item = this.props.item

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'View Details', 'Move to Pinned', 'Move to Items', 'Move to Disabled', 'Delete'],
        destructiveButtonIndex: 5,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          this.onSwipeRight()
        } else if (buttonIndex === 2) {
          itemsStore.setItemState(item.id, ItemState.Pinned)
        } else if (buttonIndex === 3) {
          itemsStore.setItemState(item.id, ItemState.Standard)
        } else if (buttonIndex === 4) {
          itemsStore.setItemState(item.id, ItemState.Disabled)
        } else if (buttonIndex === 5) {
          itemsStore.removeItem(item.id)
          if (this.props.callback) {
            this.props.callback()
          }
        }
      }
    );
  }

  onPress = () => {
    // Check item
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

    // Perform action
    if (this.props.isEditing) {
      itemsStore.removeItemFromRecipe(this.props.item, this.props.isEditing)
    } else {
      itemsStore.toggleItemCheck(this.props.item.id)
    }

    if (this.props.callback) {
      this.props.callback()
    }
  }

  onScroll = (e : NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = e.nativeEvent.contentOffset.x;
    if (xOffset < -30 && !this.openingModal) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      this.openingModal = true
      this.onSwipeRight()
    }
    if (xOffset > 30 && !this.openingModal) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      this.openingModal = true
      this.onSwipeLeft()
    }
    if ((xOffset < 5 && xOffset > -5) && this.openingModal) {
      this.openingModal = false
    }
  }

  render() {
    let {item, isEditing} = this.props
    let checkboxType = isEditing ? CheckboxType.Delete : (item.isChecked ? CheckboxType.Checked : CheckboxType.Unchecked)

    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        horizontal={true}
        onScroll={this.onScroll}
        scrollEventThrottle={16}
        style={{opacity: item.state === ItemState.Disabled ? .35 : 1}}
      >
        <Pressable onPress={this.onPress} onLongPress={this.onLongPress} delayLongPress={250} style={{width: this.width - 40}}>
          <View style={styles.container}>
            <Checkbox type={checkboxType} />
            <Text style={styles.txt}>{item.name}</Text>
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
