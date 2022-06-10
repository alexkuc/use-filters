import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Store } from './Store';
import 'normalize.css';
import './style.scss';
import { useState } from 'react';

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
              props.store.addFilter(
                'language',
                (item) => item.language === lang
              );
            })}
          >
            {lang}
          </button>
        ))}
      <br />
      {props.levels &&
        props.levels.map((level) => (
          <button
            key={level}
            className={`filter ${
              filters.level === level ? 'filter--active' : ''
            }`}
            value={level}
            onClick={action(() => {
              setFilters((prevState) => {
                return { ...prevState, level: level };
              });
              props.store.addFilter('level', (item) => item.level === level);
            })}
          >
            {level}
          </button>
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
