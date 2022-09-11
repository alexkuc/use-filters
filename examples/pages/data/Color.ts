import { faker } from '@faker-js/faker';
import { times } from 'lodash';

class Color {
  public readonly id: string;
  public readonly color: string;

  constructor() {
    this.id = faker.helpers.unique(faker.datatype.uuid);
    const color = faker.color.human();
    this.color = color[0].toUpperCase() + color.slice(1);
  }
}

function makeColors(n: number): Color[] {
  return times(n, () => new Color());
}

export { Color, makeColors };
