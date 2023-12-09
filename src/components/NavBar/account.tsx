import ProfilePopover from "@/components/ProfilePopover";
import { NavPath, UserRole } from "@/types";

interface Props {
  firstName?: string;
  lastName?: string;
  role: UserRole;
  desc: string;
}

export default function Account({ firstName, lastName, role, desc }: Props) {
  return (
    <span>
      <ProfilePopover
        firstName={firstName}
        lastName={lastName}
        role={role}
        desc={desc}
      ></ProfilePopover>
    </span>
  );
}
