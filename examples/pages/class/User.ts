import { faker } from '@faker-js/faker';
import { times, uniqueId } from 'lodash';

class User {
  public readonly id: string;
  public readonly name: string;
  public readonly color: string;

  constructor() {
    this.id = uniqueId();
    this.name = faker.name.firstName();
    this.color = faker.color.human();
  }
}

const makeUser = (): User => new User();

const makeUsers = (n: number) => times(n, () => makeUser());

export { User, makeUsers };
