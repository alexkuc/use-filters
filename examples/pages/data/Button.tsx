import classNames from 'classnames';
import { Color } from './Color';
import { Filter, Tuple } from './Filter';
import { User } from './User';

type Params = {
  children: React.ReactNode;
  tuple: Tuple<User & Color>;
  filter?: Filter<User & Color, User | Color>;
};

const Button = ({ children, filter, tuple }: Params) => {
  const onClick = () => {
    if (!filter) return;
    const hasValue = filter.hasValue(tuple);
    if (hasValue) filter.removeValue(tuple[0]);
    if (!hasValue) filter.addValue(tuple);
  };
  const css = () =>
    classNames({
      button: true,
      'button--active': filter?.hasValue(tuple) === true,
    });
  return (
    <div>
      <button className={css()} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export { Button };
