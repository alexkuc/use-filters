import { Outlet } from 'react-router-dom';
import { Menu } from '../menu/Menu';
import './layout.scss';

const Layout = () => {
  return (
    <div className="layout">
      <div className="layout__menu">
        <Menu />
      </div>
      <div className="layout__content">
        <Outlet />
      </div>
    </div>
  );
};

export { Layout };
