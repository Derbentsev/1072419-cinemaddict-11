export class Store {
  constructor(key, storage) {
    this._storageKey = key;
    this._storage = storage;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.geyItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
        this._storageKey,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  setItems(items) {
    this._storage.setItem(
        this._storageKey,
        JSON.stringify(items)
    );
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
        this._storageKey,
        JSON.stringify(store)
    );
  }
}
