type Params<V extends string> = {
  value: V;
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: (value: V) => boolean;
};

const RadioButton = <V extends string>({
  value,
  children,
  onChange,
  checked,
}: Params<V>) => {
  return (
    <label>
      <input
        value={value}
        onChange={onChange}
        type="radio"
        checked={checked(value)}
      />
      {children}
    </label>
  );
};

export { RadioButton };
