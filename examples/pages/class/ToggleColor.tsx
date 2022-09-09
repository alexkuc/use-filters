import { includes } from 'lodash';

type Params = {
  color: string;
  colors: string[];
  onAdd: () => void;
  onRemove: () => void;
};

const ToggleColor = ({ color, colors, onAdd, onRemove }: Params) => {
  const active = (): boolean => includes(colors, color);
  const text = active()
    ? `Remove from filter "${color}"`
    : `Add to filter "${color}"`;
  const onClick = () => (active() ? onRemove() : onAdd());
  return <button onClick={onClick}>{text}</button>;
};

export { ToggleColor };
