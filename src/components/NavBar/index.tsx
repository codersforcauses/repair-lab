import Image from "next/image";
import { useClerk } from "@clerk/nextjs";

import Account from "@/components/NavBar/account";
import MenuList from "@/components/NavBar/menu-list";
import { useAuth } from "@/hooks/auth";
import { UserRole } from "@/types";

const adminItems = ["Home", "Events", "Repair Requests"];
const clientItems = ["Home", "My Events"];

const pathMap: { [key: string]: string } = {
  Home: "/",
  Events: "/events",
  "Repair Requests": "/repair-request",
  "My Events": "/my-events" // To be redirected to a new page for existing repair requests
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
    <div className="sticky top-0 z-50 h-[60px] text-lg bg-white">
      {isLoaded && (
        <div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Image
              src="/images/repair_lab_logo.png"
              alt="Repair Labs Logo"
              width={721}
              height={831}
              style={{ width: "50px", height: "50px" }}
            />
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
          </div>
          <Account
            firstName={user?.firstName}
            lastName={user?.lastName}
            role={role}
            desc={user?.unsafeMetadata.description}
            isLoggedIn={!!user}
            onSignOut={signOut}
          />
        </div>
      )}
    </div>
  );
}
