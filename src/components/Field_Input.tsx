import Image from "next/image";
import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  placeholder?: string;
  icon?: string;
}

/*
This is a component for the HTML `<input>' tag
Input:
  label: The label displayed on the text box
  placeholder: The placeholder message displayed on the text box
  icon: An optional Image path to display an .svg file
Output:
  A input text box that is compatible w/ React-hook-forms
*/
export default function Field_Input<T extends FieldValues = FieldValues>({
  label,
  placeholder = "",
  icon,
  ...props
}: FormProps<T>) {
  const { field } = useController(props);

  !icon ? (icon = "") : "";
  !placeholder ? (placeholder = `Enter ${props.name}`) : "";

  return (
    <div className="relative mb-2 flex h-12 w-64 flex-row items-center justify-between rounded-lg border border-grey-300 px-3 shadow">
      <div className=" absolute -top-2 left-2 flex flex-row items-center gap-0.5 rounded-full bg-white px-1">
        <label className="text-xs font-semibold text-black">
          {label ?? props.name}
        </label>
        {props.rules?.required ? (
          <span className="text-xs font-semibold text-red-500">*</span>
        ) : (
          ""
        )}
      </div>
      <input
        className="mr-1 w-full text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0"
        placeholder={placeholder}
        id={label}
        {...field}
      />
      {icon != "" ? (
        <Image
          src={icon}
          alt="icon"
          width={16}
          height={16}
          className="relative min-h-0 w-4 min-w-0 shrink-0"
        />
      ) : (
        ""
      )}
    </div>
  );
}
