import React from "react";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";

import Account from "@/components/NavBar/account";
import MenuList from "@/components/NavBar/menu-list";
import VerticalBar from "@/components/NavBar/VerticalBar";
import ProfilePopover from "@/components/ProfilePopover";
import { useAuth } from "@/hooks/auth";
import { UserRole } from "@/types";

const adminItems = ["Home", "Events", "Repair Requests"];
const clientItems = ["Home", "Events", "My Events"];
const guestItems = ["Home", "Events"]; // Shown when user is not logged in

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
export interface MenuItems {
  item: string;
  path: string;
}

export default function NavBar() {
  const { role, isLoaded, user } = useAuth();
  const { signOut } = useClerk();

  let menuItems;
  if (user) {
    // Check if user is logged in
    if (adminRoles.includes(role)) {
      menuItems = adminItems.map((item) => ({ item, path: pathMap[item] }));
    } else {
      menuItems = clientItems.map((item) => ({ item, path: pathMap[item] }));
    }
  } else {
    menuItems = guestItems.map((item) => ({ item, path: pathMap[item] }));
  }

  return (
    <div className="sticky top-0 z-50 h-[60px] text-lg bg-white">
      {isLoaded && (
        <div className="flex justify-between items-center mx-auto px-4">
          {/* For larger screen (768px width or above) - horizontal nav bar */}
          <div className="hidden md:flex items-center">
            <Image
              src="/images/repair_lab_logo.png"
              alt="Repair Labs Logo"
              width={721}
              height={831}
              style={{ width: "50px", height: "50px" }}
            />
            <MenuList items={menuItems} />
          </div>
          <div className="hidden md:flex items-center">
            <Account role={role} isLoggedIn={!!user} onSignOut={signOut} />
          </div>

          {/* For smaller screen (below 768px width) - expandable vertical nav bar */}
          <div className="md:hidden flex items-center mt-1.5">
            <VerticalBar
              menuItems={menuItems}
              isLoggedIn={!!user}
              onSignOut={signOut}
            />
          </div>
          <div className="flex md:hidden justify-between items-center">
            <Image
              src="/images/repair_lab_logo.png"
              alt="Repair Labs Logo"
              width={50}
              height={50}
            />
          </div>
          <div className="md:hidden flex items-center mt-1.5">
            <ProfilePopover />
          </div>
        </div>
      )}
    </div>
  );
}
