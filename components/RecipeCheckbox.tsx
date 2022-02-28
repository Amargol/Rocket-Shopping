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
import { Entypo, FontAwesome5 } from '@expo/vector-icons';


interface RecipeCheckboxProps {
  recipe : Recipe,
  navigation : NativeStackNavigationProp<any, string>
}

class RecipeCheckboxInner extends Component<RecipeCheckboxProps> {
  openingModal: boolean;
  width: number;

  // shouldComponentUpdate (nextProps : ItemCheckboxProps) {
  //   return this.props.item.state != nextProps.item.state
  // }

  constructor(props : RecipeCheckboxProps) {
    super(props);

    this.openingModal = false
    this.width = Dimensions.get('window').width
  }

  onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

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

    // Navigate
  }

  render() {
    let recipe = this.props.recipe

    return (
      <ScrollView
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
        <Pressable onPress={this.onPress} style={{width: this.width - 40}}>
          <View style={styles.container}>
            <FontAwesome5 name="chevron-down" size={25} color="#687784" />
            <Checkbox style={styles.checkbox} value={recipe.requiredIngredients.every((item) => item.isChecked)} onValueChange={this.onPress}/>
            <Text style={styles.txt}>{recipe.name}</Text>
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
    width: 30,
    height: 30,
    marginHorizontal: 10
  }
});
