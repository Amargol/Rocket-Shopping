import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert, LayoutAnimation, Pressable, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { Recipe, itemsStore } from '../store/itemsStore';
import React, { Component, useEffect, useReducer } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ItemCheckbox from '../components/ItemCheckbox';
import { FontAwesome5 } from '@expo/vector-icons';
import { observer } from "mobx-react";

function InnerEditRecipeScreen(props : any) {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  var recipe : Recipe = props.route.params.recipe
  // recipe = itemsStore.recipes.find((r) => r.id == recipe.id) as Recipe

  const [editing, onChangeEditing] = React.useState(props.route.params.editing);
  const [text, onChangeText] = React.useState(recipe.name);
  const [notes, onChangeNotes] = React.useState(recipe.notes);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const isFocused = useIsFocused()

  useEffect(() => {
    forceUpdate()
  }, [isFocused])

  const optionalItems = recipe.optionalIngredients.slice()
  .sort((a, b) => {
    if (a.isChecked == b.isChecked) {
      return 0
    } else {
      return a.isChecked ? 1 : -1
    }
  })
  const requiredItems = recipe.requiredIngredients.slice()
  .sort((a, b) => {
    if (a.isChecked == b.isChecked) {
      return 0
    } else {
      return a.isChecked ? 1 : -1
    }
  })

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
        itemsStore.updateRecipe(recipe, text, notes)
      }
      LayoutAnimation.configureNext({
        duration: 50,
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
      onChangeEditing(!editing)
    }
  }

  const onPressPlus = (isRequired: boolean) => {
    navigation.push("Select Item", {
      isRequired: isRequired,
      recipe: recipe,
    })
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

  let inputBackground = editing ? "#252526" : "#161616"

  return (
    <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={'always'}>
      <View style={styles.searchContainer}>
        <Text style={styles.headText}>Item Name</Text>
        <TextInput
          // placeholder="Item Name"
          autoFocus={false}
          style={[styles.input, {backgroundColor: inputBackground}]}
          onChangeText={onChangeText}
          value={text}
          editable={editing}
        />
      </View>
      <View style={styles.notesSearchContainer}>
        <View style={{display: 'flex', flexDirection: "row"}}>
          <Text style={styles.headText}>Notes</Text>
          <Pressable onPress={onPressSave}><Text style={[styles.headText, {color: "#007AFF"}]}>{editing ? "Save" : "Edit"}</Text></Pressable>
        </View>
        <TextInput
          // placeholder="Notes"
          placeholderTextColor={"#616164"}
          autoFocus={false}
          editable={editing}
          style={[styles.notesInput, {backgroundColor: inputBackground}]}
          multiline={true}
          scrollEnabled={false}
          value={notes}
          onChangeText={onChangeNotes}
        />
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.headText}>Required Items</Text>
        {
          requiredItems.map((item) => {
            return <ItemCheckbox item={item} key={item.id} isEditing={editing ? recipe : undefined} navigation={navigation} callback={forceUpdate}/>
          })
        }
        {
          !editing && requiredItems.length == 0 &&
          <View style={[styles.button, {backgroundColor: inputBackground}]}>
            <Text style={{padding: 3}}>None</Text>
          </View>
        }
        {
          (editing) &&
          <TouchableOpacity activeOpacity={.8} onPress={() => onPressPlus(true)}>
            <View style={[styles.button, {backgroundColor: inputBackground}]}>
              <FontAwesome5 name="plus" size={23} color="#007AFF" />
            </View>
          </TouchableOpacity>
        }
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.headText}>Optional Items</Text>
        {
          optionalItems.map((item) => {
            return <ItemCheckbox item={item} key={item.id} isEditing={editing ? recipe : undefined} navigation={navigation} callback={forceUpdate}/>
          })
        }
        {
          !editing && optionalItems.length == 0 &&
          <View style={[styles.button, {backgroundColor: inputBackground}]}>
            <Text style={{padding: 3}}>None</Text>
          </View>
        }
        {
          (editing) &&
          <TouchableOpacity activeOpacity={.8} onPress={() => onPressPlus(false)}>
            <View style={[styles.button, {backgroundColor: inputBackground}]}>
              <FontAwesome5 name="plus" size={23} color="#007AFF" />
            </View>
          </TouchableOpacity>
        }
      </View>

    </KeyboardAwareScrollView>
  );
}

@observer
export default class EditRecipeScreen extends Component<any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return <InnerEditRecipeScreen {...this.props}/>
  }
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
    marginBottom: 10,
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
    paddingLeft: 10
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
  },
  middleContainer: {
    // height: 100,
    // marginBottom: 10,
    margin: 10,
    marginBottom: 10,
    overflow: "hidden",
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center"
  },
  button: {
    backgroundColor: "green",
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 0,
    marginVertical: 5,
    borderRadius: 4
  }
});
