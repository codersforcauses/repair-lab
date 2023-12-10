import { UserRole } from "@/types";
import MenuList from "@/components/NavBar/menu-list";
import { useAuth } from "@/hooks/auth";
import { useClerk } from "@clerk/nextjs";
import Account from "@/components/NavBar/account";

const adminItems = ["Home", "Events", "Repair Requests"];
const clientItems = ["Home", "My Events"];

const pathMap: { [key: string]: string } = {
  Home: "/",
  Events: "/events",
  "Repair Requests": "/repair-requests",
  "My Events": "/my-events"
};

const adminRoles = [
  UserRole.ADMIN,
  UserRole.ORGANISATION_MANAGER,
  UserRole.EVENT_MANAGER
];

export default function NavBar() {
  const { role, isLoaded, user } = useAuth();
  const { signOut } = useClerk();

  return (
    <div className="h-[60px] leading-[60px] text-lg bg-white">
      {isLoaded && (
        <>
          <div className="flex flex-row">
            <MenuList
              items={
                adminRoles.includes(role)
                  ? adminItems.map((item) => ({
                      item,
                      path: pathMap[item]
                    }))
                  : clientItems.map((item) => ({
                      item,
                      path: pathMap[item]
                    }))
              }
            />
            <Account
              firstName={user?.firstName}
              lastName={user?.lastName}
              role={role}
              desc={user?.unsafeMetadata.description}
              isLoggedIn={!!user}
              onSignOut={signOut}
            />
          </div>
        </>
      )}
    </div>
  );
}
