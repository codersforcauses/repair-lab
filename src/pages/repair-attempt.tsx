import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Field from "@/components/Field";
import { RepairAttemptSchema } from "@/schema/repair-attempt";
import type { RepairAttempt } from "@/schema/repair-attempt";

export default function RepairAttempt() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RepairAttempt>({
    resolver: zodResolver(RepairAttemptSchema),
    defaultValues: {
      id: "",
      item: "",
      itemBrand: "",
      itemMaterial: "",
      time: 1,
      isRepaired: false, //FIXME: is literal types okay? how to convert to boolean?
      isSparePartsNeeded: false,
      spareParts: "",
      comment: ""
    }
  });

  const onSubmit: SubmitHandler<RepairAttempt> = (data) => {
    console.log(JSON.stringify(data));
  };

  const lineStyle = "mb-2 flex items-start gap-6";

  return (
    <main className="mx-3">
      <h1 className="mb-2 block text-xl text-red-500">
        General Repair Attempt
      </h1>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {/* ID, Item */}
        <div className={lineStyle}>
          <Field name="id" control={control} label="ID" />
          <Field name="item" control={control} />
        </div>

        {/* Brand, Material */}
        <div className={lineStyle}>
          <Field name="itemBrand" label="Brand" control={control} />
          <Field name="itemMaterial" label="Material" control={control} />
        </div>

        {/* Time it took, Repaired? */}
        <div className={lineStyle}>
          <Field name="time" label="Time it took" control={control} />
          <Field
            radio={true}
            name="isRepaired"
            label="Repaired?"
            control={control}
          />
          {errors.isRepaired && (
            <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
              {errors.isRepaired?.message}
            </p>
          )}
        </div>

        {/* Spare parts needed?, Part(s) needed */}
        <div className={lineStyle}>
          <Field
            radio={true}
            name="isSparePartsNeeded"
            control={control}
            label="Spare parts needed?"
          />
          <Field name="spareParts" label="Parts needed" control={control} />
        </div>

        {/* Job Description */}
        <div className={lineStyle}>
          <Field name="comment" label="Job Description" control={control} />
        </div>

        {/* Submit */}
        <input
          type="submit"
          value="Submit"
          className="w-156 h-38 leading-38 rounded-8 mx-auto block items-center justify-center bg-primary-600 font-semibold
          text-white"
        ></input>
      </form>
    </main>
  );
}
