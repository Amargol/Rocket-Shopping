import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { Recipe } from '../store/itemsStore';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';


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

  constructor(props : RecipeCheckboxProps) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this.openingModal = false
    this.width = Dimensions.get('window').width
  }

  onSwipeRight = () => {
    // Move to pinned
  }

  onSwipeLeft = () => {
    // Move to low priority
  }

  onPress = () => {
    // Check item
    this.props.navigation.push("Edit Recipe", {
      recipe: this.props.recipe,
      editing: false
    })
  }
  
  onLongPress = () => {
    // Open menu
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

  onScroll = (e : NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = e.nativeEvent.contentOffset.x;
    if (xOffset < -30 && !this.openingModal) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      this.openingModal = true
      this.onSwipeRight()
    }
    if (xOffset > 30 && !this.openingModal) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      this.openingModal = true
      this.onSwipeLeft()
    }
    if ((xOffset < 5 && xOffset > -5) && this.openingModal) {
      this.openingModal = false
    }
  }

  render() {
    let recipe = this.props.recipe
    let canBeMade = recipe.requiredIngredients.every((item) => item.isChecked)
    let checkedOptionalItems = recipe.optionalIngredients.filter((item) => item.isChecked)

    // Max width the text can be
    let textWidth = this.width - 100

    // How much to indent description
    let descriptionSpacing = 78

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
        <Pressable onPress={this.onPress} onLongPress={this.onLongPress}>

          <View>
            <View style={styles.container}>
              <Pressable onPress={this.toggleIsOpen}>
                <FontAwesome5 name={this.state.isOpen ? "chevron-up" : "chevron-down"} size={25} color="#687784" style={{paddingHorizontal: 11, paddingVertical: 7}} />
              </Pressable>
              <View style={[
                {
                  width: 25,
                  height: 25,
                  backgroundColor: canBeMade ? "green" : "#BA2F2A",
                  borderRadius: 5,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: canBeMade ? 0 : 0.5,
                }, styles.checkbox]
              }>
                <FontAwesome name={canBeMade ? "check" : "times"} size={canBeMade ? 17 : 17} color={"white"}/>
              </View>
              <Text style={[styles.recipeName, {width: textWidth}]} >{recipe.name}</Text>
            </View>

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

            { // Show missing ingredients in accordion
              this.state.isOpen && !canBeMade &&
              <View style={{width: textWidth, marginLeft: descriptionSpacing, marginBottom: 10}}>
                <Text style={styles.itemsText}>Missing:</Text>
                {
                  recipe.requiredIngredients.filter((item) => !item.isChecked).map((item) => {
                    return (
                      <Text key={item.id} style={styles.itemsText}>&#8226; {item.name}</Text>
                    )
                  })
                }
              </View>
            }
          </View>
        </Pressable>
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
    marginRight: 11,
    // paddingVertical: 5,
  },
  recipeName: {
    color: "white",
    paddingVertical: 5
  },
  checkbox: {
    marginRight: 10,
    // backgroundColor: "white"
  },
  itemsText: {
    color: "#687784",
  }
});
