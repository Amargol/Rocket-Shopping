import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  LayoutAnimation,
  Pressable,
  Dimensions
} from 'react-native';
import { Item, itemsStore, ItemState, Recipe } from '../store/itemsStore';
import Checkbox from 'expo-checkbox';
import ItemCheckbox from './ItemCheckbox';
import { AntDesign, Entypo } from '@expo/vector-icons'; 
import * as Haptics from 'expo-haptics';

interface SortableListProps {
  isItem : boolean
  move : (id : string, distance : number) => void
  remove : (id : string) => void
}



@observer
export default class SortableList extends Component<SortableListProps> {
  moveItem = (item : Item | Recipe, distance : number) => {
    let duration = Math.abs(distance) > 1 ? 200 : 50

    LayoutAnimation.configureNext({
      duration: duration,
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

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    this.props.isItem ? itemsStore.moveItem(item.id, distance) : itemsStore.moveRecipe(item.id, distance)
  }
  width: any;

  constructor(props: SortableListProps | Readonly<SortableListProps>) {
    super(props)
    this.width = Dimensions.get('window').width
  }

  render() {

    let items = this.props.isItem ? itemsStore.items : itemsStore.recipes

    return (
      <View style={styles.container}>
        {
          items.map((item) => {
            return (
              <View style={styles.boxContainer} key={item.id}>
                <Pressable onPress={() => {this.props.isItem ? itemsStore.removeItem(item.id) : itemsStore.removeRecipe(item.id)}}>
                  <View style={[styles.ends]}>
                    <Entypo name="cross" size={24} color="red" />
                  </View>
                </Pressable>
                <View style={styles.spacer}></View>
                <Text style={[styles.txt, {maxWidth: this.width - 24 * 3 - 100}]}>{item.name}</Text>
                <View style={styles.spacer}></View>
                <Pressable onPress={() => this.moveItem(item, 1)} onLongPress={() => this.moveItem(item, 10)}>
                  <View style={[styles.ends, {marginRight: 10}]}>
                    <AntDesign name="arrowdown" size={24} color="white" />
                  </View>
                </Pressable>
                <Pressable onPress={() => this.moveItem(item, -1)} onLongPress={() => this.moveItem(item, -10)}>
                  <View style={styles.ends}>
                    <AntDesign name="arrowup" size={24} color="white" />
                  </View>
                </Pressable>
              </View>
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10
  },
  txt: {
    color: "white"
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: "#252526",
    marginHorizontal: 10,
    borderRadius: 4,
  },
  spacer: {
    flex: 1
  },
  ends: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 4,
    backgroundColor: "#252526"
  }
});
