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

// Must be in the same order as settings map
export enum CheckboxType {
  Checked = 0,
  Unchecked = 1,
  Delete = 2
}

interface CheckboxSettings {
  backgroundColor: string,
  borderColor: string,
  icon: keyof typeof FontAwesome.glyphMap,
}

const SETTINGSMAP : CheckboxSettings[] = [
  {
    backgroundColor: "#3377F6",
    borderColor: "#3377F6",
    icon: "check"
  },
  {
    backgroundColor: "transparent",
    borderColor: "#687784",
    icon: "times"
  },
  {
    backgroundColor: "#BA2F2A",
    borderColor: "#BA2F2A",
    icon: "times"
  }
]

interface ItemCheckboxProps {
  type : CheckboxType,
}

export default function Checkbox(props : ItemCheckboxProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  let settings = SETTINGSMAP[props.type]

  return (
    <View style={[
      {
        // width: 10,
        // height: 10,
        backgroundColor: settings.backgroundColor,
        borderWidth: 2,
        // padding: 5,
        borderColor: settings.borderColor,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: props.type === CheckboxType.Checked ? 0 : 0.5,
      }, styles.checkbox]
    }>
      {
        props.type !== CheckboxType.Unchecked &&
        <FontAwesome name={settings.icon} size={22} color={"white"}/>
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
