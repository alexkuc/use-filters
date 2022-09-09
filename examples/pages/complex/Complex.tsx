import { useState } from 'react';
import { useFilters } from '../../../src/useFilters';
import { Button } from './Button';
import { Filter } from './Filter';
import './style.scss';
import { makeUsers } from './User';
import { top, topN } from './utility';

const Complex = () => {
  // to ensure overlap among at least 2 top props, we need *LOTS* of data
  const [users] = useState(makeUsers(100));
  const [state, setState] = useState(users);

  const { getData, getFilter } = useFilters({
    data: users,
    filters: {
      single: new Filter({
        updateState: () => setState(getData('AND')),
      }),
      multiple: new Filter({
        updateState: () => setState(getData('AND')),
      }),
    },
  });

  const topColor = top(users, 'color');
  const topMusic = top(users, 'music');
  const topCar = top(users, 'car');
  const topCountry = top(users, 'country');

  const top5Color = topN(users, 'color', 5);
  const top5Music = topN(users, 'music', 5);
  const top5Car = topN(users, 'car', 5);
  const top5Country = topN(users, 'country', 5);

  return (
    <div className="page-complex">
      <div className="buttons">
        <div className="button">
          <button
            onClick={() => {
              getFilter('single')?.resetValues();
              getFilter('multiple')?.resetValues();
            }}
          >
            Reset filter values
          </button>
        </div>
        <div className="buttons__header">Top 1 filters</div>
        <div className="button">
          {topColor && (
            <div className="button">
              <Button tuple={topColor} filter={getFilter('single')} />
            </div>
          )}
          {topMusic && (
            <div className="button">
              <Button tuple={topMusic} filter={getFilter('single')} />
            </div>
          )}
          {topCountry && (
            <div className="button">
              <Button tuple={topCountry} filter={getFilter('single')} />
            </div>
          )}
          {topCar && (
            <div className="button">
              <Button tuple={topCar} filter={getFilter('single')} />
            </div>
          )}
          <div className="buttons__header">Top 5 filters</div>
          {top5Color && (
            <div className="button">
              <Button tuple={top5Color} filter={getFilter('multiple')} />
            </div>
          )}
          {top5Music && (
            <div className="button">
              <Button tuple={top5Music} filter={getFilter('multiple')} />
            </div>
          )}
          {top5Country && (
            <div className="button">
              <Button tuple={top5Country} filter={getFilter('multiple')} />
            </div>
          )}
          {top5Car && (
            <div className="button">
              <Button tuple={top5Car} filter={getFilter('multiple')} />
            </div>
          )}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Counry</th>
            <th>Color</th>
            <th>Music</th>
            <th>Car</th>
          </tr>
        </thead>
        <tbody>
          {state.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.country}</td>
                <td>{user.color}</td>
                <td>{user.music}</td>
                <td>{user.car}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { Complex };
