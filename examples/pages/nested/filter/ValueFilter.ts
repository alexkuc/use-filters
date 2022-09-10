import { Filter } from '../../../../src/useFilters';
import { Order } from '../data/Order';

type Callback = (order: Order) => boolean;

export type Condition = [string, Callback];

export enum Logic {
  'AND' = 'every',
  'OR' = 'some',
}

type Params = {
  logic?: Logic;
};

class ValueFilter implements Filter<Order> {
  private conditions = new Map<Condition[0], Condition[1]>();
  private logic: Logic;

  constructor({ logic }: Params) {
    this.logic = logic ?? Logic.OR;
  }

  checkData(order: Order): boolean {
    if (this.conditions.size === 0) return true;
    const arr = Array.from(this.conditions.values());
    return arr[this.logic]((cb) => cb(order));
  }

  addValue(condition: [string, Callback]): void {
    const [name, callback] = condition;
    this.conditions.set(name, callback);
  }

  removeValue(name: string): void {
    this.conditions.delete(name);
  }

  hasValue(name: string): boolean {
    return this.conditions.has(name);
  }

  setValues(conditions: Map<string, Callback>): void {
    this.conditions = conditions;
  }

  resetValues(): void {
    this.conditions.clear();
  }
}

export { ValueFilter };
