import Select from "@/components/select";

/** Displays label over the border */
function ConciseInput({
  label,
  id,
  type,
  value = "", // If value is undefined, React gives a warning
  onChange
}: {
  label: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="border-gray-500 border p-2 relative rounded-lg mb-4 last:mb-0">
      <label
        htmlFor={id}
        className="absolute -top-1/3 left-1 px-2 bg-white font-bold"
      >
        {label}
      </label>
      <input
        className="appearance-none border-none outline-none"
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      ></input>
    </div>
  );
}

interface SelectDateProps {
  value?: Array<string | undefined>;
  onChange?: (value: Array<string | undefined>) => void;
  label?: string;
}

// todo: need improve
export default function SelectDate({
  value = [],
  onChange,
  label
}: SelectDateProps) {
  return (
    <Select
      label={label}
      value={value.filter((v) => v).length ? value : undefined}
      renderSelected={() => {
        return <div>{`${value[0] || ""} - ${value[1] || ""}`}</div>;
      }}
      renderList={() => (
        <div className="p-4">
          <ConciseInput
            label="From"
            id="minDate"
            type="date"
            value={value[0]}
            onChange={(_value) => onChange?.([_value, value[1]])}
          />
          <ConciseInput
            label="To"
            id="maxDate"
            type="date"
            value={value[1]}
            onChange={(_value) => onChange?.([value[0], _value])}
          />
        </div>
      )}
    />
  );
}
