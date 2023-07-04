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
This is a component for the HTML `<textarea>' tag
Input:
  label: The label displayed on the text box
  placeholder: The placeholder message displayed on the text box
  icon: An optional Image path to display an .svg file
Output:
  A large text box that is compatible w/ React-hook-forms
*/
export default function Field_Text_Area<T extends FieldValues = FieldValues>({
  label,
  placeholder,
  icon,
  ...props
}: FormProps<T>) {
  const { field } = useController(props);

  !icon ? (icon = "") : "";
  !placeholder ? (placeholder = `Enter ${props.name}`) : "";

  return (
    <div className="relative mb-2 flex h-36 w-4/5 flex-row items-center justify-between rounded-lg border border-grey-300 px-3 shadow">
      <div className="absolute -top-2 left-2 flex flex-row items-center gap-0.5 rounded-full bg-[#FFF] px-1">
        <label className="text-black text-xs font-semibold">
          {label ?? props.name}
        </label>
        {props.rules?.required ? (
          <span className="text-xs font-semibold text-[#FF0000]">*</span>
        ) : (
          ""
        )}
      </div>
      <textarea
        className="overflow-wrap:break-text placeholder:text-gray-500 h-4/5 w-full resize-none overflow-y-auto text-sm focus:outline-none focus:ring-0"
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
          className="min-h-4 relative w-4 min-w-0 shrink-0"
        />
      ) : (
        ""
      )}
    </div>
  );
}
