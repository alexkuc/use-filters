import { Filter } from './Filter';

type Params = {
  children: string;
  filter: Filter;
};

const StatusValue = ({ children, filter }: Params) => {
  const onClick = () => filter.removeValue(children);
  return <button onClick={onClick}>{children}</button>;
};

export { StatusValue };
