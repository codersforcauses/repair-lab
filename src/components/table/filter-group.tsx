import Select, { Option, ValueType } from "@/components/select";

export interface Filter {
  title: string;
  name: string;
  options: Option[];
  mutiple?: boolean;
}
export type FilterState = Record<string, ValueType | ValueType[] | undefined>;
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
      {filters?.map(({ title, name, options, mutiple }) => (
        <div key={name} className="min-w-36">
          <Select
            width="w-full"
            multiple={mutiple}
            label={title}
            options={options}
            value={value?.[name]}
            onChange={(nextValue) => {
              onChange?.({
                ...value,
                [name]: nextValue
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}
