type Props = {
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

export default function AssigneeBade({ firstName, lastName, avatar }: Props) {
  return (
    <div className="rounded-lg bg-slate-300 p-2">
      <div>
        <div className="flex flex-row gap-2">
          <div>
            <img
              src="images/repair_lab_logo.jpg"
              className="h-8 w-8 rounded-full"
              alt="avatar"
            ></img>
          </div>
          <div className="flex flex-col ">
            <p className="text-xs font-bold">{firstName}</p>
            <p className="text-xs">{lastName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
