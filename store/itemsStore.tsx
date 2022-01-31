import { action, computed, makeObservable, observable } from "mobx"
import { LayoutAnimation } from "react-native"

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

class ItemsStore {
  items : Item[] = []

  constructor () {
    makeObservable(this, {
      items: observable,
      addItem: action,
      removeItem: action,
      toggleItemCheck: action,
      updateItem: action,
      count: computed,
      sortedItems: computed
    })

    this.addItem("one", "ok\nasok\nok\nasok\nok\nasok\nok\nasok\nok\nasok\nok\nasok\nok\nasok\nok\nasok\nok\nasok\nok\nasok\nok\nasok\n\n\n\n\n\n\n\na\n\n\na\n\n\n\n\na")
    this.addItem("two", "")
    this.addItem("three", "")
    this.addItem("four", "")
  }

  addItem(name : string, notes : string) {
    // let nameDoesNotExist = this.items.every((item) => {
    //   item.name !== name
    // })

    // if (!nameDoesNotExist) {
    //   return false
    // }

    if (name === "") {
      return false
    }

    this.items = [...this.items, new Item(name, notes)]
    return true
  }

  removeItem(id : string) {
    this.items.filter(item => item.id != id)
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
  }

  get count() {
    return this.items.length
  }

  get sortedItems() {
    return this.items.concat().sort((a, b) => {
      if (a.isChecked == b.isChecked) {
        return 0
      } else {
        return a.isChecked ? 1 : -1
      }
    })
  }
}

export const itemsStore = new ItemsStore()