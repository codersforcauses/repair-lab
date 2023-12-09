import { UserRole } from "@/types";
import MenuList from "@/components/NavBar/menu-list";
import { useAuth } from "@/hooks/auth";

interface Props {
  role: UserRole;
  children?: React.ReactNode;
}

const adminItems = ["Home", "Events", "Repair Requests"];
const clientItems = ["Home", "My Events"];

const adminRoles = [
  UserRole.ADMIN,
  UserRole.ORGANISATION_MANAGER,
  UserRole.EVENT_MANAGER
];

const clientRoles = [UserRole.CLIENT, UserRole.REPAIRER];

export default function NavBar({ role, children }: Props) {
  const menuItems = adminRoles.includes(role) ? adminItems : clientItems;
  const { user, isSignedIn, isLoaded } = useAuth();
  return (
    <div>
      {isLoaded && (
        <>
          <MenuList
            items={adminRoles.includes(role) ? adminItems : clientItems}
          ></MenuList>
          <div>{children}</div>
        </>
      )}
    </div>
  );
}
