import { includes, isEqual } from 'lodash';
import { Filter as Base } from '../../../../src/useFilters';
import { Order } from '../data/Order';
import { ValueFilter } from './ValueFilter';

type Params = {
  logic?: Logic;
};

export enum Logic {
  'AND' = 'every',
  'OR' = 'some',
}

type Value = MetaFilter | ValueFilter;

class MetaFilter implements Base<Order> {
  private values: Value[] = [];
  private logic: Logic;

  constructor({ logic }: Params) {
    this.logic = logic ?? Logic.OR;
  }

  checkData(order: Order): boolean {
    if (this.values.length === 0) return true;
    return this.values[this.logic]((v) => v.checkData(order));
  }

  removeValue(value: Value): void {
    this.values = this.values.filter((v) => !isEqual(v, value));
  }

  addValue(value: Value): void {
    if (includes(this.values, value)) return;
    this.values.push(value);
  }

  setValues(values: Value[]): void {
    this.values = values;
  }

  resetValues(): void {
    this.values = [];
  }
}

export { MetaFilter };
