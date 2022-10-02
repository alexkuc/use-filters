import { isEmpty } from 'lodash';
import { useState } from 'react';

export type Filter<DataValue> = {
  checkData: (item: DataValue) => boolean;
  removeValue: (value: any) => void;
  addValue: (value: any) => void;
  setValues: (value: any | any[]) => void;
  resetValues: () => void;
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
    // if we are missing filters, skip filtering altogether
    if (isEmpty(filters)) return data;

    const method = getMethod(logic);

    // if invalid key is supplied, just return data as-is
    if (!method) return data;

    return data.filter((item) => {
      return Object.values(filters)[method]((filter) => {
        return filter.checkData(item);
      });
    });
  };

  const getMethod = (
    str: string
  ): keyof Pick<DataValue[], 'every' | 'some'> | null => {
    if (str === 'OR') return 'some';
    if (str === 'AND') return 'every';
    return null;
  };

  /**
   * @deprecated since filters state is exposed, this is redundant
   *
   * {@link https://stackoverflow.com/a/54165564}
   * {@link https://stackoverflow.com/a/71788339}
   */
  const getFilter = <K extends keyof FilterMap>(
    key: K
  ): FilterMap[K] | undefined => {
    return filters[key];
  };

  return {
    getData,
    setData,
    filters,
    getFilter,
    setFilters,
  };
};

export { useFilters };
