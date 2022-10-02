import { makeAutoObservable } from 'mobx';
import { Filter as Base } from '../../../src/useFilters';
import { Color } from './Color';

class Filter implements Base<Color> {
  private colors: Color[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  checkData(color: Color): boolean {
    if (this.colors.length === 0) return true;
    return this.colors.findIndex((c) => c === color) !== -1;
  }

  removeValue(color: Color): void {
    this.colors = this.colors.filter((c) => c !== color);
  }

  addValue(color: Color): void {
    this.colors.push(color);
  }

  setValues(colors: Color[]): void {
    this.colors = colors;
  }

  resetValues(): void {
    this.colors = [];
  }
}

function makeFilter() {
  return {
    colors: new Filter(),
  };
}

export { Filter, makeFilter };
