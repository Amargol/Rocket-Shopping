import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { itemsStore } from '../store/itemsStore';

interface CheckListProps {
  query : string
}

@observer
export default class CheckList extends Component<CheckListProps> {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>{this.props.query}</Text>
        {
          itemsStore.items.map((item) => {
            return <Text style={styles.txt} key={item.id}>{item.name}</Text>
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: "white"
  }
});
