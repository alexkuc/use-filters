import { has } from 'lodash';
import { makeAutoObservable } from 'mobx';
import { FilterInterface, FilterType, Filter } from './Filters';
import { Item } from './Item';

interface StoreInterface {
  addFilter(filter: FilterInterface): void;
  hasFilter(key: string): boolean;
  removeFilter(key: string): void;
  getFilter(key: string): FilterInterface | null;
  resetFilters(): void;
}

export class Store implements StoreInterface {
  protected _data: Array<Item>;
  protected _filters: {
    [key: string]: FilterInterface;
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

  getFilter<T extends FilterType>(key: T): Filter<T> {
    return this._filters[key] as Filter<T>;
  }

  hasFilter(key: string): boolean {
    return has(this._filters, key);
  }

  removeFilter(key: string): void {
    if (this.hasFilter(key)) delete this._filters[key];
  }

  addFilter(filter: FilterInterface): void {
    filter.value = filter.value;
    this._filters[filter.key] = filter;
  }

  resetFilters(): void {
    this._filters = {};
  }
}
