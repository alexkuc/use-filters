import { includes, uniq } from 'lodash';
import { makeAutoObservable, toJS } from 'mobx';
import { Item } from './Item';

type ApplyType = (item: Item) => boolean;

export type FilterType = 'language' | 'level' | 'time' | 'L1' | 'L2' | 'L3';

export type Filter<T> = T extends 'language'
  ? FilterByVal
  : T extends 'level'
  ? FilterByArr
  : T extends 'time'
  ? FilterByMap
  : T extends 'L1'
  ? FilterByMap
  : T extends 'L2'
  ? FilterByMap
  : T extends 'L3'
  ? FilterByMap
  : never;

export interface FilterInterface {
  key: string;
  label?: string;
  apply: ApplyType;
  reset(): void;
}

export class FilterByVal implements FilterInterface {
  public key: string;
  public label: string;
  public value: any;
  public apply: ApplyType;

  constructor({
    key,
    label,
    value,
    apply: apply,
  }: {
    key: string;
    label?: string;
    value?: any;
    apply: ApplyType;
  }) {
    makeAutoObservable(this);
    this.key = key;
    this.label = label || '';
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
  get(key: any): FilterInterface | undefined;
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

  get(key: any): FilterInterface | undefined {
    return this.value.get(key);
  }

  reset(): void {
    this.value.clear();
  }
}
