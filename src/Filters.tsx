import { includes, uniq } from 'lodash';
import { makeAutoObservable } from 'mobx';
import { Item } from './Item';

export interface FilterInterface {
  key: string;
  value: any;
  cb: (item: Item) => boolean;
}

export class FilterScalar implements FilterInterface {
  key: string;
  value: string;
  cb: (item: Item) => boolean;

  constructor({
    key,
    value,
    cb,
  }: {
    key: string;
    value?: string;
    cb: (item: Item) => boolean;
  }) {
    makeAutoObservable(this);
    this.key = key;
    this.value = value || '';
    this.cb = cb;
  }

  setValue(val: string): void {
    this.value = val;
  }
}

export class FilterArray implements FilterInterface {
  key: string;
  value: Array<string>;
  cb: (item: Item) => boolean;

  constructor({
    key,
    value,
    cb,
  }: {
    key: string;
    value?: Array<string>;
    cb: (item: Item) => boolean;
  }) {
    makeAutoObservable(this);
    this.key = key;
    this.value = value || [];
    this.cb = cb;
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
