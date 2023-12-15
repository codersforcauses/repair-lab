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
        <div className="relative flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 h-full">
          
          <div className="flex items-center">
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

          
          <div className="absolute left-1/2 top-2 transform -translate-x-1/2">
            <Image
              src="/images/repair_lab_logo.png"
              alt="Repair Labs Logo"
              width={721}
              height={831}
              style={{ width: "100px", height: "100px" }}
            />
          </div>

          
          <div className="flex items-center">
            <Account
              firstName={user?.firstName}
              lastName={user?.lastName}
              role={role}
              desc={user?.unsafeMetadata.description}
              isLoggedIn={!!user}
              onSignOut={signOut}
            />
          </div>
        </div>
      )}
    </div>
  );
}
