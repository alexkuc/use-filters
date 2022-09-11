import { faker } from '@faker-js/faker';
import { times } from 'lodash';

class Data {
  public readonly id: string;
  public readonly color: string;
  public readonly name: string;
  public readonly music: string;
  public readonly car: string;

  constructor() {
    this.id = faker.datatype.uuid();
    const color = faker.color.human();
    this.color = color[0].toUpperCase() + color.slice(1);
    this.name = faker.name.firstName();
    this.music = faker.music.genre();
    this.car = faker.vehicle.model();
  }
}

function makeData(n: number): Data[] {
  return times(n, () => new Data());
}

export { Data, makeData };
