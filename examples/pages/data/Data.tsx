import { sample, shuffle } from 'lodash';
import { useState } from 'react';
import { useFilters } from '../../../src/useFilters';
import { Button } from './Button';
import { Color, makeColors } from './Color';
import { Filter } from './Filter';
import { makeUsers, User } from './User';

const Data = () => {
  const [state, setState] = useState(
    shuffle([...makeUsers(50), ...makeColors(50)])
  );
  const [color] = useState(getRandom('color', Color, state));
  const [name] = useState(getRandom('name', User, state));

  const [filter] = useState(new Filter());

  const { getData } = useFilters({
    data: state,
    filters: { filter },
  });

  filter.addCallback(() => setState(getData('AND')));

  return (
    <div className="page-data">
      <div className="filters">
        <div className="button">
          <Button filter={filter} tuple={['color', color]}>
            Filter color "{color}"
          </Button>
        </div>
        <Button filter={filter} tuple={['name', name]}>
          Filter name "{name}"
        </Button>
        <div className="button">
          <button
            onClick={() => {
              filter.resetValues();
            }}
          >
            Reset filter
          </button>
        </div>
      </div>
      <div className="data">
        <ol>
          {state.map((v) => {
            if (v instanceof Color) {
              return <li key={v.id}>{v.color}</li>;
            }
            if (v instanceof User) {
              return <li key={v.id}>{v.name}</li>;
            }
          })}
        </ol>
      </div>
    </div>
  );
};

type ExtractType<T> = T extends (infer U)[] ? U : T;

type Callback<T> = (item: T) => boolean;

function filter<T>(arr: any[], cb: Callback<ExtractType<typeof arr>>): T[] {
  return arr.filter((item): item is T => cb(item));
}

function getRandom<T>(
  key: keyof User | keyof Color,
  cls: any,
  arr: (User | Color)[]
): T[keyof T] {
  const many = filter<T>(arr, (i) => i instanceof cls);
  const single = sample(many);
  if (single === undefined || single === null) throw new Error();
  if (key in single === false) throw new Error();
  const t = single as T;
  const k = key as keyof typeof t;
  return t[k];
}

export { Data };
