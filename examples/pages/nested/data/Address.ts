import { faker } from '@faker-js/faker';
import { times } from 'lodash';

class Address {
  public readonly id: string;
  public readonly country: string;
  public readonly state: string;
  public readonly city: string;
  public readonly street: string;
  public readonly zipCode: string;

  constructor() {
    this.id = faker.helpers.unique(faker.datatype.uuid);
    this.country = faker.address.country();
    this.state = faker.address.state();
    this.city = faker.address.cityName();
    this.street = faker.address.street();
    this.zipCode = faker.address.zipCode();
  }
}

const makeAddresses = (n: number = 1): Address[] => {
  if (n < 1) throw new Error('Specify positive parameter "n"!');
  const arr = times(n, () => new Address());
  return arr;
};

export { Address, makeAddresses };
