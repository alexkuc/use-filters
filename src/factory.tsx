import { faker } from '@faker-js/faker';
import { Item } from './Item';

const makeItem = ({ language, level }: { language: string; level: string }) => {
  return new Item({
    id: faker.mersenne.rand(),
    title: faker.lorem.sentence(),
    description: faker.lorem.lines(),
    instructor: faker.name.findName(),
    startTime: new Date(),
    language: language,
    level: level,
  });
};

export { makeItem };
