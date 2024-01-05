export interface Filter {
  name: string;
  render: (
    value: unknown,
    onChange: (nextValue: unknown) => void
  ) => JSX.Element;
}
export type FilterState = Record<string, unknown>;
export interface FilterGroupProps {
  filters: Filter[];
  value?: FilterState;
  onChange?: (nextState: FilterState) => void;
}

export default function FilterGroup({
  filters,
  value,
  onChange
}: FilterGroupProps) {
  return (
    <div className="flex flex-row gap-4">
      {filters?.map(({ name, render }) => (
        <div key={name} className="min-w-36">
          {render(
            value?.[name],
            (nextValue) => onChange?.({ ...value, [name]: nextValue })
          )}
        </div>
      ))}
    </div>
  );
}
