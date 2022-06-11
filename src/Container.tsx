import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { includes, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { FilterArray, FilterScalar, Store } from './Store';

import './style.scss';
import 'normalize.css';

interface ContainerProps {
  store: Store;
  languages: Array<string>;
  levels: Array<string>;
}

const Container = observer((props: ContainerProps) => {
  const [filters, setFilters] = useState({
    level: '',
    language: '',
  });

  useEffect(
    () =>
      props.store.addFilter(
        new FilterArray({
          key: 'level',
          cb: function (item) {
            if (isEmpty(this.value)) return true;
            return includes(this.value, item.level);
          },
        })
      ),
    []
  );

  return (
    <div className="container">
      {props.languages &&
        props.languages.map((lang) => (
          <button
            key={lang}
            className={`filter ${
              filters.language === lang ? 'filter--active' : ''
            }`}
            value={lang}
            onClick={action(() => {
              props.store.addFilter({
                key: 'language',
                value: lang,
                cb: (item) => item.language === lang,
              });
            })}
          >
            {lang}
          </button>
        ))}
      <br />
      {props.levels.map((level) => (
        <label key={level}>
          {level}
          <input
            type="checkbox"
            key={level}
            value={level}
            onChange={action((e) => {
              const c = e.currentTarget.checked;

              const f = props.store.getFilter('level') as FilterArray;

              if (c) f.addValue(level);
              if (!c) f.removeValue(level);
            })}
          />
        </label>
      ))}
      <br />
      <button
        onClick={action(() => {
          setFilters({
            language: '',
            level: '',
          });
          props.store.resetFilters();
        })}
      >
        Remove all filters
      </button>
      {props.store && props.store.data.map((item) => item.render())}
    </div>
  );
});

export { Container };
