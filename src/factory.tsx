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

export { makeItem };
