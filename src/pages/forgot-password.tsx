import React, { SyntheticEvent, useState } from "react";
import router from "next/router";
import { useSignIn } from "@clerk/nextjs";

import CustomButton from "@/components/custombutton-large";
import { useForm } from "react-hook-form";

interface ForgotPasswordFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function ForgotPassword() {
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);

  const { isLoaded, signIn, setActive } = useSignIn();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ForgotPasswordFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    if (!isLoaded) {
      return null;
    }
  

  async function create(e: SyntheticEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email
      })
      .then(() => {
        setSuccessfulCreation(true);
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));
  }

  async function reset(e: SyntheticEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password
      })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setComplete(true);
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-md bg-white p-8 shadow">
        <div className="flex items-center justify-center">
          <h1 className="m-4 text-2xl font-bold">Forgot Password?</h1>
        </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em"
          }}
          onSubmit={!successfulCreation ? create : reset}
        >
          {!successfulCreation && !complete && (
            <>
              <span className="text-gray-400">Please provide identifier:</span>
              <div className="relative mb-4">
                <label
                  htmlFor="emailAddress"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  <span style={{ color: "red" }}>*</span>Email Address
                </label>
                <input
                  id="emailAddress"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="w-full">
                <CustomButton
                  onClick={() => {
                    // Handle button click
                  }}
                  text="Change Password"
                ></CustomButton>
              </div>
            </>
          )}

          {successfulCreation && !complete && (
            <>
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="code"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  <span style={{ color: "red" }}>*</span>Reset Password Code
                </label>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Reset Password Code"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <CustomButton
                  onClick={() => {
                    // Handle button click
                  }}
                  text="Reset Password"
                ></CustomButton>
              </div>
            </>
          )}

          {complete && (
            <>
              <span className="text-gray-400">
                You successfully changed your password
              </span>
              <div className="w-full">
                <CustomButton
                  onClick={() => {
                    router.push("/login");
                  }}
                  text="Sign in"
                ></CustomButton>
              </div>
            </>
          )}
          {secondFactor && "2FA is required, this UI does not handle that"}
        </form>
      </div>
    </div>
  );
}
