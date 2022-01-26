import { action, computed, makeObservable, observable } from "mobx"

export enum ItemType {
  Recurring,
  OneTime
}

enum ItemState {
  Checked,
  Unchecked,
  Disabled
}

class Item {
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
      count: computed
    })
  }

  addItem(name : string, type : ItemType) {
    this.items = [...this.items, new Item(name, type)]
  }

  removeItem(id : number) {
    this.items.filter(item => item.id != id)
  }

  get count() {
    return this.items.length
  }
}

export const itemsStore = new ItemsStore()