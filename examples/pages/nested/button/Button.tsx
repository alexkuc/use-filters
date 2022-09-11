import classNames from 'classnames';
import { Condition, ValueFilter } from '../filter/ValueFilter';
import './button.scss';

type Params = {
  children: React.ReactNode;
  condition: Condition;
  filter: ValueFilter;
  cb: () => void;
};

const Button = ({ condition, filter, children, cb }: Params) => {
  const onClick = () => {
    const [name] = condition;
    const hasValue = filter.hasValue(name);
    if (hasValue) filter.removeValue(name);
    if (!hasValue) filter.addValue(condition);
    cb();
  };
  const css = () =>
    classNames({
      button: true,
      'button--active': filter.hasValue(condition[0]),
    });
  return (
    <div className="button__container">
      <button className={css()} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export { Button };
