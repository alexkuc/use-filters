import classnames from 'classnames';
import React from 'react';
import { NavLink, To } from 'react-router-dom';

type Params = {
  children?: React.ReactNode;
  to: To;
};

const Entry = ({ children, to }: Params) => {
  const css = ({ isActive }: { isActive: boolean }) =>
    classnames({
      menu__entry: true,
      'menu__entry--active': isActive,
    });
  return (
    <div className="menu__entry">
      <NavLink className={css} to={to}>
        {children}
      </NavLink>
    </div>
  );
};

export { Entry };
