import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Button, Platform, Pressable, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import EditScreenInfo from '../components/EditScreenInfo';
import SortableList from '../components/SortableList';
import { Text, View } from '../components/Themed';
import { itemsStore } from '../store/itemsStore';

export default function AddItemScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [text, onChangeText] = React.useState("");
  const [notes, onChangeNotes] = React.useState("");

  const onSubmit = () => {
    if (text === "") {
      Alert.alert(
        "Invalid Item",
        "Item must have a name",
        [
          {
            text: "Cancel",
            style: "cancel"
          }
        ]
      )
    } else {
      itemsStore.addItem(text, notes)
      navigation.pop()
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={"always"} bounces={false}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Item Name"
          style={styles.input}
          returnKeyType="done"
          onChangeText={onChangeText}
          value={text}
          clearButtonMode="always"
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.notesSearchContainer}>
        <TextInput
          placeholder="Notes"
          placeholderTextColor={"#616164"}
          autoFocus={false}
          style={styles.notesInput}
          multiline={true}
          scrollEnabled={false}
          value={notes}
          onChangeText={onChangeNotes}
        />
      </View>
      <TouchableOpacity activeOpacity={.8} onPress={onSubmit}>
        <View style={styles.submitButtonContainer}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </View>
      </TouchableOpacity>
      <SortableList />
      <View style={styles.separator}></View>
    </KeyboardAwareScrollView>
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
  notesSearchContainer: {
    margin: 10,
    marginTop: 10,
    // marginBottom: 30,
    overflow: "hidden",
  },
  notesInput: {
    borderRadius: 4,
    backgroundColor: "#252526",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    paddingHorizontal: 12,
    color: "#eee",
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
    marginTop: 4,
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
