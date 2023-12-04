import Image from "next/image";

// Contains type of info stored in our event box.
type BoxProps = {
  eventTitle: string;
  startDate: string; // Wanted to use the Date type, but had issues, will alter based off what the backend is
  endDate: string;
  description: string;
  // Add other data as required
  // Add image stuff later once figure it out / if theres even an image that will be returned
}

const Box = ({
  eventTitle,
  startDate,
  endDate,
  description
}: BoxProps) => {

  return (
    <div className="flex mx-10 flex-col mt-5 items-center text-xs rounded-lg bg-slate-200">
      <div>
        <Image
          src="/images/jeans_repair.jpg"
          alt="Person holding jeans"
          width={500}
          height={500}
          className=" rounded-t-lg object-none h-20"
        />
      </div>

      <span className="font-bold text-sm">
        {eventTitle}
      </span>
      <h2 className="">
        {startDate} - {endDate}
      </h2>

      <p className="pt-2 text-left">
        {description}
      </p>

    </div>
  );
};

export default Box;