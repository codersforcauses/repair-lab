import Select from "@/components/select";
import { isoToDatePickerValue } from "@/lib/datetime";

/** Displays label over the border */
function ConciseInput({
  label,
  id,
  type,
  value,
  onChange
}: {
  label: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const convertedValue =
    value && type === "date"
      ? isoToDatePickerValue(new Date(value)).substring(0, 10)
      : value;
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
        value={convertedValue}
        onChange={(e) => {
          const value =
            type === "date"
              ? new Date(e.target.value).toISOString()
              : e.target.value;
          if (onChange) onChange(value);
        }}
      ></input>
    </div>
  );
}

interface SelectDateProps {
  value?: string[];
  onChange?: (value: string[]) => void;
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
      renderList={() => (
        <>
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
        </>
      )}
    />
  );
}
