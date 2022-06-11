import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Store } from './Store';
import 'normalize.css';
import './style.scss';
import { useState } from 'react';
import { includes } from 'lodash';

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
              setFilters((prevState) => {
                return { ...prevState, language: lang };
              });
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
      {props.levels &&
        props.levels.map((level) => (
          <label key={level}>
            {level}
            <input
              type="checkbox"
              key={level}
              value={level}
              checked={includes(props.store.getFilter('level')?.value, level)}
              onChange={action((e) => {
                const c = e.currentTarget.checked;
                let v: Array<string> =
                  props.store.getFilter('level')?.value ?? [];
                if (c && !includes(v, level)) v.push(level);
                if (!c) v = v.filter((i) => i !== level);
                if (v.length !== 0) {
                  props.store.addFilter({
                    key: 'level',
                    value: v,
                    cb: (item) => includes(v, item.level),
                  });
                }
                if (v.length === 0) props.store.removeFilter('level');
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
