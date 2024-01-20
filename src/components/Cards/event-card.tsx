import Image from "next/image";

export type CardProps = {
  title?: string;
  description?: string;
  image?: string;
};

export default function Card({ props }: { props: CardProps }) {
  return (
    <div>
      <div className="flex justify-center">
        <Image
          src={props.image || ""}
          alt="hello"
          className="object-fit max-h-32 w-full"
          width={100}
          height={100}
        />
      </div>
    </div>
  )

}