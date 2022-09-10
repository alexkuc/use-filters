import dayjs from 'dayjs';
import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { useFilters } from '../../../src/useFilters';
import { Button } from './button/Button';
import { makeAddresses } from './data/Address';
import { makeClients } from './data/Client';
import { makeOrders } from './data/Order';
import { makeProducts } from './data/Product';
import { Logic, MetaFilter } from './filter/MetaFilter';
import { ValueFilter } from './filter/ValueFilter';
import { sample } from './utility';

const Nested = () => {
  const [clients] = useState(makeClients(10));
  const [addresses] = useState(makeAddresses(10));
  const [products] = useState(makeProducts(10));
  const [orders] = useState(makeOrders({ clients, addresses, products }, 100));
  const [state, setState] = useState(orders);
  const [productName] = useState(sample(products).name);
  const [productType] = useState(sample(products).type);

  const [filter] = useState(new MetaFilter({ logic: Logic.AND }));

  const [order] = useState(new ValueFilter({}));
  const [address] = useState(new ValueFilter({}));
  const [product] = useState(new MetaFilter({ logic: Logic.AND }));

  const [price] = useState(new ValueFilter({}));
  const [txt] = useState(new ValueFilter({}));

  product.setValues([price, txt]);
  filter.setValues([order, address, product]);

  const { getData, filters } = useFilters({
    data: orders,
    filters: { filter: filter },
  });

  const updateState = () => setState(getData('AND'));

  useEffect(() => {
    updateState();
  }, [filters]);

  const reset = () => {
    address.resetValues();
    order.resetValues();
    price.resetValues();
    txt.resetValues();
    updateState();
  };

  return (
    <div className="page-nested">
      <div className="buttons">
        <Button
          filter={address}
          condition={[
            'sameAddress',
            (o) => isEqual(o.billingAddress, o.shippingAddress),
          ]}
          cb={updateState}
        >
          Filter same address for billing & shipping
        </Button>
        <Button
          filter={order}
          condition={['recentOrder', (o) => dayjs().diff(o.date, 'd') < 7]}
          cb={updateState}
        >
          Filter recent orders (7 days)
        </Button>
        <div className="button__union">
          <Button
            filter={price}
            condition={['cheap', (o) => parseInt(o.product.price) < 300]}
            cb={updateState}
          >
            {'Filter cheap products (<300)'}
          </Button>
          <Button
            filter={price}
            condition={['expensive', (o) => parseInt(o.product.price) > 1000]}
            cb={updateState}
          >
            {'Filter expensive products (>1000)'}
          </Button>
          <Button
            filter={txt}
            condition={['name', (o) => o.product.name === productName]}
            cb={updateState}
          >
            Filter "{productName}"
          </Button>
          <Button
            filter={txt}
            condition={['type', (o) => o.product.type === productType]}
            cb={updateState}
          >
            Filter "{productType}"
          </Button>
        </div>
        <div className="button">
          <button onClick={reset}>Reset filters</button>
        </div>
      </div>
      <div className="orders">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Date</th>
              <th>Email</th>
              <th>Product Type</th>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {state.map((o, i) => {
              return (
                <tr key={o.id}>
                  <td>{i}</td>
                  <td>{o.id.slice(0, 8)}-...</td>
                  <td>{dayjs(o.date).format('DD MMM YYYY')}</td>
                  <td>{o.client.email}</td>
                  <td>{o.product.type}</td>
                  <td>{o.product.name}</td>
                  <td>{o.product.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { Nested };
