import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { includes, isEmpty } from 'lodash';
import { useEffect } from 'react';
import { Store } from './Store';
import { FilterArray, FilterScalar } from './Filters';
import './style.scss';
import 'normalize.css';

interface ContainerProps {
  store: Store;
  languages: Array<string>;
  levels: Array<string>;
}

const Container = observer((props: ContainerProps) => {
  useEffect(() => {
    props.store.addFilter(
      new FilterByArr({
        key: 'level',
        apply: function (item): boolean {
          if (isEmpty(this.value)) return true;
          return includes(this.value, item.level);
        },
      })
    );
    props.store.addFilter(
      new FilterByVal({
        key: 'language',
        apply: function (item): boolean {
          if (this.value?.length === 0) return true;
          return item.language === this.value;
        },
      })
    );
  }, []);

  return (
    <div className="container">
      {props.languages &&
        props.languages.map((lang) => (
          <button
            key={lang}
            className={`filter ${
              props.store.getFilter('language')?.value === lang
                ? 'filter--active'
                : ''
            }`}
            value={lang}
            onClick={action(() => {
              const f = props.store.getFilter('language');
              f.value = lang;
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
              checked={props.store.getFilter('level')?.hasValue(level) ?? false}
              onChange={action((e) => {
                const c = e.currentTarget.checked;
                const f = props.store.getFilter('level');

                if (c) f.addValue(level);
                if (!c) f.removeValue(level);
              })}
            />
          </label>
        ))}
      <br />
      <button onClick={action(() => props.store.resetFilters())}>
        Remove all filters
      </button>
      {props.store &&
        props.store.data.map((item) => (
          <div key={item.id} className="item">
            <ul>
              <li>{item.title}</li>
              <li>{item.language}</li>
              <li>{item.level}</li>
              <li>
                {dayjs(item.starTime).format('D MMM, ddd, HH:MM:ss')}
                {', '}
                {dayjs.tz.guess()}
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
});

export { Container };
