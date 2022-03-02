import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { Item, itemsStore, ItemState, Recipe } from '../store/itemsStore';
import Checkbox from 'expo-checkbox';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Entypo, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';


interface RecipeCheckboxProps {
  recipe : Recipe,
  navigation : NativeStackNavigationProp<any, string>
}

interface RecipeCheckboxState {
  isOpen : boolean
}

class RecipeCheckboxInner extends Component<RecipeCheckboxProps, RecipeCheckboxState> {
  openingModal: boolean;
  width: number;

  // shouldComponentUpdate (nextProps : ItemCheckboxProps) {
  //   return this.props.item.state != nextProps.item.state
  // }

  constructor(props : RecipeCheckboxProps) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this.openingModal = false
    this.width = Dimensions.get('window').width
  }

  toggleIsOpen = () => {
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

    this.setState({isOpen: !this.state.isOpen})
  }

  onPress = () => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)



    // Navigate
    this.props.navigation.push("Edit Recipe", {
      recipe: this.props.recipe,
      editing: false
    })
  }

  render() {
    let recipe = this.props.recipe
    let canBeMade = recipe.requiredIngredients.every((item) => item.isChecked)
    let checkedOptionalItems = recipe.optionalIngredients.filter((item) => item.isChecked)
    let textWidth = this.width - 100
    let descriptionSpacing = 89

    return (
      <ScrollView
        style={styles.parent}
        keyboardShouldPersistTaps="always"
        horizontal={true}
        onScroll={(e) => {
          const xOffset = e.nativeEvent.contentOffset.x;
          if (xOffset < -30 && !this.openingModal) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            this.openingModal = true
            // Trigger event
          }
          if (xOffset == 0 && this.openingModal) {
            this.openingModal = false
          }
        }}
        scrollEventThrottle={16}
      >
        <View>
          <View style={styles.container}>
            <Pressable onPress={this.toggleIsOpen}>
              <FontAwesome5 name={this.state.isOpen ? "chevron-up" : "chevron-down"} size={25} color="#687784" />
            </Pressable>
            <Pressable onPress={this.onPress}>
              {/* <Checkbox style={styles.checkbox} value={canBeMade} onValueChange={this.onPress}/> */}
              <Ionicons name={canBeMade ? "square" : "square-outline"} size={35} color={canBeMade ? "green" : "#BA2F2A"} style={styles.checkbox}/>
            </Pressable>
            <Pressable onPress={this.onPress}>
              <Text style={[styles.txt, {width: textWidth}]} >{recipe.name}</Text>
            </Pressable>
          </View>

          <Pressable onPress={this.onPress}>
            { // Show optional ingredients in accordion
              this.state.isOpen && canBeMade &&
              <View style={{width: textWidth, marginLeft: descriptionSpacing, marginBottom: 10}}>
                {
                  checkedOptionalItems.length !== 0 &&
                  <Text style={styles.itemsText}>With:</Text>
                }

                {
                  checkedOptionalItems.map((item) => {
                    return (
                        <Text key={item.id} style={styles.itemsText}>&#8226; {item.name}</Text>
                    )
                  })
                }

                {
                  checkedOptionalItems.length == 0 &&
                  <View>
                    <Text style={styles.itemsText}>There are no optional items in this recipe that are currently checked, but all the required items are checked</Text>
                  </View>
                }
              </View>
            }
          </Pressable>

          { // Show missing ingredients in accordion
            this.state.isOpen && !canBeMade &&
            <View style={{width: textWidth, marginLeft: descriptionSpacing, marginBottom: 10}}>
              <Text style={styles.itemsText}>Missing:</Text>
              {
                recipe.requiredIngredients.filter((item) => !item.isChecked).map((item) => {
                  return (
                    <Pressable onPress={this.onPress} key={item.id}>
                      <Text style={styles.itemsText}>&#8226; {item.name}</Text>
                    </Pressable>
                  )
                })
              }
            </View>
          }


        </View>
      </ScrollView>
    );
  }
}

export default function RecipeCheckbox(props : any) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return <RecipeCheckboxInner {...props} navigation={navigation} />
}

const styles = StyleSheet.create({
  parent: {
    // backgroundColor: "#161616",
    // borderBottomColor: "black",
    // borderBottomWidth: 5
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 11,
    paddingVertical: 5,
  },
  txt: {
    color: "white"
  },
  checkbox: {
    marginHorizontal: 10,
    // opacity: .8,
  },
  itemsText: {
    color: "#687784",
  }
});
