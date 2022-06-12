import { FilterByMap, FilterByVal } from './Filters';
import { faker } from '@faker-js/faker';
import { Item } from './Item';

const makeItem = ({ language, level }: { language: string; level: string }) => {
  return new Item({
    id: faker.mersenne.rand(),
    title: faker.lorem.sentence(),
    description: faker.lorem.lines(),
    instructor: faker.name.findName(),
    startTime: faker.date.soon(90),
    language: language,
    level: level,
  });
};

const makeNestedFilter = (): FilterByMap => {
  const L1 = new FilterByMap({
    key: 'L1',
    apply: function (item): boolean {
      if (this.value?.size === 0) return true;
      const arr = this.value?.toArray();
      return arr!.some((f) => f.apply(item) === true);
    },
  });

  const L2 = new FilterByMap({
    key: 'L2',
    apply: function (item): boolean {
      if (this.value?.size === 0) return true;
      const arr = this.value?.toArray();
      return arr!.some((f) => f.apply(item) === true);
    },
  });

  const L3 = new FilterByMap({
    key: 'L3',
    apply: function (item): boolean {
      if (this.value?.size === 0) return true;
      const arr = this.value?.toArray();
      return arr!.some((f) => f.apply(item) === true);
    },
  });

  L3.add(
    new FilterByVal({
      key: 'quos',
      apply: function (item) {
        return item.title.includes('quos');
      },
    })
  );
  L3.add(
    new FilterByVal({
      key: 'ut',
      apply: function (item) {
        return item.title.includes('ut');
      },
    })
  );
  L3.add(
    new FilterByVal({
      key: 'aut',
      apply: function (item) {
        return item.title.includes('aut');
      },
    })
  );

  L1.add(L2);
  L2.add(L3);

  return L1;
};

export { makeItem, makeNestedFilter };
