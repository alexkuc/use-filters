import { has } from 'lodash';
import { makeAutoObservable, toJS } from 'mobx';
import { Item } from './Item';

interface Filter {
  key: string;
  value: any;
  cb: (item: Item) => boolean;
}

interface StoreInterface {
  addFilter(filter: Filter): void;
  hasFilter(key: string): boolean;
  removeFilter(key: string): void;
  getFilter(key: string): Filter | null;
  resetFilters(): void;
}

class Store implements StoreInterface {
  protected _data: Array<Item>;
  protected _filters: {
    [key: string]: Filter;
  };

  public get data(): Array<Item> {
    return this._data.filter((item) => {
      for (const k in this._filters) {
        const filter = this._filters[k];
        if (!filter.cb(item)) return false;
      }
      return true;
    });
  }

  constructor({ data }: { data: Array<Item> }) {
    makeAutoObservable(this);
    this._data = data;
    this._filters = {};
  }

  getFilter(key: string): Filter | null {
    if (!this.hasFilter(key)) return null;
    return toJS(this._filters[key]);
  }

  hasFilter(key: string): boolean {
    return has(this._filters, key);
  }

  removeFilter(key: string): void {
    if (this.hasFilter(key)) delete this._filters[key];
  }

  addFilter(filter: Filter): void {
    this._filters[filter.key] = filter;
  }

  resetFilters(): void {
    this._filters = {};
  }
}

export { Store };
