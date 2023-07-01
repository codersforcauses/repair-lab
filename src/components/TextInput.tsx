import Image from "next/image";
import { useFormContext } from "react-hook-form";

const TextInput = ({
  textArea = false,
  label = "",
  required = false,
  placeholder = "",
  icon = "",
  name = ""
}) => {
  const { register } = useFormContext();

  if (placeholder == "") {
    placeholder = "Enter " + label;
  }
  return textArea ? (
    <div className="relative mb-3 flex h-24 w-64 flex-row items-center justify-between rounded-lg border border-gray-300 px-3 shadow">
      <div className="absolute -top-2 left-2 flex flex-row items-center gap-0.5 rounded-full bg-white px-1">
        <label className="text-xs font-semibold text-black">{label}</label>
        {required ? (
          <span className="text-xs font-semibold text-[#FF0000]">*</span>
        ) : (
          ""
        )}
      </div>
      <textarea
        className="mr-1 w-full text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0"
        placeholder={placeholder}
        id={label}
        {...register(name)}
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
  ) : (
    <div className="relative mb-2 flex h-12 w-64 flex-row items-center justify-between rounded-lg border border-gray-300 px-3 shadow">
      <div className="absolute -top-2 left-2 flex flex-row items-center gap-0.5 rounded-full bg-white px-1">
        <label className="text-xs font-semibold text-black">{label}</label>
        {required ? (
          <span className="text-xs font-semibold text-[#FF0000]">*</span>
        ) : (
          ""
        )}
      </div>
      <input
        className="mr-1 w-full text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0"
        placeholder={placeholder}
        id={label}
        {...register(name)}
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
};

export default TextInput;
