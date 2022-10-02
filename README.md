# Use Filters

`useFilters` is a React-based hook that allows to filter arbitary data. It is written in TypeScript to take advantage of generics. The hook is scalable as it supports nested filters and arbitary data type as well as filters. Implementation has also unit tests.

## Dependencies

This hook was written against React v18 but is not bundled itself.

Primary dependencies are listed under `dependencies` in `package.json`.
Example-related dependencies are listed under `optionalDependencies`.
Source-specific dependencies are listed under `devDependencies`.

## Usage

Usage is pretty straight forward:

```ts
const { getData, setData, filters, setFilters } = useFilters(data, filters);
```

| Function     | Purpose                   | Notes           |
| :----------- | :------------------------ | --------------- |
| `getData`    | get _filtered_ data       | custom getter   |
| `setData`    | set raw, unfiltered data  | useState setter |
| `filters`    | internal state of filters | useState value  |
| `setFilters` | sets filters              | useState setter |

If your filters are not set initially but later via setFilters, you need to explicitly set filter type:

```ts
const { ... } = useFilters<DataType, FilterType>(data, {});
```

Internal `filters` are exposed to allow running events when filters are modified, e.g. `useEffect(..., [filters])`.

There is an extensive number of examples under `examples/pages/` directory.
