import React, { useState } from "react";
import Image from "next/image";
import CustomButton from "../components/custombutton-large";

export default function Register() {
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
    <div className="flex justify-center items-center h-screen">
      <div className=" bg-white rounded-md shadow p-8">
        <div className="flex justify-center items-center">
          <Image
            src="/images/repair_lab_logo.jpg"
            alt="logo"
            width={80}
            height={80}
          />
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Sign up</h1>
        </div>
        <CustomButton
          onClick={() => {
            // Handle Google login here
            console.log("Continue with Google...");
          }}
          text="Continue with Google"
        />
        <div className="flex items-center mb-4">
          <div
            className="border-dashed border-t-2"
            style={{ borderColor: "#098D85", flex: 1 }}
          ></div>
          <div style={{ color: "#098D85" }} className="mx-4">
            or
          </div>
          <div
            className="border-dashed border-t-2"
            style={{ borderColor: "#098D85", flex: 1 }}
          ></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label
              htmlFor="username"
              className="absolute text-sm top-0 left-1 -mt-2 px-1 bg-white font-bold"
            >
              <span style={{ color: "red" }}>*</span> Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="absolute text-sm top-0 left-1 -mt-2 px-1 bg-white font-bold"
            >
              <span style={{ color: "red" }}>*</span> Password
            </label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="absolute text-sm top-0 left-1 -mt-2 px-1 bg-white font-bold"
            >
              <span style={{ color: "red" }}>*</span> Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="text"
              placeholder="Password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="w-full">
            <CustomButton
              onClick={() => {
                // Handle button click
              }}
              text="Sign up"
            ></CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
