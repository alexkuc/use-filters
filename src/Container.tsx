import { action } from 'mobx';
import { Store } from './Store';
import { useEffect } from 'react';
import { includes, isEmpty } from 'lodash';
import { observer } from 'mobx-react-lite';
import { FilterByArr, FilterByMap, FilterByVal } from './Filters';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(weekOfYear);

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
    props.store.addFilter(
      new FilterByMap({
        key: 'time',
        apply: function (item): boolean {
          if (this.value?.size === 0) return true;
          const arr = this.value?.toArray();
          return arr!.some((f) => f.apply(item) === true);
        },
      })
    );
  }, []);

  const isToday = new FilterByVal({
    key: 'isToday',
    apply: (item) => dayjs(item.starTime).isToday(),
  });

  const isTomorrow = new FilterByVal({
    key: 'isTomorrow',
    apply: (item) => dayjs(item.starTime).isTomorrow(),
  });

  const isThisWeek = new FilterByVal({
    key: 'isThisWeek',
    apply: (item) => dayjs(item.starTime).week() === dayjs().week(),
  });

  const isThisMonth = new FilterByVal({
    key: 'isThisMonth',
    apply: (item) => dayjs(item.starTime).month() === dayjs().month(),
  });

  const isNextMonth = new FilterByVal({
    key: 'isNextMonth',
    apply: (item) =>
      dayjs(item.starTime).month() === dayjs().add(1, 'month').month(),
  });

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
      <label>
        today
        <input
          type="checkbox"
          checked={props.store.getFilter('time')?.has(isToday) ?? false}
          onChange={action((e) => {
            const c = e.currentTarget.checked;
            const f = props.store.getFilter('time');

            if (c) f.add(isToday);
            if (!c) f.remove(isToday);
          })}
        />
      </label>
      <label>
        tomorrow
        <input
          type="checkbox"
          checked={props.store.getFilter('time')?.has(isTomorrow) ?? false}
          onChange={action((e) => {
            const c = e.currentTarget.checked;
            const f = props.store.getFilter('time');

            if (c) f.add(isTomorrow);
            if (!c) f.remove(isTomorrow);
          })}
        />
      </label>
      <label>
        this week
        <input
          type="checkbox"
          checked={props.store.getFilter('time')?.has(isThisWeek) ?? false}
          onChange={action((e) => {
            const c = e.currentTarget.checked;
            const f = props.store.getFilter('time');

            if (c) f.add(isThisWeek);
            if (!c) f.remove(isThisWeek);
          })}
        />
      </label>
      <label>
        this month
        <input
          type="checkbox"
          checked={props.store.getFilter('time')?.has(isThisMonth) ?? false}
          onChange={action((e) => {
            const c = e.currentTarget.checked;
            const f = props.store.getFilter('time');

            if (c) f.add(isThisMonth);
            if (!c) f.remove(isThisMonth);
          })}
        />
      </label>
      <label>
        next month
        <input
          type="checkbox"
          checked={props.store.getFilter('time')?.has(isNextMonth) ?? false}
          onChange={action((e) => {
            const c = e.currentTarget.checked;
            const f = props.store.getFilter('time');

            if (c) f.add(isNextMonth);
            if (!c) f.remove(isNextMonth);
          })}
        />
      </label>
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
