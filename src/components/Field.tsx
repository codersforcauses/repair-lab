import {
  useController,
  UseControllerProps,
  FieldValues
} from "react-hook-form";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  radio?: boolean;
}

export default function Field<T extends FieldValues = FieldValues>({
  label,
  radio,
  ...props
}: FormProps<T>) {
  const { field } = useController(props);

  return (
    <>
      <label className="mb-2 block text-lg font-medium capitalize text-gray-900 dark:text-white">
        {label ?? props.name}
      </label>
      {!radio && (
        <input
          className="flex w-full flex-1 flex-col items-start gap-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          {...field}
          placeholder={props.name}
        />
      )}

      {radio && (
        <div className="flex flex-row items-start gap-1">
          <label htmlFor={`${props.name}-y`}>
            <input {...field} type="radio" value="yes" id={`${props.name}-y`} />
            Yes
          </label>

          <label htmlFor={`${props.name}-n`}>
            <input {...field} type="radio" value="no" id={`${props.name}-n`} />
            No
          </label>
        </div>
      )}
    </>
  );
}
