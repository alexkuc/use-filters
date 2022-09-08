import { act, renderHook } from '@testing-library/react';
import { Filter, useFilters } from './useFilters';

const makeFilter = <DataValue>(
  checkData: (item: DataValue) => boolean
): Filter<DataValue> => {
  return {
    checkData,
    removeFilter() {},
    addFilter() {},
    setFilter() {},
    resetFilter() {},
  };
};

const makeSimpleFilter = () => makeFilter(() => true);

const nestedObjects = [
  {
    levelOneProp: 1,
    nestedProp: {
      levelTwoProp: '!',
      nestedProp: {
        levelThreeProp: 'abc',
      },
    },
  },
  {
    levelOneProp: 2,
    nestedProp: {
      levelTwoProp: '$',
      nestedProp: {
        levelThreeProp: 'def',
      },
    },
  },
  {
    levelOneProp: 3,
    nestedProp: {
      levelTwoProp: '*',
      nestedProp: {
        levelThreeProp: 'ghi',
      },
    },
  },
];

test("getData('OR') without filters", () => {
  const data = [1, 2, 3, 4, 5];
  const filters = {};

  const {
    result: {
      current: { getData },
    },
  } = renderHook(() => useFilters({ data, filters }));

  expect(getData('OR')).toStrictEqual(data);
});

test("getData('AND') without filters", () => {
  const data = [1, 2, 3, 4, 5];
  const filters = {};

  const {
    result: {
      current: { getData },
    },
  } = renderHook(() => useFilters({ data, filters }));

  expect(getData('AND')).toStrictEqual(data);
});

test("getData('AND') with single filter", () => {
  const data = [1, 2, 3, 4, 5];
  const filters = {
    filter: makeSimpleFilter(),
  };

  const {
    result: {
      current: { getData },
    },
  } = renderHook(() => useFilters({ data, filters }));

  expect(getData('AND')).toStrictEqual(data);
});

test("getData('AND') with multiple filters", () => {
  const data = [1, 2, 3, 4, 5];
  const expectedData = [2, 4];
  const filters = {
    filter1: makeFilter<number>((n) => n === 2 || n === 4),
    filter2: makeFilter<number>((n) => n % 2 === 0),
  };

  const {
    result: {
      current: { getData },
    },
  } = renderHook(() => useFilters({ data, filters }));

  expect(getData('AND')).toStrictEqual(expectedData);
});

test("getData('OR') with single filter", () => {
  const data = [1, 2, 3, 4, 5];
  const filters = {
    filter: makeSimpleFilter(),
  };

  const {
    result: {
      current: { getData },
    },
  } = renderHook(() => useFilters({ data, filters }));

  expect(getData('OR')).toStrictEqual(data);
});

test("getData('OR') with multiple filters", () => {
  const data = [1, 2, 3, 4, 5];
  const expectedData = [1, 3, 5];
  const filters = {
    filter1: makeFilter<number>((n) => n === 1),
    filter2: makeFilter<number>((n) => n === 3),
    filter3: makeFilter<number>((n) => n === 5),
  };

  const {
    result: {
      current: { getData },
    },
  } = renderHook(() => useFilters({ data, filters }));

  expect(getData('OR')).toStrictEqual(expectedData);
});

test("getData('invalid') without filters", () => {
  const data = [1, 2, 3, 4, 5];
  const filters = {};

  const {
    result: {
      current: { getData },
    },
  } = renderHook(() => useFilters({ data, filters }));

  // @ts-ignore
  expect(getData('invalid')).toStrictEqual(data);
});

test("getData('invalid') with single filter", () => {
  const data = [1, 2, 3, 4, 5];
  const filters = {
    filter: makeFilter(() => true),
  };

  const {
    result: {
      current: { getData },
    },
  } = renderHook(() => useFilters({ data, filters }));

  // @ts-ignore
  expect(getData('invalid')).toStrictEqual(data);
});

test("getFilter('valid')", () => {
  const data = [1, 2, 3, 4, 5];
  const filters = {
    filter: makeSimpleFilter(),
  };

  const {
    result: {
      current: { getFilter },
    },
  } = renderHook(() => useFilters({ data, filters }));

  expect(getFilter('filter')).toStrictEqual(filters.filter);
});

test("getFilter('non-existing')", () => {
  const data = [1, 2, 3, 4, 5];
  const filters = {
    filter: makeSimpleFilter(),
  };

  const {
    result: {
      current: { getFilter },
    },
  } = renderHook(() => useFilters({ data, filters }));

  // @ts-ignore
  expect(getFilter('non-existing')).toBeUndefined();
});

test('setData()', () => {
  const data = [1, 2, 3, 4, 5];
  const newData = ['a', 'b', 'c', 'd', 'e'];
  const filters = {};

  // Do *not* destructure value of "current", see note below
  // https://react-hooks-testing-library.com/usage/basic-hooks#updates
  const { result } = renderHook(() =>
    useFilters<string | number, typeof filters>({ data, filters })
  );

  expect(result.current.getData()).toStrictEqual(data);

  act(() => result.current.setData(newData));

  expect(result.current.getData()).toStrictEqual(newData);
});

test('setFilters()', () => {
  const data = [1, 2, 3, 4, 5];
  const filters = {};

  type filters = {
    filter?: Filter<any>;
  };

  // https://stackoverflow.com/a/50693866
  type Extractor<T extends any[]> = T extends (infer U)[] ? U : never;

  // Do *not* destructure value of "current", see note below
  // https://react-hooks-testing-library.com/usage/basic-hooks#updates
  const { result } = renderHook(() =>
    useFilters<Extractor<typeof data>, filters>({ data, filters })
  );

  const filter = makeSimpleFilter();

  act(() =>
    result.current.setFilters({
      filter,
    })
  );

  expect(result.current.getFilter('filter')).toStrictEqual(filter);
});

test('nested filters', () => {
  const data = nestedObjects;
  const filters = {
    levelOne: makeFilter<typeof data>((obj) => true),
  };
});
