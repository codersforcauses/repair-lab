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
  required?: boolean;
}

export default function Field_Text_Area<T extends FieldValues = FieldValues>({
  label,
  placeholder = "",
  icon = "",
  ...props
}: FormProps<T>) {
  const { field } = useController(props);

  {
    placeholder == "" ? (placeholder = "Enter " + props.name) : "";
  }

  return (
    <div className="relative mb-2 flex h-36 w-4/5 flex-row items-center justify-between rounded-lg border border-gray-300 px-3 shadow">
      <div className="absolute -top-2 left-2 flex flex-row items-center gap-0.5 rounded-full bg-white px-1">
        <label className="text-xs font-semibold text-black">
          {label ?? props.name}
        </label>
        {props.rules?.required ? (
          <span className="text-xs font-semibold text-[#FF0000]">*</span>
        ) : (
          ""
        )}
      </div>
      <textarea
        className="overflow-wrap:break-text h-4/5 w-full resize-none overflow-y-auto text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0"
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
