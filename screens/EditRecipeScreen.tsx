import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { Recipe, itemsStore } from '../store/itemsStore';
import React from 'react';

export default function EditRecipeScreen(props : any) {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const recipe : Recipe = props.route.params.recipe

  const [editing, onChangeEditing] = React.useState(props.route.params.editing);
  const [text, onChangeText] = React.useState(recipe.name);
  const [notes, onChangeNotes] = React.useState(recipe.notes);

  const onPressSave = () => {
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
      if (editing) {
        // saveNotes()
      }
      onChangeEditing(!editing)
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={onPressSave}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>
          <Text style={{color: "#007AFF"}}>{editing ? "Save" : "Edit"}</Text>
        </Pressable>
      )
    })
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>{recipe.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
