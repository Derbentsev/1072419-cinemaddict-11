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

  removeItem(key) {

  }
}