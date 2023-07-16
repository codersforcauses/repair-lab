import React, { useState } from "react";
import Image from "next/image";
import router from "next/router";
import { useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import CustomButton from "@/components/custombutton-large";

interface ForgotPasswordFormValues {
  email: string;
  password: string;
  code: string;
  confirmPassword: string;
}

export default function ForgotPassword() {
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const { isLoaded, signIn, setActive } = useSignIn();
  const [resetPasswordError, setResetPasswordError] = useState(false);
  const [resetPasswordErrMsg, setResetPasswordErrMsg] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<ForgotPasswordFormValues>();

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    const { email, password, code } = data;
    if (!isLoaded) {
      return null;
    }

    if (successfulCreation) {
      // reset
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
          setResetPasswordError(false);
        })
        .catch((err) => {
          setResetPasswordError(true);
          setResetPasswordErrMsg(err.errors[0].longMessage);
        });
    } else {
      // create
      await signIn
        ?.create({
          strategy: "reset_password_email_code",
          identifier: email
        })
        .then(() => {
          setSuccessfulCreation(true);
          setResetPasswordError(false);
        })
        .catch((err) => {
          setResetPasswordError(true);
          setResetPasswordErrMsg(err.errors[0].longMessage);
        });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-screen rounded-md bg-white p-8 md:w-3/6 lg:w-4/12">
        <div className="flex items-center justify-center">
          <Image
            src="/images/repair_lab_logo.jpg"
            alt="logo"
            width={80}
            height={80}
          />
        </div>
        <div className="flex items-center justify-center">
          <h1 className="m-4 text-2xl font-bold">Forgot Password?</h1>
        </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em"
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {!successfulCreation &&
            !complete &&
            ProvideIdentifier(
              resetPasswordError,
              resetPasswordErrMsg,
              register,
              errors
            )}

          {successfulCreation &&
            !complete &&
            PasswordReset(
              resetPasswordError,
              resetPasswordErrMsg,
              register,
              errors,
              watch
            )}

          {complete && ResetPassowrdSuccess()}
          {secondFactor && "2FA is required, this UI does not handle that"}
        </form>
      </div>
    </div>
  );
}

function ResetPassowrdSuccess(): React.ReactNode {
  return (
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
  );
}

function PasswordReset(
  resetPasswordError: boolean,
  resetPasswordErrMsg: boolean,
  register,
  errors,
  watch
): React.ReactNode {
  return (
    <>
      {resetPasswordError && (
        <div className="relative mb-4">
          <span className="text-red-500">{resetPasswordErrMsg}</span>
        </div>
      )}
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
          {...register("password", {
            required: "Password is required"
          })}
          placeholder="Password"
          className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="confirmPassword"
          className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
        >
          <span className="text-red-500">*</span> Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Passwords do not match";
              }
            }
          })}
          placeholder="Confirm Password"
          className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
            errors.confirmPassword ? "border-red-500" : ""
          }`}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
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
          {...register("code")}
          placeholder="Reset Password Code"
          className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
            errors.code ? "border-red-500" : ""
          }`}
        />
        {errors.code && (
          <span className="text-red-500">{errors.code.message}</span>
        )}
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
  );
}

function ProvideIdentifier(
  resetPasswordError: boolean,
  resetPasswordErrMsg: boolean,
  register,
  errors
): React.ReactNode {
  return (
    <>
      {resetPasswordError && (
        <div className="relative mb-4">
          <span className="text-red-500">{resetPasswordErrMsg}</span>
        </div>
      )}
      <span className="text-gray-400">Please provide identifier:</span>
      <div className="relative mb-4">
        <label
          htmlFor="email"
          className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
        >
          <span className="text-red-500">*</span> Email Address
        </label>
        <input
          id="email"
          type="text"
          {...register("email", {
            required: "Email is required",
            validate: {
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "Email address must be a valid address"
            }
          })}
          placeholder="Email Address"
          className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
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
  );
}
