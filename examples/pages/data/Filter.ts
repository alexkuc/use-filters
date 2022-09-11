import { isEqual } from 'lodash';
import { Filter as Base } from '../../../src/useFilters';
import { Color } from './Color';
import { User } from './User';

export type Tuple<T> = [keyof T, T[keyof T]];

class Filter<I extends Color & User, U extends Color | User>
  implements Base<U>
{
  private values: Tuple<I>[] = [];
  private callbacks: (() => void)[] = [];

  checkData(item: Color | User): boolean {
    if (this.values.length === 0) return true;
    return this.values.every((v) => {
      const [key, value] = v;
      if (key in item === false) return true;
      return item[key as keyof typeof item] === value;
    });
  }

  removeValue(value: string): void {
    this.values = this.values.filter((v) => v[0] !== value);
    this.applyCallbacks();
  }

  addValue(value: Tuple<I>): void {
    if (this.hasValue(value)) return;
    this.values.push(value);
    this.applyCallbacks();
  }

  hasValue(value: Tuple<I>): boolean {
    return this.values.findIndex((v) => isEqual(v, value)) !== -1;
  }

  setValues(values: Tuple<I>[]): void {
    this.values = values;
    this.applyCallbacks();
  }

  resetValues(): void {
    this.setValues([]);
    this.applyCallbacks();
  }

  addCallback(callback: () => void): void {
    this.callbacks.push(callback);
  }

  applyCallbacks(): void {
    this.callbacks.forEach((cb) => cb());
  }
}

export { Filter };
