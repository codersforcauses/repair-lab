import React, { useState } from "react";
import router from "next/router";
import { useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import FieldInput from "@/components/FormFields/field-input";

interface ForgotPasswordFormValues {
  email: string;
  password: string;
  code: string;
  confirmPassword: string;
}

const ForgotPassword = () => {
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const { isLoaded, signIn, setActive } = useSignIn();
  const [resetPasswordError, setResetPasswordError] = useState(false);
  const [resetPasswordErrMsg, setResetPasswordErrMsg] = useState(false);

  const { control, handleSubmit, watch } = useForm<ForgotPasswordFormValues>();

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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {!successfulCreation && !complete && (
        <>
          {resetPasswordError && (
            <div className="relative mb-4">
              <span className="text-red-500">{resetPasswordErrMsg}</span>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <FieldInput
              name="email"
              control={control}
              rules={{
                required: "This field is required",
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address must be a valid address"
                }
              }}
              placeholder="Enter email address"
              label="Email Address"
              icon="https://file.rendit.io/n/WO0yqXIkWlVzApILek8q.svg"
            />
          </div>

          <Button width="w-full">Reset Password</Button>
        </>
      )}

      {successfulCreation && !complete && (
        <>
          {resetPasswordError && (
            <div className="relative mb-4">
              <span className="text-red-500">{resetPasswordErrMsg}</span>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <FieldInput
              name="password"
              control={control}
              rules={{
                required: "This field is required"
              }}
              placeholder="Enter password"
              label="Password"
              type="password"
            />

            <FieldInput
              name="confirmPassword"
              control={control}
              rules={{
                required: "This field is required",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Passwords do not match";
                  }
                }
              }}
              placeholder="Confirm password"
              label="Confirm Password"
              type="password"
            />

            <FieldInput
              name="code"
              control={control}
              rules={{
                required: "This field is required"
              }}
              placeholder="Reset password code"
              label="Reset Password Code"
            />
          </div>

          <Button width="w-full">Reset Password Code</Button>
        </>
      )}

      {complete && (
        <>
          <span className="text-gray-400">
            You successfully changed your password
          </span>
          <Button
            width="w-full"
            onClick={() => {
              router.push("/login");
            }}
          >
            Sign In
          </Button>
        </>
      )}
      {secondFactor && "2FA is required, this UI does not handle that"}
    </form>
  );
};

export default ForgotPassword;
