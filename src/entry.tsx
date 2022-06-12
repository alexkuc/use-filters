import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container } from './Container';
import { makeItem } from './factory';
import { FilterByArr, FilterByMap, FilterByVal } from './Filters';
import { Store } from './Store';
import { pickRandom } from './utility';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { includes, isEmpty } from 'lodash';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(weekOfYear);

const levels = ['easy', 'medium', 'hard'];

const languages = ['english', 'spanish', 'french'];

const time = [
  new FilterByVal({
    key: 'isToday',
    label: 'Today',
    apply: (item) => dayjs(item.starTime).isToday(),
  }),
  new FilterByVal({
    key: 'isTomorrow',
    label: 'Tomorrow',
    apply: (item) => dayjs(item.starTime).isTomorrow(),
  }),
  new FilterByVal({
    key: 'isThisWeek',
    label: 'This week',
    apply: (item) => dayjs(item.starTime).week() === dayjs().week(),
  }),
  new FilterByVal({
    key: 'isThisMonth',
    label: 'This month',
    apply: (item) => dayjs(item.starTime).month() === dayjs().month(),
  }),
  new FilterByVal({
    key: 'isNextMonth',
    label: 'Next month',
    apply: (item) =>
      dayjs(item.starTime).month() === dayjs().add(1, 'month').month(),
  }),
];

const data = [];

for (let i = 0; i < 25; i++) {
  data.push(
    makeItem({
      language: pickRandom(languages),
      level: pickRandom(levels),
    })
  );
}

const store = new Store({ data });

store.addFilter(
  new FilterByArr({
    key: 'level',
    apply: function (item): boolean {
      if (isEmpty(this.value)) return true;
      return includes(this.value, item.level);
    },
  })
);

store.addFilter(
  new FilterByVal({
    key: 'language',
    apply: function (item): boolean {
      if (this.value?.length === 0) return true;
      return item.language === this.value;
    },
  })
);

store.addFilter(
  new FilterByMap({
    key: 'time',
    apply: function (item): boolean {
      if (this.value?.size === 0) return true;
      const arr = this.value?.toArray();
      return arr!.some((f) => f.apply(item) === true);
    },
  })
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Container
      store={store}
      levels={levels}
      languages={languages}
      time={time}
    />
  </React.StrictMode>
);
