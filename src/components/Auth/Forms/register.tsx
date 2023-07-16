import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSignUp, useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import VerificationForm from "@/components/Auth/Forms/verification";
import Separator from "@/components/Auth/separator";
import Button from "@/components/Button";
import SignInOAuthButton from "@/components/Button/sign-in-oauth";
import Logo from "@/components/UI/logoSvg";

export interface RegisterFormValues {
  emailAddress: string;
  password: string;
  confirmPassword: string;
  code: string;
}

const googleIcon = <Logo name="Google" viewBox="0 0 24 24" fill="#FFFFFF" />;

const RegisterForm = () => {
  const { isLoaded, signUp } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [registerErrorMsg, setRegisterErrMsg] = useState("");
  const { isSignedIn } = useUser();

  const router = useRouter();

  if (isSignedIn) router.push("/");

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<RegisterFormValues>();

  const registerHandler = async (data: RegisterFormValues) => {
    const { emailAddress, password } = data;

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code"
      });

      // change the UI to our pending section.
      setPendingVerification(true);
      setRegisterErrMsg("");
    } catch (err: any) {
      setRegisterError(true);
      setRegisterErrMsg(err.errors[0].longMessage);
    }
  };

  return (
    <div>
      {!pendingVerification && (
        <>
          <div className="w-full">
            <SignInOAuthButton
              strategy="oauth_google"
              label="Sign in with google"
              icon={googleIcon}
            />
          </div>

          <Separator />

          <form onSubmit={handleSubmit(registerHandler)} noValidate>
            {registerError && (
              <div className="relative mb-4">
                <span className="text-red-500">{registerErrorMsg}</span>
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
                type="email"
                {...register("emailAddress", {
                  required: "Email is required",
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
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="m-4 text-center">
              <Link href="/login">
                <span className="text-xs text-gray-400 underline">
                  Already have an account? Sign in
                </span>
              </Link>
            </div>
            <div className="w-full">
              <div className="flex justify-center">
                <Button width="w-full">Sign Up</Button>
              </div>
            </div>
          </form>
        </>
      )}
      {pendingVerification && <VerificationForm />}
    </div>
  );
};

export default RegisterForm;
