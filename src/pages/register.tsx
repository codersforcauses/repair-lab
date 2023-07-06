import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";

import CustomButton from "../components/custombutton-large";

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleEmailAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailAddress(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Sign up process
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      // TODO: Use an alert to show error
      console.log(JSON.stringify(err, null, 2));
    }

    // Reset the form
    setEmailAddress("");
    setPassword("");
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code
      });

      if (completeSignUp.status !== "complete") {
        // TODO: Use an alert to show error
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      // TODO: Use an alert to show error
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="grid gap-4 rounded-md bg-white p-8 shadow">
        <div className="flex items-center justify-center">
          <Image
            src="/images/repair_lab_logo.jpg"
            alt="logo"
            width={80}
            height={80}
          />
        </div>
        {!pendingVerification && (
          <div>
            <div className="flex items-center justify-center">
              <h1 className="mb-4 text-2xl font-bold">Sign up</h1>
            </div>
            <CustomButton
              onClick={() => {
                // Handle Google login here
                console.log("Continue with Google...");
              }}
              text="Continue with Google"
            />
            <div className="mb-4 flex items-center">
              <div
                className="border-t-2 border-dashed"
                style={{ borderColor: "#098D85", flex: 1 }}
              ></div>
              <div style={{ color: "#098D85" }} className="mx-4">
                or
              </div>
              <div
                className="border-t-2 border-dashed"
                style={{ borderColor: "#098D85", flex: 1 }}
              ></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label
                  htmlFor="emailAddress"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  <span style={{ color: "red" }}>*</span> Email Address
                </label>
                <input
                  id="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={handleEmailAddressChange}
                  placeholder="Email Address"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  <span style={{ color: "red" }}>*</span> Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  <span style={{ color: "red" }}>*</span> Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="w-full">
                <CustomButton
                  onClick={() => {
                    handleSubmit;
                  }}
                  text="Sign up"
                ></CustomButton>
              </div>
            </form>
          </div>
        )}
        {pendingVerification && (
          <div>
            <form
              className="mt-2 flex flex-col gap-2"
              onSubmit={(e) => onPressVerify(e)}
            >
              <div className="relative mb-4">
                <label
                  htmlFor="code"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  <span style={{ color: "red" }}>*</span> Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  placeholder="Code"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <CustomButton
                onClick={() => {
                  return;
                }}
                text="Verify Email"
              ></CustomButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
