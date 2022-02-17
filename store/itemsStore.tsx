import { action, computed, makeObservable, observable } from "mobx"
import { Alert, AsyncStorage, LayoutAnimation } from "react-native"

export enum ItemState {
  Unchecked = 0,
  Checked = 1,
  Disabled = 2
}

export class Item {
  name: string
  isChecked: boolean
  isDisabled: boolean
  notes: string
  id: string

  constructor (name : string, notes : string) {
    this.name = name
    this.isChecked = false
    this.isDisabled = false
    this.notes = notes
    this.id = Date.now().toString() + "_" + ((Math.random() * 1000000) >> 0).toString()
  }

  static clone (item : Item) : Item {
    let res = new Item(item.name, item.notes)
    res.isChecked = item.isChecked
    res.isDisabled = item.isDisabled
    res.id = item.id

    return res
  }
}

export class Recipe {
  name: string
  requiredIngredients: Set<string>
  optionalIngredients: Set<string>
  isDisabled: boolean
  notes: string
  id: string

  constructor (name : string) {
    this.name = name
    this.requiredIngredients = new Set<string>();
    this.optionalIngredients = new Set<string>();
    this.notes = ""
    this.isDisabled = false
    this.id = Date.now().toString() + "_" + ((Math.random() * 1000000) >> 0).toString()
  }
}

class ItemsStore {
  items : Item[] = []
  recipes : Recipe[] = []
  searchQuery : string = ""

  constructor () {
    AsyncStorage.getItem("items").then(items => {
      if (items !== null) {
        this.items = JSON.parse(items)
      } else {
        this.items = []
      }
    });

    AsyncStorage.getItem("recipes").then(recipes => {
      if (recipes !== null) {
        this.recipes = JSON.parse(recipes)
      } else {
        this.items = []
      }
    });

    makeObservable(this, {
      searchQuery: observable,
      items: observable,
      recipes: observable,
      setSearchQuery: action,
      addItem: action,
      removeItem: action,
      toggleItemCheck: action,
      moveItem: action,
      updateItem: action,
      count: computed,
      sortedItems: computed,
      addRecipe: action,
      removeRecipe: action,
    })
  }

  setSearchQuery(newQuery : string) {
    this.searchQuery = newQuery
  }

  addItem(name : string, notes : string) : boolean {
    let nameDoesNotExist = this.items.findIndex((item) => item.name == name) == -1

    if (!nameDoesNotExist) {
      Alert.alert(
        "Invalid Name",
        "Item with this name already exists",
        [
          {
            text: "Cancel",
            style: "cancel"
          }
        ]
      )
      
      return false
    }

    if (name === "") {
      return false
    }

    this.items = [new Item(name, notes), ...this.items]
    this.saveToStore()
    return true
  }

  removeItem(id : string) {
    this.items = this.items.filter(item => item.id != id)

    this.saveToStore()
  }

  toggleItemCheck(id : string) {
    this.items = this.items.map((item) => {
      if (item.id == id) {
        let newItem = Item.clone(item)
        newItem.isChecked = !item.isChecked
        return newItem
      }

      return item
    })

    this.saveToStore()
  }

  moveItem (id : string, distance : number) {
    let i = this.items.findIndex((item) => {
      return item.id == id
    })

    if (i == -1) {
      return false
    }

    if (i + distance < 0) {
      distance = 0 - i
    }

    if (i + distance >= this.items.length) {
      distance = this.items.length - i
    }

    let temp = this.items[i]
    let res = this.items.filter((item, index) => index !== i)

    res.splice(i + distance, 0, temp)

    this.items = res

    this.saveToStore()

    return true
  }

  updateItem(id : string, name : string, notes : string) {
    this.items = this.items.map((item) => {
      if (item.id == id) {
        let newItem = Item.clone(item)
        newItem.name = name
        newItem.notes = notes
        return newItem
      }

      return item
    })

    this.saveToStore()
  }

  get count() {
    return this.items.length
  }

  get sortedItems() {
    let res = this.items.filter((item) => {
      return item.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0
    }).sort((a, b) => {
      if (a.isChecked == b.isChecked) {
        return 0
      } else {
        return a.isChecked ? 1 : -1
      }
    })

    return res
  }

  addRecipe(name : string) : Recipe | undefined {
    let nameDoesNotExist = this.recipes.findIndex((item) => item.name == name) == -1

    if (name === "") {
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

      return undefined
    }

    if (!nameDoesNotExist) {
      Alert.alert(
        "Invalid Name",
        "Recipe with this name already exists",
        [
          {
            text: "Cancel",
            style: "cancel"
          }
        ]
      )
      
      return undefined
    }

    let recipe = new Recipe(name)
    this.recipes = [recipe, ...this.recipes]
    this.saveToStore()
    return recipe
  }

  removeRecipe(id : string) {
    this.recipes = this.recipes.filter(item => item.id != id)

    this.saveToStore()
  }

  addItemToRecipe(item : Item, recipe : Recipe, isRequired : boolean) {
    let i = this.recipes.findIndex((r) => r.id === recipe.id)

    if (i == -1) {
      return false
    }

    if (isRequired) {
      this.recipes[i].requiredIngredients.add(item.id)
    } else {
      this.recipes[i].optionalIngredients.add(item.id)
    }

    return true
  }

  saveToStore() {
    AsyncStorage.setItem("items", JSON.stringify(this.items));
    AsyncStorage.setItem("recipes", JSON.stringify(this.recipes));
  }
}

export const itemsStore = new ItemsStore()