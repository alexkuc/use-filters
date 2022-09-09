import { isEqual } from 'lodash';
import { Filter as Base } from '../../../src/useFilters';
import { User } from './User';
import { Tuple } from './utility';

type Params = {
  updateState: () => void;
};

class Filter<T extends Tuple<U>, U extends User> implements Base<U> {
  private values: T[] = [];
  private updateState: () => void;

  constructor({ updateState }: Params) {
    this.updateState = updateState;
  }

  checkData(user: U): boolean {
    if (this.values.length === 0) return true;

    return this.values.some((tuple) => {
      const k = tuple[0];
      const v = tuple[1];

      if (typeof v === 'string') {
        return user[k] === v;
      }

      if (Array.isArray(v)) {
        return v.some((v) => user[k] === v);
      }
    });
  }

  removeValue(tuple: T): void {
    this.values = this.values.filter((v) => !isEqual(v, tuple));
    this.updateState();
  }

  addValue(tuple: T): void {
    if (this.isActive(tuple)) return;
    this.values.push(tuple);
    this.updateState();
  }

  setValues(tupleArr: T[]): void {
    this.values = tupleArr;
    this.updateState();
  }

  resetValues(): void {
    this.values = [];
    this.updateState();
  }

  isActive(tuple: T): boolean {
    return this.values.findIndex((v) => isEqual(tuple, v)) !== -1;
  }
}

export { Filter };
