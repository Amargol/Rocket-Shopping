import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Platform, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { itemsStore } from '../store/itemsStore';

export default function EditItemScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [text, onChangeText] = React.useState("");

  const onSubmit = () => {
    itemsStore.addItem(text)
    navigation.pop()
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Item Name"
          autoFocus={true}
          style={styles.input}
          returnKeyType="done"
          onChangeText={onChangeText}
          value={text}
          clearButtonMode="always"
          onSubmitEditing={onSubmit}
        />
      </View>
      <TouchableOpacity activeOpacity={.8} onPress={onSubmit}>
        <View style={styles.submitButtonContainer}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  searchContainer: {
    // height: 100,
    // marginBottom: 10,
    margin: 10,
    marginTop: 20,
    marginBottom: 2,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#252526",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 20,
    padding: 10,
    color: "#eee",
  },
  submitButtonContainer: {
    margin: 10,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#23A9DD",
    display: "flex",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 20,
    fontFamily: "System",
    padding: 10
  }
});
