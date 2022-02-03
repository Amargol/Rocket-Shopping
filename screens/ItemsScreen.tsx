import React from "react";
import { Alert, Button, Keyboard, KeyboardAvoidingView, LayoutAnimation, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 


import EditScreenInfo from '../components/EditScreenInfo';
import CheckList from "../components/CheckList";
import { itemsStore } from "../store/itemsStore";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


// lightColor="#eee" darkColor="rgba(255,255,255,0.1)" 

export default function ItemsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [searchQuery, setSearchQuery] = React.useState("")
  let isKeyboardOpen = false


  const keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
      isKeyboardOpen = true
    }
  );
  const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
      isKeyboardOpen = false
    }
  );


  const addItem = () => {
    if (searchQuery == "" && !isKeyboardOpen) {
      navigation.push('Add Item')
    } else {
      let success = itemsStore.addItem(searchQuery, "")
  
      if (success) {
        // setSearchQuery("")
      }
    }
  }

  const onChangeText = (value: string) => {
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

    setSearchQuery(value)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={90}>
      <View style={[styles.container, {marginTop: 10}]}>
        <CheckList query={searchQuery} />
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={addItem} activeOpacity={.5}>
          <View style={styles.addButton}>
            <FontAwesome5 name="plus" size={28} color="#23A9DD" />
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder="Search or Add Item"
          style={styles.input}
          value={searchQuery}
          onChangeText={(value) => {onChangeText(value)}}
          clearButtonMode="always"
        />
        <TouchableOpacity onPress={addItem} activeOpacity={.5}>
          <View style={styles.addButton}>
            <FontAwesome5 name="check" size={28} color="#23A9DD" />
          </View>
        </TouchableOpacity>
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
