import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Platform, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Item, itemsStore } from '../store/itemsStore';

export default function EditItemScreen(props : any) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [text, onChangeText] = React.useState(props.route.params.item.name);

  const onSubmit = () => {
    navigation.pop()
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.headText}>Item Name</Text>
        <TextInput
          // placeholder="Item Name"
          autoFocus={false}
          style={styles.input}
          returnKeyType="done"
          onChangeText={onChangeText}
          value={text}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.notesSearchContainer}>
        <Text style={styles.headText}>Notes</Text>
        <TextInput
          // placeholder="Notes"
          placeholderTextColor={"#616164"}
          autoFocus={false}
          style={styles.notesInput}
          multiline={true}
        />
      </View>

      {/* <TouchableOpacity activeOpacity={.8} onPress={onSubmit}>
        <View style={styles.submitButtonContainer}>
          <Text style={styles.submitButtonText}>Save</Text>
        </View>
      </TouchableOpacity> */}
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
    marginBottom: 10,
    overflow: "hidden",
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center"
  },
  input: {
    // flex: 1,
    // height: "100%",
    borderRadius: 4,
    backgroundColor: "#252526",
    fontSize: 20,
    padding: 10,
    color: "#eee",
  },
  notesSearchContainer: {
    margin: 10,
    marginTop: 10,
    marginBottom: 2,
    overflow: "hidden",
  },
  notesInput: {
    borderRadius: 4,
    backgroundColor: "#252526",
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 15,
    paddingHorizontal: 12,
    color: "#eee",
  },
  headText: {
    fontSize: 15,
    marginBottom: 5,
    color: "#8E8E92",
    paddingLeft: 9
  },
  submitButtonContainer: {
    margin: 10,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#252526",
    display: "flex",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 20,
    fontFamily: "System",
    padding: 10,
  }
});