import { useState } from 'react';

export type Filter<DataValue> = {
  checkData: (item: DataValue) => boolean;
  removeFilter: (value: any) => void;
  addFilter: (value: any) => void;
  setFilter: (value: any | any[]) => void;
  resetFilter: () => void;
};

type FilterMapType<DataValue> = {
  [key: string]: Filter<DataValue>;
  [key: number]: Filter<DataValue>;
  [key: symbol]: Filter<DataValue>;
};

type Params<DataValue, FilterMap extends FilterMapType<DataValue>> = {
  data: DataValue[];
  filters: FilterMap;
};

const useFilters = <DataValue, FilterMap extends FilterMapType<DataValue>>({
  data: paramData,
  filters: paramFilters,
}: Params<DataValue, FilterMap>) => {
  const [data, setData] = useState(paramData);
  const [filters, setFilters] = useState(paramFilters);

  const getData = (logic: 'OR' | 'AND' = 'OR'): DataValue[] => {
    if (logic === 'OR') {
      return data.filter((item) => {
        return Object.values(filters).some((filter) => {
          return filter.checkData(item);
        });
      });
    }

    if (logic === 'AND') {
      return data.filter((item) => {
        return Object.values(filters).every((filter) => {
          return filter.checkData(item);
        });
      });
    }

    return []; // catch-all value
  };

  // https://stackoverflow.com/a/54165564
  // https://stackoverflow.com/a/71788339
  const getFilter = <K extends keyof FilterMap>(
    key: K
  ): FilterMap[K] | undefined => {
    return paramFilters[key];
  };

  return {
    getData,
    setData,
    getFilter,
    setFilters,
  };
};

export { useFilters };
