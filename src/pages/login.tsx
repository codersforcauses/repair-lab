import React, { useState } from "react";
import CustomButton from "../components/CustomButton";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reset the form
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-64 bg-white rounded shadow p-8">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-medium">
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 input-field"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 input-field"
            />
          </div>
          <div className="mt-4 text-center">
            <a href="/forgot-password" className="text-coolGray-50 text-xs">
              Forgot your password?
            </a>
          </div>
          <div className="mt-2 text-center">
            <a href="/signup" className="text-coolGray-50 text-xs">
              Don't have an account? Sign up
            </a>
          </div>
          <div className="w-full">
            <CustomButton onClick={handleSubmit}>Sign in</CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
