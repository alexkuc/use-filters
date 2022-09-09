import { random, times, uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import { Filter, useFilters } from '../../../src/useFilters';
import './style.scss';

const makeFilter = (checkData: (n: number) => boolean): Filter<number> => {
  return {
    checkData,
    addValue: () => {},
    removeValue: () => {},
    setValues: () => {},
    resetValues: () => {},
  };
};

const Object = () => {
  type filters = {
    odd?: Filter<number>;
    even?: Filter<number>;
  };

  const [data] = useState(times(25, () => random(0, 100, false)));

  const [state, setState] = useState(data);

  const { getData, setFilters, filters } = useFilters<number, filters>({
    data,
    filters: {},
  });

  useEffect(() => {
    setState(getData());
  }, [filters]);

  const filterOdd = () => {
    setFilters({ odd: makeFilter((n) => n % 2 !== 0) });
  };

  const filterEven = () => {
    setFilters({ odd: makeFilter((n) => n % 2 === 0) });
  };

  const filterReset = () => {
    setFilters({});
  };

  return (
    <div className="object-page">
      <div className="buttons__container">
        <div className="button">
          <button onClick={filterOdd}>Filter odd numbers</button>
        </div>
        <div className="button" onClick={filterEven}>
          <button>Filter even numbers</button>
        </div>
        <div className="button" onClick={filterReset}>
          <button>Reset filters</button>
        </div>
      </div>
      <ul>
        {state.map((n) => (
          <li key={uniqueId()}>{n}</li>
        ))}
      </ul>
    </div>
  );
};

export { Object };
