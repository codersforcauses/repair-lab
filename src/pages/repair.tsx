import { useForm } from "react-hook-form";

export default function repair() {
  type RepairData = {
    id: string;
    item: string;
    brand: string;
    material: string;
    time: string;
    repaired: string;
    spare: string;
    parts: string;
    desc: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RepairData>();

  const onSubmit = handleSubmit((data) => {
    console.log(JSON.stringify(data));
  });

  const lineStyle = "mb-2 flex items-start gap-6 self-stretch";
  const labelstyle =
    "mb-2 block text-lg font-medium text-gray-900 dark:text-white";
  const inputstyle =
    "flex w-full flex-1 flex-col items-start gap-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500";

  return (
    <main className="mx-3">
      <h1 className="mb-2 block text-xl text-red-500">General Repairs</h1>

      <form className="flex flex-col" onSubmit={onSubmit}>
        {/* ID, Item */}

        <div className={lineStyle}>
          <label htmlFor="id" className={labelstyle}>
            ID
          </label>
          <input
            type="text"
            id="id"
            className={inputstyle}
            placeholder="Your ID"
            required={true}
            {...register("id")}
          ></input>
          <label htmlFor="item" className={labelstyle}>
            Item
          </label>
          <input
            type="text"
            id="item"
            className={inputstyle}
            placeholder="Your item"
            required={true}
            {...register("item")}
          ></input>
        </div>

        {/* Brand, Material */}
        <div className={lineStyle}>
          <label htmlFor="brand" className={labelstyle}>
            Brand
          </label>
          <input
            type="text"
            id="brand"
            className={inputstyle}
            placeholder="Brand name"
            required={true}
            {...register("brand")}
          ></input>
          <label htmlFor="material" className={labelstyle}>
            Material
          </label>
          <input
            type="text"
            id="material"
            className={inputstyle}
            placeholder="material(s)"
            required={true}
            {...register("material")}
          ></input>
        </div>

        {/* Time it took, Repaired? */}
        <div className={lineStyle}>
          <label htmlFor="time" className={labelstyle}>
            Time it took
          </label>
          <input
            type="text"
            id="time"
            className={inputstyle}
            placeholder="Time taken in hrs"
            required={true}
            {...register("time")}
          ></input>
          <span className={labelstyle}> Repaired? </span>

          <label htmlFor="repaired-y">
            <input
              {...register("repaired")}
              type="radio"
              value="yes"
              id="repaired-y"
            />
            Yes
          </label>
          <label htmlFor="repaired-n">
            <input
              {...register("repaired")}
              type="radio"
              value="no"
              id="repaired-n"
            />
            No
          </label>
        </div>

        {/* Spare parts needed?, Part(s) needed */}
        <div className={lineStyle}>
          <span className={labelstyle}> Spare parts needed? </span>

          <label htmlFor="spare-y">
            <input
              {...register("spare")}
              type="radio"
              value="yes"
              id="spare-y"
            />
            Yes
          </label>
          <label htmlFor="spare-n">
            <input
              {...register("spare")}
              type="radio"
              value="no"
              id="spare-n"
            />
            No
          </label>
          <label htmlFor="parts" className={labelstyle}>
            Part(s) needed
          </label>
          <input
            type="text"
            id="parts"
            className={inputstyle}
            placeholder="Part(s) needed"
            required={false}
            {...register("parts")}
          ></input>
        </div>

        {/* Job Description */}
        <div className={lineStyle}>
          <label htmlFor="desc" className={labelstyle}>
            Job Description
          </label>
          <textarea
            id="desc"
            className={inputstyle}
            placeholder="Job Description......"
            required={true}
            {...register("desc")}
          ></textarea>
        </div>

        {/* Submit */}
        <input type="submit" value="Submit" className="submit"></input>
      </form>
    </main>
  );
}
