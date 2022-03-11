import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { itemsStore, ItemState } from '../store/itemsStore';
import Checkbox from 'expo-checkbox';
import ItemCheckbox from './ItemCheckbox';


interface CheckListProps {
  query : string
}

@observer
export default class CheckList extends Component<CheckListProps> {

  render() {
    let splitSortedItems = itemsStore.splitSortedItems

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        {
          splitSortedItems.pinned.length !== 0 &&
          <Text style={styles.categoryText}>Pinned:</Text>
        }
        {
          splitSortedItems.pinned.map((item) => {
            return <ItemCheckbox item={item} key={item.id}/>
          })
        }
        {
          splitSortedItems.standard.length !== 0 &&
          <Text style={styles.categoryText}>Items:</Text>
        }
        {
          splitSortedItems.standard.map((item) => {
            return <ItemCheckbox item={item} key={item.id}/>
          })
        }
        {
          splitSortedItems.disabled.length !== 0 &&
          <Text style={styles.categoryText}>Disabled:</Text>
        }
        {
          splitSortedItems.disabled.map((item) => {
            return <ItemCheckbox item={item} key={item.id}/>
          })
        }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  txt: {
    color: "white"
  },
  categoryText: {
    color: "#8E8E92",
    paddingHorizontal: 10,
    paddingTop: 10
  }
});
