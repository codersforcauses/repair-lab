import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import CustomButton from "@/components/custombutton-large";

interface LoginFormValues {
  emailAddress: string;
  password: string;
}

export default function Login() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loginError, setLoginError] = useState(false);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    const { emailAddress, password } = data;

    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password
      });

      /**
       * Few different statuses for result.status, but they currently do not apply to us right now,
       * but may apply to us in the future.
       * https://clerk.com/docs/reference/clerkjs/signin?utm_source=www.google.com&utm_medium=referral&utm_campaign=none
       */
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorCode = err.errors[0].code;
      if (
        errorCode === "form_password_incorrect" ||
        errorCode === "form_identifier_not_found"
      ) {
        setLoginError(true);
      } else {
        // TODO: Use better alert component for error.
        alert("Something went wrong!");
      }
    }

    reset();
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
            // TODO: Handle Google login here
            console.log("Continue with Google...");
          }}
          text="Continue with Google"
        />

        {/* Separate the "Login with Google" button with a custom color dashed line and "or" text */}
        <div className="mb-4 flex items-center">
          <div className="flex-1 border-t-2 border-dashed border-primary-600"></div>
          <div className="mx-4 text-primary-600">or</div>
          <div className="flex-1 border-t-2 border-dashed border-primary-600"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {loginError && (
            <div className="relative mb-4">
              <span className="text-red-500">Invalid email or password</span>
            </div>
          )}

          <div className="relative mb-4">
            <label
              htmlFor="emailAddress"
              className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
            >
              <span className="text-red-500">*</span> Email Address
            </label>
            <input
              id="emailAddress"
              type="text"
              {...register("emailAddress", {
                required: "Email address is required",
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address must be a valid address"
                }
              })}
              placeholder="Email Address"
              className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
                errors.emailAddress ? "border-red-500" : ""
              }`}
            />
            {errors.emailAddress && (
              <span className="text-red-500">
                {errors.emailAddress.message}
              </span>
            )}
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
            >
              <span className="text-red-500">*</span> Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
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
