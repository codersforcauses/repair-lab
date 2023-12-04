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
    <div className="flex mx-10 flex-row mt-5 items-left text-xs rounded-lg bg-slate-200">
      <div>
        <Image
          src="/images/jeans_repair.jpg"
          alt="Person holding jeans"
          width={500}
          height={500}
          className="object-none w-20 h-20 ml-1 custom-position rounded-full scale-75"
        />
      </div>

    <div className="flex flex-col ml-2">
      <span className="font-bold text-sm pt-2">
        {eventTitle}
      </span>
      <div className="pt-1">
        {startDate} - {endDate}
      </div>

      <div className="pt-1">
        {description}
      </div>
    </div>

    </div>
  );
};

export default Box;