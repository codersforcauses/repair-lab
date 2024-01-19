import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { VscChromeClose, VscMenu } from "react-icons/vsc";

import { MenuItems } from "@/components/NavBar";

interface NavItems {
  menuItems: MenuItems[];
  isLoggedIn: boolean;
  onSignOut: () => void;
}

const VerticalBar = (props: NavItems) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Set the isOpen state as false if the screen width is greater than 767px
  const checkScreenWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 768) {
      setIsOpen(false);
    }
  };

  // Window resize event listener for updating the isOpen state
  useEffect(() => {
    window.addEventListener("resize", checkScreenWidth);
    checkScreenWidth();
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  // Set the isOpen state as false when a user navigates to a different page
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    <div className="relative">
      <button onClick={toggleSidebar}>
        {isOpen ? <VscChromeClose /> : <VscMenu size="28" />}
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 z-50 w-60 h-auto bg-white">
          <div className="flex justify-between items-center p-2 border-b">
            <Image
              src="/images/repair_lab_logo.png"
              alt="Repair Labs Logo"
              width={50}
              height={50}
            />
            <button onClick={toggleSidebar}>
              <VscChromeClose size="40" />
            </button>
          </div>
          {props.menuItems.map((item) => (
            <Link href={item.path} key={item.item}>
              <p className="block p-4 border-b hover:bg-app-base-100">
                {item.item}
              </p>
            </Link>
          ))}
          {props.isLoggedIn && (
            <Link
              href="/repair-request"
              className="block p-4 border-b bg-app-primary hover:bg-app-primary-focus text-white"
            >
              New Repair Request +
            </Link>
          )}
          <div className="flex bottom-4 w-full">
            {props.isLoggedIn ? (
              <>
                <button
                  onClick={props.onSignOut}
                  className="w-full p-4 border-b bg-app-accent hover:bg-app-accent-focus"
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="w-full p-4 border-b bg-app-accent hover:bg-app-accent-focus"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerticalBar;
