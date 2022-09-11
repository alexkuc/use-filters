import { faker } from '@faker-js/faker';
import { times } from 'lodash';

class User {
  public readonly id: string;
  public readonly name: string;

  constructor() {
    this.id = faker.helpers.unique(faker.datatype.uuid);
    this.name = faker.name.firstName();
  }
}

function makeUsers(n: number): User[] {
  return times(n, () => new User());
}

export { User, makeUsers };
