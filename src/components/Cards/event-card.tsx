import Image from "next/image";

export type CardProps = {
  title?: string;
  description?: string;
};

export default function Card({props}: { props: CardProps }) {

  return (
    <div>
        <div className="group col-span-1 max-w-xs flex-col overflow-hidden rounded-lg bg-grey-100 shadow-md transition hover:-translate-y-0.5 hover:cursor-pointer hover:bg-grey-50">
          <Image
            src="/images/event_details.jpg"
            alt="Image Not Found"
            className="object-fit max-h-32 w-full"
            width={100}
            height={100}
          />
          <div className="text-center">
              <h1 className="text-xl font-bold">{props.title}</h1>
              <div>
              {props.description}
              </div>
          </div>
      </div>
    </div>

  )

}