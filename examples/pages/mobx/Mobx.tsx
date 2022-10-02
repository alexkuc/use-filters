import { observer, useLocalObservable } from 'mobx-react-lite';
import { useFilters } from '../../../src/useFilters';
import { makeColors } from './Color';
import { makeFilter } from './Filter';

const Mobx = observer(() => {
  const data = useLocalObservable(() => makeColors(50));
  const filters = useLocalObservable(() => makeFilter());
  const { getData } = useFilters({
    data,
    filters,
  });
  const filter = () => filters.colors.addValue(data[24]);
  const reset = () => filters.colors.resetValues();
  return (
    <div className="page-mobx">
      <button onClick={filter}>Filter by {data[24].name}</button>
      <button onClick={reset}>Reset filter</button>
      <ul>
        {getData('OR').map((color) => (
          <li key={color.id}>{color.name}</li>
        ))}
      </ul>
    </div>
  );
});
export { Mobx };
