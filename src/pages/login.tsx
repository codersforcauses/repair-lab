import React, { useState } from 'react';
import CustomButton from '../components/custombutton';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform login logic here with username and password
    console.log('Logging in...');
    console.log('Username:', username);
    console.log('Password:', password);
    // Reset the form
    setUsername('');
    setPassword('');
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="w-64 bg-white rounded shadow p-8">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>

        <CustomButton
          onClick={() => {
            // Handle Google login here
            console.log('Continue with Google...');
          }}
          text="Continue with Google"
        />

        {/* Separate the "Login with Google" button with a custom color dashed line and "or" text */}
        <div className="flex items-center mb-4">
          <div
            className="border-dashed border-t-2"
            style={{ borderColor: '#098D85', flex: 1 }}
          ></div>
          <div style={{ color: '#098D85' }} className="mx-4">
            or
          </div>
          <div
            className="border-dashed border-t-2"
            style={{ borderColor: '#098D85', flex: 1 }}
          ></div>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
            <label
              htmlFor="username"
              className="absolute top-0 left-2 -mt-2 px-1 bg-white text-red-500 font-small"
            >
              * Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              className="w-full border border-gray-300 px-3 py-2 pl-10 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">
              <span style={{ color: 'red' }}>*</span> Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <CustomButton text="Login" onClick={handleSubmit} />
        </form>
      </div>
    </main>
  );
}
