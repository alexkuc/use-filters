import classNames from 'classnames';
import { Filter } from './Filter';

type Params = {
  children: string;
  filter?: Filter;
};

const Cell = ({ children, filter }: Params) => {
  const onClick = () => {
    if (!filter) return;
    const hasValue = filter.hasValue(children);
    if (hasValue) filter.removeValue(children);
    if (!hasValue) filter.addValue(children);
  };
  const buttonCss = () =>
    classNames({
      filter__button: true,
      'filter__button--add': filter?.hasValue(children) === false,
      'filter__button--remove': filter?.hasValue(children) === true,
    });
  return (
    <td>
      <div className="cell">
        <span className="filter">
          {filter && (
            <button value={children} onClick={onClick} className={buttonCss()}>
              {!filter.hasValue(children) && '+'}
              {filter.hasValue(children) && '-'}
            </button>
          )}
        </span>
        {children}
      </div>
    </td>
  );
};

export { Cell };
