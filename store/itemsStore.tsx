import { action, computed, makeObservable, observable } from "mobx"

export enum ItemType {
  Recurring,
  OneTime
}

export enum ItemState {
  Unchecked = 0,
  Checked = 1,
  Disabled = 2
}

export class Item {
  name: string
  type: ItemType
  state: ItemState
  notes: string
  id: number

  constructor (name : string, type : ItemType) {
    this.name = name
    this.type = type
    this.state = ItemState.Unchecked
    this.notes = ""
    this.id = Date.now()
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
      count: computed,
      sortedItems: computed
    })
  }

  addItem(name : string, type : ItemType) {
    this.items = [...this.items, new Item(name, type)]
  }

  removeItem(id : number) {
    this.items.filter(item => item.id != id)
  }

  toggleItemCheck(id : number) {
    this.items = this.items.map((item) => {
      if (item.id == id) {
        let newItem = new Item(item.name, ItemType.Recurring)
        newItem.state = item.state == ItemState.Checked ? ItemState.Unchecked : ItemState.Checked
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
      return a.state - b.state
    })
  }
}

export const itemsStore = new ItemsStore()