import { useState } from 'react';
import { useFilters } from '../../../src/useFilters';
import { Color } from './Color';
import './style.scss';
import { ToggleColor } from './ToggleColor';
import { makeUsers } from './User';

const Class = () => {
  const [users] = useState(makeUsers(30));
  const [state, setState] = useState(users);

  const { getData, getFilter } = useFilters({
    data: users,
    filters: {
      color: new Color({
        updateState: () => setState(getData()),
      }),
    },
  });

  const getColor = (n: number) => users[n].color;

  const onAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const v = e.currentTarget.value;
    if (!v) return;
    if (v === 'reset') getFilter('color')?.resetValues();
    if (v !== 'reset') getFilter('color')?.addValue(v);
    setState(getData());
  };

  const onSet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const v = e.currentTarget.value;
    if (!v) return;
    const arr = v.split(',');
    if (arr.length === 0) return;
    getFilter('color')?.setValues(arr);
  };

  return (
    <main className="class-page">
      <div className="buttons">
        <div className="button">
          <button onClick={onAdd} value={getColor(0)}>
            Add to filter "{getColor(0)}"
          </button>
        </div>
        <div className="button">
          <button
            onClick={onSet}
            value={[getColor(3), getColor(6), getColor(9)]}
          >
            Set filter to "{getColor(3)}", "{getColor(6)}", "{getColor(9)}"
          </button>
        </div>
        <div className="button">
          <ToggleColor
            color={getColor(24)}
            colors={getFilter('color')?.getValues() ?? []}
            onAdd={() => getFilter('color')?.addValue(getColor(24))}
            onRemove={() => getFilter('color')?.removeValue(getColor(24))}
          />{' '}
          (toggle)
        </div>
        <br />
        <div className="button">
          <button onClick={onAdd} value="reset">
            Reset filter
          </button>
        </div>
      </div>
      <div className="filter__values">
        Filtered colors: {getFilter('color')?.getValues().join(', ')}
      </div>
      <ul className="users">
        {state.map((user) => (
          <li key={user.id}>
            {user.name}, {user.color}
          </li>
        ))}
      </ul>
    </main>
  );
};

export { Class };
