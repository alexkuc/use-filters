import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container } from './Container';
import { makeItem } from './factory';
import { Store } from './Store';
import { pickRandom } from './utility';

const levels = ['easy', 'medium', 'hard'];

const languages = ['english', 'spanish', 'french'];

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Container store={store} levels={levels} languages={languages} />
  </React.StrictMode>
);
