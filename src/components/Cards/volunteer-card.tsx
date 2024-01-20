import Image from "next/image";

type Props = {
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

export default function VolunteerCard() {
  const firstName = "John";
  const lastName = "Doe";
  const avatar = "/images/repair_lab_logo.jpg";

  return (
    <div className="w-[250px] rounded-lg bg-grey-200 p-2 hover:cursor-pointer">
      <div>
        <div className="flex flex-row gap-3">
          <Image
            src={avatar || "/images/repair_lab_logo.jpg"}
            className="object-fit h-12 w-12 rounded-full"
            alt="avatar"
            width={200}
            height={200}
          />
          <div className="h-[50px]">
            <p className="leading-[50px] text-s font-semibold">
              {firstName} {lastName ?? ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
