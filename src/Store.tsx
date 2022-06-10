import { makeAutoObservable } from 'mobx';
import { Item } from './Item';

type filterCb = (item: Item) => boolean;

interface StoreInterface {
  addFilter(key: string, cb: filterCb): void;
  resetFilters(): void;
}

class Store implements StoreInterface {
  protected _data: Array<Item>;
  protected _filters: {
    [key: string]: filterCb;
  };

  public get data(): Array<Item> {
    return this._data.filter((item) => {
      for (const k in this._filters) {
        const filter = this._filters[k];
        if (!filter(item)) return false;
      }
      return true;
    });
  }

  constructor({ data }: { data: Array<Item> }) {
    makeAutoObservable(this);
    this._data = data;
    this._filters = {};
  }

  addFilter(key: string, cb: filterCb): void {
    this._filters[key] = cb;
  }

  resetFilters(): void {
    this._filters = {};
  }
}

export { Store };
