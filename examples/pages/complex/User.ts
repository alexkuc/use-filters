import { faker } from '@faker-js/faker';
import { times, uniqueId } from 'lodash';

class User {
  public readonly id: string;
  public readonly name: string;
  public readonly title: string;
  public readonly country: string;
  public readonly color: string;
  public readonly music: string;
  public readonly car: string;

  constructor() {
    this.id = uniqueId();
    this.name = faker.name.fullName();
    this.title = faker.name.jobTitle();
    this.country = faker.address.country();
    this.color = User.getColor();
    this.music = faker.music.genre();
    this.car = faker.vehicle.vehicle();
  }

  public static getColor(): string {
    const color = faker.color.human();
    return color[0].toUpperCase() + color.slice(1);
  }
}

const makeUsers = (n: number) => times(n, () => new User());

export { User, makeUsers };
