import { includes, uniq } from 'lodash';
import { makeAutoObservable, toJS } from 'mobx';
import { Item } from './Item';

type ApplyType = (item: Item) => boolean;

export type FilterType = 'language' | 'level' | 'time';

export type Filter<T> = T extends 'language'
  ? FilterByVal
  : T extends 'level'
  ? FilterByArr
  : T extends 'time'
  ? FilterByMap
  : never;

export interface FilterInterface {
  key: string;
  apply: ApplyType;
  reset(): void;
}

export class FilterByVal implements FilterInterface {
  public key: string;
  public value: any;
  public apply: ApplyType;

  constructor({
    key,
    value,
    apply: apply,
  }: {
    key: string;
    value?: any;
    apply: ApplyType;
  }) {
    makeAutoObservable(this);
    this.key = key;
    this.value = value || '';
    this.apply = apply;
  }

  reset(): void {
    this.value = '';
  }
}

export class FilterByArr implements FilterInterface {
  public key: string;
  protected value: Array<any>;
  public apply: ApplyType;

  constructor({
    key,
    value,
    apply: apply,
  }: {
    key: string;
    value?: Array<any>;
    apply: ApplyType;
  }) {
    makeAutoObservable(this);
    this.key = key;
    this.value = value || [];
    this.apply = apply;
  }

  reset(): void {
    this.value = [];
  }

  hasValue(val: any): boolean {
    return includes(this.value, val);
  }

  addValue(val: string): void {
    this.value = uniq([...this.value, val]);
  }

  removeValue(val: string): void {
    this.value = this.value.filter((i) => i !== val);
  }
}

interface FilterCollectionInterface extends FilterInterface {
  add(filter: FilterInterface): void;
  remove(filter: FilterInterface): boolean;
  has(filter: FilterInterface): boolean;
}

// ugly but I don't know how to make it better...
declare global {
  interface Map<K, V> {
    toArray(): Array<FilterInterface>;
  }
}

export class FilterByMap implements FilterCollectionInterface {
  public key: string;
  protected value: Map<string, FilterInterface>;
  public apply: ApplyType;

  constructor({
    key,
    value,
    apply,
  }: {
    key: string;
    value?: Map<string, FilterInterface>;
    apply: ApplyType;
  }) {
    makeAutoObservable(this);
    this.key = key;
    this.value = value || new Map();
    this.apply = apply;

    this.updatePrototype();
  }

  protected updatePrototype(): void {
    // easier conversion to array
    this.value.toArray = function (): Array<FilterInterface> {
      const arr: Array<FilterInterface> = [];
      this.forEach((filter) => arr.push(filter));
      return arr;
    };

    // return native JS object when using .forEach()
    this.value.forEach = function (
      callback: (
        value: FilterInterface,
        key: string,
        map: Map<any, FilterInterface>
      ) => void,
      thisArg?: any
    ): void {
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
      thisArg = thisArg || this;
      for (const [k, v] of this.entries()) {
        callback.call(thisArg, toJS(v), k, this);
      }
    };
  }

  add(filter: FilterInterface): void {
    this.value.set(filter.key, filter);
  }

  remove(filter: FilterInterface): boolean {
    return this.value.delete(filter.key);
  }

  has(filter: FilterInterface): boolean {
    return this.value.get(filter.key) !== undefined;
  }

  reset(): void {
    this.value.clear();
  }
}
