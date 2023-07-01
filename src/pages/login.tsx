import React, { useState } from "react";
import CustomButton from "../components/custombutton";

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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-md shadow p-8">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold m-4">Sign in</h1>
        </div>
        <CustomButton
          onClick={() => {
            // Handle Google login here
            console.log("Continue with Google...");
          }}
          text="Continue with Google"
        />

        {/* Separate the "Login with Google" button with a custom color dashed line and "or" text */}
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
          <div className="m-4 text-center">
            <div>
              <a
                href="/forgot-password"
                className="text-gray-400 text-xs underline"
              >
                Forgot your password?
              </a>
            </div>
            <div>
              <a href="/register" className="text-gray-400 text-xs underline">
                Don't have an account? Sign up
              </a>
            </div>
          </div>
          <div className="w-full">
            <CustomButton onClick={handleSubmit} text="Sign in"></CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
