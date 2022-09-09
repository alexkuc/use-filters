/**
 * {@link https://stackoverflow.com/a/49286056}
 */
export type ValueOf<T> = T[keyof T];

export type Tuple<T> = TupleS<T> | TupleM<T>;

type TupleS<T> = [keyof T, ValueOf<T>];

type TupleM<T> = [keyof T, ValueOf<T>[]];

/**
 * If you are supplying nested objects, do consider that it is a *shallow* search and objects are compared strictly, *not* their props
 */
const top = <T extends {}>(t: T[], k: keyof T): TupleS<T> | undefined => {
  const values = t.map((t) => t[k]);

  let top: [number, T[keyof T] | undefined] = [-1, undefined];

  values.forEach((propVal) => {
    const sameProps = values.filter((_v) => _v === propVal);
    const length = sameProps.length;
    if (length > top[0]) top = [length, propVal];
  });

  if (!top[1]) return undefined;

  if (top[0] < 2) return undefined;

  return [k, top[1]];
};

const topN = <T extends {}>(
  t: T[],
  k: keyof T,
  n: number
): TupleM<T> | undefined => {
  const values = t.map((t) => t[k]);

  const count = new Map<ValueOf<T>, number>();

  values.forEach((v) => {
    const cur = count.get(v) ?? 0;
    count.set(v, cur + 1);
  });

  const sorted = [...count].sort((a, b) => {
    if (a[1] < b[1]) return 1; // sort a after b
    if (a[1] > b[1]) return -1; // sort a before b
    return 0;
  });

  const sliced = sorted.slice(0, n);

  const vals = sliced.map((v) => v[0]);

  return [k, vals];
};

export { top, topN };
