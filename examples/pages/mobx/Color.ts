import { faker } from '@faker-js/faker';
import { uniqueId } from 'lodash';
import { makeAutoObservable } from 'mobx';

class Color {
  public readonly name: string;
  public readonly id: string;

  constructor() {
    makeAutoObservable(this);
    this.id = uniqueId();
    this.name = faker.color.human();
  }
}

function makeColors(n: number): Color[] {
  const colors: Color[] = [];
  for (let i = 0; i < n; i++) {
    colors.push(new Color());
  }
  return colors;
}

export { Color, makeColors };
