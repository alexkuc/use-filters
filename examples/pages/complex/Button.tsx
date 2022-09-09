import classNames from 'classnames';
import { Filter } from './Filter';
import { User } from './User';
import { Tuple } from './utility';

type Params<T extends Tuple<User>> = {
  tuple: T;
  filter?: Filter<T, User>;
};

const Button = <T extends Tuple<User>>({ tuple, filter }: Params<T>) => {
  const onClick = () => {
    if (!filter) return;
    if (filter.isActive(tuple)) return filter.removeValue(tuple);
    if (!filter.isActive(tuple)) return filter.addValue(tuple);
  };
  const className = () =>
    classNames({
      filter: true,
      'filter--active': filter?.isActive(tuple),
    });
  const text = (): string => {
    const v = tuple[1];
    if (Array.isArray(v)) return v.join(', ');
    return v;
  };
  const count = (): number => {
    const v = tuple[1];
    if (typeof v === 'string') return 1;
    return v.length;
  };
  return (
    <>
      <button className={className()} onClick={onClick}>
        Filter top {count()} {tuple[0]}
      </button>{' '}
      {text()}
    </>
  );
};

export { Button };
