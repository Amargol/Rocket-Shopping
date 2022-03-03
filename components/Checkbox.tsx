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
import { Item, itemsStore, ItemState } from '../store/itemsStore';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';


interface ItemCheckboxProps {
  isChecked : boolean,
}

export default function Checkbox(props : ItemCheckboxProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  let canBeMade = props.isChecked

  return (
    <View style={[
      {
        // width: 10,
        // height: 10,
        backgroundColor: canBeMade ? "#3377F6" : "transparent",
        borderWidth: 2,
        // padding: 5,
        borderColor: canBeMade ? "#3377F6" : "#687784",
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: canBeMade ? 0 : 0.5,
      }, styles.checkbox]
    }>
      {
        canBeMade &&
        <FontAwesome name={canBeMade ? "check" : "times"} size={canBeMade ? 22 : 22} color={"white"}/>
      }
    </View>
  )
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
    marginRight: 10
  }
});
