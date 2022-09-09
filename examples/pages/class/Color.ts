import { includes } from 'lodash';
import { Filter } from '../../../src/useFilters';
import { User } from './User';

type Params = {
  updateState: () => void;
};

class Color implements Filter<User> {
  private colors: string[] = [];
  private updateState: () => void;

  constructor({ updateState }: Params) {
    this.updateState = updateState;
  }

  checkData(user: User): boolean {
    if (this.colors.length === 0) return true;
    return includes(this.colors, user.color);
  }

  removeValue(color: string): void {
    this.colors = this.colors.filter((c) => c !== color);
    this.updateState();
  }

  addValue(color: string): void {
    // avoids duplicate values
    if (includes(this.colors, color)) return;
    this.colors.push(color);
    this.updateState();
  }

  setValues(colors: string[]): void {
    this.colors = colors;
    this.updateState();
  }

  getValues(): string[] {
    return this.colors;
  }

  resetValues(): void {
    this.colors = [];
    this.updateState();
  }
}

export { Color };
