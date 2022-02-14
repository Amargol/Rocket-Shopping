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
import * as Haptics from 'expo-haptics';

export default function AddRecipeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [text, onChangeText] = React.useState("");

  const onSubmit = () => {
    var success = itemsStore.addRecipe(text)

    if (success) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      navigation.pop()
      setTimeout(() => {
        navigation.push("Edit Recipe", {
          recipe: success,
          editing: true
        })
      }, 0)
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={"always"} bounces={false}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Recipe Name"
          style={styles.input}
          returnKeyType="done"
          onChangeText={onChangeText}
          value={text}
          clearButtonMode="always"
          onSubmitEditing={onSubmit}
          autoCapitalize="words"
          autoFocus={true}
          />
      </View>
      <TouchableOpacity activeOpacity={.8} onPress={onSubmit}>
        <View style={styles.submitButtonContainer}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </View>
      </TouchableOpacity>
      {/* <SortableList /> */}
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
    marginBottom: 10,
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
