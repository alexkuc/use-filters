import { faker } from '@faker-js/faker';
import { times } from 'lodash';

class Product {
  public readonly id: string;
  public readonly type: string;
  public readonly price: string;
  public readonly name: string;

  constructor() {
    this.id = faker.helpers.unique(faker.datatype.uuid);
    this.type = faker.commerce.product();
    this.price = faker.commerce.price();
    this.name = faker.commerce.productName();
  }
}

const makeProducts = (n: number = 1): Product[] => {
  if (n < 1) throw new Error('Specify positive parameter "n"!');
  const arr = times(n, () => new Product());
  return arr;
};

export { Product, makeProducts };
