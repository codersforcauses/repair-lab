import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import FieldMultiSelect from "@/components/FormFields/field-multi-select";
import FieldSingleSelect from "@/components/FormFields/field-single-select";
import Select from "@/components/select";

const OPTIONS = [
  {
    value: 0,
    name: "Option1"
  },
  {
    value: 1,
    name: "Option2"
  },
  {
    value: 2,
    name: "Option3"
  },
  {
    value: 3,
    name: "LongerOption4"
  },
  {
    value: 4,
    name: "EvenLongerOption5"
  },
  {
    value: 5,
    name: "Option6"
  },
  {
    value: 6,
    name: "Option7"
  },
  {
    value: 7,
    name: "A really really long option for the purpose of testing"
  }
];

/**
 * A custom hook that, given a array of value, when value changes, it print out only the changed value and compare to the old value
 * @param values any[]
 */
function usePrintValue(values: unknown[]) {
  const [oldValues, setOldValues] = useState(values);

  useEffect(() => {
    values.forEach((value, index) => {
      if (value !== oldValues[index]) {
        console.log(
          `value ${index} changed from ${JSON.stringify(
            oldValues[index]
          )}\nto\n${JSON.stringify(value)}`
        );
      }
    });
    setOldValues(values);
  }, [values, oldValues]);
}

export default function TestSelect() {
  const { control } = useForm();

  const [state0, setState0] = useState<number>();
  const [state1, setState1] = useState<number[]>();
  const [state2, setState2] = useState<(typeof OPTIONS)[number]>();
  const [state3, setState3] = useState<typeof OPTIONS>();
  usePrintValue(
    useMemo(
      () => [state0, state1, state2, state3],
      [state0, state1, state2, state3]
    )
  );

  return (
    <div>
      <FieldSingleSelect
        name="itemBrand-S"
        label="Brand"
        control={control}
        rules={{ required: true }}
        options={OPTIONS.map((option) => ({
          id: option.value,
          text: option.name
        }))}
      />
      <FieldMultiSelect
        name="itemBrand-M"
        label="Brand"
        control={control}
        rules={{ required: true }}
        options={OPTIONS.map((option) => ({
          id: option.value,
          text: option.name
        }))}
      />

      <Select
        label="newSelect_single_useId"
        options={OPTIONS}
        value={state0}
        onChange={setState0}
      />
      <Select
        multiple
        label="newSelect_multiple_useId"
        options={OPTIONS}
        value={state1}
        onChange={setState1}
      />
      <Select
        useOption
        label="newSelect_single"
        options={OPTIONS}
        value={state2}
        onChange={setState2}
      />
      <Select
        useOption
        placeholder=""
        multiple
        label="newSelect_multiple"
        options={OPTIONS}
        value={state3}
        onChange={setState3}
      />
    </div>
  );
}
