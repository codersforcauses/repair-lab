export default function SingleSelectCheckboxes({
  checkedKey,
  options,
  onChange
}: {
  checkedKey?: string;
  options: { key: string; label: string }[];
  onChange?: (selectedKey: string) => void;
}) {
  return (
    <fieldset className="flex flex-col">
      {options.map(({ key, label }) => (
        <label key={key}>
          <input
            type="checkbox"
            id={key}
            value={key}
            name="assigned"
            checked={key === checkedKey}
            onChange={(e) =>
              onChange?.(
                e.currentTarget.value === checkedKey
                  ? ""
                  : e.currentTarget.value
              )
            }
          />
          {label}
        </label>
      ))}
    </fieldset>
  );
}
