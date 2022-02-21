import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Button, Platform, Pressable, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import EditScreenInfo from '../components/EditScreenInfo';
import SortableList from '../components/SortableList';
import { Text, View } from '../components/Themed';
import { Item, itemsStore } from '../store/itemsStore';
import * as Haptics from 'expo-haptics';
import DeletableList from '../components/DeletableList';

export default function SelectItemScreen(props : any) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const recipe = props.route.params.recipe
  const isRequired = props.route.params.isRequired
  const callback = props.route.params.callback
  const width = Dimensions.get('window').width


  const [text, onChangeText] = React.useState("");

  const submit = (item : Item) => {
    itemsStore.addItemToRecipe(item, recipe, isRequired)
    navigation.pop()
    callback()
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
          autoCapitalize="words"
          autoFocus={true}
          />
      </View>

      <View>
        {
          itemsStore.items.filter((item) => {
            return item.name.toLowerCase().indexOf(text.toLowerCase()) != -1
          }).map((item) => {
            return (
              <TouchableOpacity activeOpacity={.8} key={item.id} onPress={() => {submit(item)}}>
                <View style={styles.boxContainer}>
                  <View style={styles.spacer}></View>
                  <Text style={[styles.txt, {maxWidth: width - 20}]}>{item.name}</Text>
                  <View style={styles.spacer}></View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>

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
  },
  txt: {
    color: "white"
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#252526",
    marginHorizontal: 10,
    borderRadius: 4,
    padding: 15,
    marginTop: 10
  },
  spacer: {
    flex: 1
  },
});
