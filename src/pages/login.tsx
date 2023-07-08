import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CustomButton from "../components/custombutton-large";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Reset the form
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-md bg-white p-8 shadow">
        <div className="flex items-center justify-center">
          <Image
            src="/images/repair_lab_logo.jpg"
            alt="logo"
            width={80}
            height={80}
          />
        </div>
        <div className="flex items-center justify-center">
          <h1 className="m-4 text-2xl font-bold">Sign in</h1>
        </div>
        <CustomButton
          onClick={() => {
            // Handle Google login here
            console.log("Continue with Google...");
          }}
          text="Continue with Google"
        />

        {/* Separate the "Login with Google" button with a custom color dashed line and "or" text */}
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
              htmlFor="username"
              className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
            >
              <span style={{ color: "red" }}>*</span> Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
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
              type="text"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="m-4 text-center">
            <div>
              <Link href="/forgot-password">
                <span className="text-xs text-gray-400 underline">
                  Forgot your password?
                </span>
              </Link>
            </div>
            <div>
              <Link href="/register">
                <span className="text-xs text-gray-400 underline">
                  Do not have an account? Sign up
                </span>
              </Link>
            </div>
          </div>
          <div className="w-full">
            <CustomButton
              onClick={() => {
                // Handle button click
              }}
              text="Sign in"
            ></CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
