import { Filter } from './Filter';
import { StatusValue } from './StatusValue';

type Params = {
  children: React.ReactNode;
  filter: Filter;
};

const Status = ({ children, filter }: Params) => {
  return (
    <fieldset>
      <legend>{children}</legend>
      Status: {filter.isActive() ? 'Active' : 'Inactive'}
      <br />
      Values:{' '}
      {filter.getValues().map((v) => (
        <StatusValue filter={filter}>{v}</StatusValue>
      ))}
    </fieldset>
  );
};

export { Status };
