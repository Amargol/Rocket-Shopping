import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
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
    console.log("oh")
    return (
      <View style={styles.container}>
        {
          itemsStore.sortedItems.map((item) => {
            return <ItemCheckbox item={item} key={item.id}/>
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
  },
  txt: {
    color: "white"
  }
});
