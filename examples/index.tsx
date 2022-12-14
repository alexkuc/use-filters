import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Class } from './pages/class/Class';
import { Complex } from './pages/complex/Complex';
import { Data } from './pages/data/Data';
import { Mobx } from './pages/mobx/Mobx';
import { Multiple } from './pages/multiple/Multiple';
import { Nested } from './pages/nested/Nested';
import { Object } from './pages/object/Object';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return;
  const entryComponent = (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={<>Choose one of the examples from the menu above</>}
            />
            <Route path="object" element={<Object />} />
            <Route path="class" element={<Class />} />
            <Route path="complex" element={<Complex />} />
            <Route path="multiple" element={<Multiple />} />
            <Route path="data" element={<Data />} />
            <Route path="nested" element={<Nested />} />
            <Route path="mobx" element={<Mobx />} />
          </Route>
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
  ReactDOM.createRoot(root).render(entryComponent);
});
