import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import FieldMultiSelect from "@/components/FormFields/field-multi-select";
import FieldSingleSelect from "@/components/FormFields/field-single-select";
import Select from "@/components/select";

const OPTIONS = [
  {
    id: 0,
    text: "Option1"
  },
  {
    id: 1,
    text: "Option2"
  },
  {
    id: 2,
    text: "Option3"
  },
  {
    id: 3,
    text: "LongerOption4"
  },
  {
    id: 4,
    text: "EvenLongerOption5"
  },
  {
    id: 5,
    text: "Option6"
  },
  {
    id: 6,
    text: "Option7"
  },
  {
    id: 7,
    text: "A really really long option for the purpose of testing"
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
        options={OPTIONS}
      />
      <FieldMultiSelect
        name="itemBrand-M"
        label="Brand"
        control={control}
        rules={{ required: true }}
        options={OPTIONS}
      />

      <Select
        useIdValue
        label="newSelect_single_useId"
        options={OPTIONS}
        value={state0}
        onChange={setState0}
      />
      <Select
        useIdValue
        multiple
        label="newSelect_multiple_useId"
        options={OPTIONS}
        value={state1}
        onChange={setState1}
      />
      <Select
        label="newSelect_single"
        options={OPTIONS}
        value={state2}
        onChange={setState2}
      />
      <Select
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
