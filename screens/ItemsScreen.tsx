import React from "react";
import { Button, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 


import EditScreenInfo from '../components/EditScreenInfo';
import CheckList from "../components/CheckList";
import { itemsStore, ItemType } from "../store/itemsStore";

// lightColor="#eee" darkColor="rgba(255,255,255,0.1)" 

export default function ItemsScreen() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const addItem = () => {
    console.log(itemsStore.items)

    itemsStore.addItem(searchQuery, ItemType.Recurring)
    setSearchQuery("")
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={88}>
      <View style={styles.container}>
        <CheckList query={searchQuery} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search or Add Item"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="always"
        />
        <Pressable onPress={addItem}>
          <View style={styles.addButton}>
            <FontAwesome5 name="plus" size={28} color="black" />
          </View>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
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
    backgroundColor: "#252526",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  addButton: {
    backgroundColor: "#23A9DD",
    padding: 12,
    marginLeft: 5
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 20,
    padding: 10,
    paddingLeft: 15,
    color: "#eee",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
