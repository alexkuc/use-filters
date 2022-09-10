import { faker } from '@faker-js/faker';
import { times } from 'lodash';

class Client {
  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly phone: string;

  constructor() {
    this.id = faker.helpers.unique(faker.datatype.uuid);
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
    this.email = faker.internet.email(this.firstName, this.lastName);
    this.phone = faker.phone.number();
  }
}

const makeClients = (n: number = 1): Client[] => {
  if (n < 1) throw new Error('Specify positive parameter "n"!');
  const arr = times(n, () => new Client());
  return arr;
};

export { Client, makeClients };
