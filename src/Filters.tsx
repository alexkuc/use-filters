import { includes, isArray, uniq } from 'lodash';
import { makeAutoObservable } from 'mobx';
import { Item } from './Item';

export type FilterType = 'language' | 'level';

export type Filter<T> = T extends 'language'
  ? FilterScalar
  : T extends 'level'
  ? FilterArray
  : never;

export interface FilterInterface {
  key: string;
  value: any;
  apply: (item: Item) => boolean;
  reset(): void;
}

export class FilterScalar implements FilterInterface {
  public key: string;
  public value: string;
  apply: (item: Item) => boolean;

  constructor({
    key,
    value,
    apply: apply,
  }: {
    key: string;
    value?: string;
    apply: (item: Item) => boolean;
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

export class FilterArray implements FilterInterface {
  public key: string;
  public value: Array<string>;
  apply: (item: Item) => boolean;

  constructor({
    key,
    value,
    apply: apply,
  }: {
    key: string;
    value?: Array<string>;
    apply: (item: Item) => boolean;
  }) {
    makeAutoObservable(this);
    this.key = key;
    this.value = value || [];
    this.apply = apply;
  }

  reset(): void {
    this.value = [];
  }

  hasValue(val: string): boolean {
    return includes(this.value, val);
  }

  addValue(val: string): void {
    this.value = uniq([...this.value, val]);
  }

  removeValue(val: string): void {
    this.value = this.value.filter((i) => i !== val);
  }
}
