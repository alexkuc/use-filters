import { includes, isArray, uniq } from 'lodash';
import { makeAutoObservable } from 'mobx';
import { Item } from './Item';

export type FilterType = 'language' | 'level';
type ApplyType = (item: Item) => boolean;


export type Filter<T> = T extends 'language'
  ? FilterByVal
  : T extends 'level'
  ? FilterByArr
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
