import { action } from 'mobx';
import { Store } from './Store';
import { observer } from 'mobx-react-lite';
import { FilterInterface } from './Filters';

import './style.scss';
import 'normalize.css';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface ContainerProps {
  store: Store;
  languages: Array<string>;
  levels: Array<string>;
  time: Array<FilterInterface>;
}

const Container = observer((props: ContainerProps) => {
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
      {props.time &&
        props.time.map((time) => (
          <label key={time.key}>
            {time.label}
            <input
              type="checkbox"
              checked={props.store.getFilter('time')?.has(time) ?? false}
              onChange={action((e) => {
                const c = e.currentTarget.checked;
                const f = props.store.getFilter('time');

                if (c) f.add(time);
                if (!c) f.remove(time);
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
