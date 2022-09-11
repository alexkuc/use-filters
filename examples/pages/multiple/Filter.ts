import { includes, isEqual } from 'lodash';
import { Filter as Base } from '../../../src/useFilters';
import { Data } from './Data';

type Params<D> = {
  key: keyof D;
};

class Filter implements Base<Data> {
  private values: string[] = [];
  private cbs: (() => void)[] = [];
  private key: keyof Data;

  constructor({ key }: Params<Data>) {
    this.key = key;
  }

  checkData(item: Data): boolean {
    if (this.values.length === 0) return true;
    return this.values.some((v) => item[this.key] === v);
  }

  removeValue(value: string): void {
    this.values = this.values.filter((v) => !isEqual(v, value));
    this.applyCallbacks();
  }

  addValue(value: string): void {
    if (!this.hasValue(value)) this.values.push(value);
    this.applyCallbacks();
  }

  hasValue(value: string): boolean {
    return includes(this.values, value);
  }

  isActive(): boolean {
    return this.values.length > 0;
  }

  getValues(): string[] {
    return this.values;
  }

  setValues(values: string[]): void {
    this.values = values;
    this.applyCallbacks();
  }

  resetValues(): void {
    this.setValues([]);
  }

  addCallback(callback: () => void): void {
    this.cbs.push(callback);
  }

  private applyCallbacks(): void {
    this.cbs.forEach((cb) => cb());
  }
}

export { Filter };
