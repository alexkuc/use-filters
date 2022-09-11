import { useEffect, useState } from 'react';
import { useFilters } from '../../../src/useFilters';
import { Cell } from './Cell';
import { Data, makeData } from './Data';
import { Filter } from './Filter';
import { RadioButton } from './RadioButton';
import { Status } from './Status';
import './style.scss';

type Logic = 'AND' | 'OR';

const Multiple = () => {
  const [state, setState] = useState<{
    data: Data[];
    logic: Logic;
  }>({
    data: makeData(50),
    logic: 'OR',
  });

  const [color] = useState(new Filter({ key: 'color' }));
  const [music] = useState(new Filter({ key: 'music' }));
  const [car] = useState(new Filter({ key: 'car' }));

  const updateData = () => {
    setState({
      data: getData(state.logic),
      logic: state.logic,
    });
  };

  color.addCallback(updateData);
  music.addCallback(updateData);
  car.addCallback(updateData);

  const _filters = { color, music, car };

  const { getData, filters } = useFilters({
    data: state.data,
    filters: _filters,
  });

  useEffect(() => {
    setState({
      data: getData(state.logic),
      logic: state.logic,
    });
  }, [filters]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const s = e.currentTarget.value;
    switch (s) {
      case 'AND':
      case 'OR':
        setState({
          data: getData(s),
          logic: s,
        });
    }
  };

  const checked = (v: string): boolean => {
    return v === state.logic;
  };

  return (
    <div className="page-multiple">
      <div className="filters">
        <fieldset>
          <legend>Select filter logic:</legend>
          <RadioButton value="AND" onChange={onChange} checked={checked}>
            Match <b>all</b> filters (AND)
          </RadioButton>
          <br />
          <RadioButton value="OR" onChange={onChange} checked={checked}>
            Match any filters (OR)
          </RadioButton>
        </fieldset>
        <Status filter={color}>Color filter</Status>
        <Status filter={music}>Music filter</Status>
        <Status filter={car}>Car filter</Status>
        <button
          onClick={() => {
            color.resetValues();
            car.resetValues();
            music.resetValues();
          }}
        >
          Reset all filters
        </button>
      </div>
      <div className="note">Hover over data cells to filter values!</div>
      <div className="data">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Color</th>
              <th>Music</th>
              <th>Car</th>
            </tr>
          </thead>
          <tbody>
            {state.data.map((data) => {
              return (
                <tr key={data.id}>
                  <Cell>{data.id.slice(0, 8)}</Cell>
                  <Cell>{data.name}</Cell>
                  <Cell filter={color}>{data.color}</Cell>
                  <Cell filter={music}>{data.music}</Cell>
                  <Cell filter={car}>{data.car}</Cell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { Multiple };
