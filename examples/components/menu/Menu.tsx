import { Entry } from './Entry';
import './menu.scss';

const Menu = () => {
  return (
    <nav className="menu">
      <Entry to="object">Object filter</Entry>
      <Entry to="class">Class filter</Entry>
      <Entry to="complex">Complex filter</Entry>
      <Entry to="multiple">Multiple filters</Entry>
      <Entry to="data">Non-homogeneous data</Entry>
      <Entry to="nested">Nested filters</Entry>
      <Entry to="mobx">Filters with Mobx</Entry>
    </nav>
  );
};

export { Menu };
