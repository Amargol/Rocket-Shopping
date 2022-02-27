import React, { Component } from "react";
import { Alert, Button, Keyboard, KeyboardAvoidingView, LayoutAnimation, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 


import EditScreenInfo from '../components/EditScreenInfo';
import CheckList from "../components/CheckList";
import { itemsStore } from "../store/itemsStore";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import * as Haptics from 'expo-haptics';

interface ItemsScreenProps {
  navigation : NativeStackNavigationProp<any, string>
}

// lightColor="#eee" darkColor="rgba(255,255,255,0.1)" 
@observer
class ItemsScreenInner extends Component<ItemsScreenProps> {

  constructor(props : any) {
    super(props);
  }

  checkFirstItem = () => {
    if (itemsStore.searchQuery !== "" && itemsStore.sortedItems.length > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      itemsStore.toggleItemCheck(itemsStore.sortedItems[0].id)
      itemsStore.setSearchQuery("")
    }
  }

  addItem = () => {
    if (itemsStore.searchQuery == "") {
      this.props.navigation.push('Add Item')
    } else {
      let success = itemsStore.addItem(itemsStore.searchQuery, "")
  
      if (success) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        itemsStore.setSearchQuery("")
      } else {
        Keyboard.dismiss()
      }
    }
  }

  onChangeText = (value: string) => {
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

    itemsStore.setSearchQuery(value)
  }

  render () {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={90}>
        <View style={[styles.container, {marginTop: 10}]}>
          <CheckList query={itemsStore.searchQuery} />
        </View>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={this.addItem} activeOpacity={.5}>
            <View style={styles.addButton}>
              <FontAwesome5 name="plus" size={28} color="#23A9DD" />
            </View>
          </TouchableOpacity>
          <TextInput
            placeholder="Search or Add Item"
            style={styles.input}
            value={itemsStore.searchQuery}
            onChangeText={(value) => {this.onChangeText(value)}}
            clearButtonMode="always"
            autoCapitalize="words"
          />
          <TouchableOpacity onPress={this.checkFirstItem} activeOpacity={.5}>
            <View style={styles.addButton}>
              <FontAwesome5 name="check" size={28} color="#23A9DD" />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default function ItemsScreen(props : any) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (<ItemsScreenInner {...props} navigation={navigation} />)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white"
  },
  spacer: {
    height: 10,
    width: 10
  },
  header: {
    color: "#eee"
  },
  searchContainer: {
    // height: 100,
    margin: 5,
    marginBottom: 10,
    borderRadius: 4,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  addButton: {
    backgroundColor: "black",
    padding: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 20,
    padding: 10,
    paddingLeft: 15,
    color: "#eee",
    backgroundColor: "#252526",
    borderRadius: 4
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
