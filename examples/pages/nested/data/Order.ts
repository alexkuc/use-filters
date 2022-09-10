import { faker } from '@faker-js/faker';
import { times } from 'lodash';
import { array, random, sample } from '../utility';
import { Address } from './Address';
import { Client } from './Client';
import { Product } from './Product';

type Params = {
  product: Product;
  client: Client;
  billingAddress: Address;
  shippingAddress?: Address;
};

class Order {
  public readonly id: string;
  public readonly date: Date;
  public readonly product: Product;
  public readonly client: Client;
  public readonly billingAddress: Address;
  public readonly shippingAddress: Address;

  constructor({ product, client, billingAddress, shippingAddress }: Params) {
    this.id = faker.helpers.unique(faker.datatype.uuid);
    this.date = random(faker.date.recent(), faker.date.past());
    this.product = product;
    this.client = client;
    this.billingAddress = billingAddress;
    this.shippingAddress = shippingAddress ?? billingAddress;
  }
}

type makeOrder = {
  clients: Client | Client[];
  products: Product | Product[];
  addresses: Address | Address[];
};

const makeOrders = (
  {
    clients = new Client(),
    products = new Product(),
    addresses = new Address(),
  }: makeOrder,
  n: number = 1
): Order[] => {
  if (n < 1) throw new Error('Specify positive parameter "n"!');
  const _client = array(clients);
  const _product = array(products);
  const _address = array(addresses);
  const arr = times(
    n,
    () =>
      new Order({
        client: sample(_client),
        product: sample(_product),
        billingAddress: sample(_address),
        shippingAddress: random(sample(_address), undefined),
      })
  );
  return arr;
};

export { Order, makeOrders };
