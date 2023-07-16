import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import Separator from "@/components/Auth/separator";
import Button from "@/components/Button";
import SignInOAuthButton from "@/components/Button/sign-in-oauth";
import Logo from "@/components/UI/logoSvg";

interface LoginFormValues {
  emailAddress: string;
  password: string;
}

const googleIcon = <Logo name="Google" viewBox="0 0 24 24" fill="#FFFFFF" />;

const LoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loginError, setLoginError] = useState(false);
  const [loginErrMsg, setLoginErrMsg] = useState("");

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginFormValues>();

  const loginHandler = async (data: LoginFormValues) => {
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
      setLoginError(true);
      setLoginErrMsg(err.errors[0].longMessage);
    }
  };

  return (
    <div>
      <div className="w-full">
        <SignInOAuthButton
          strategy="oauth_google"
          label="Sign in with google"
          icon={googleIcon}
        />
      </div>

      <Separator />

      <form onSubmit={handleSubmit(loginHandler)}>
        {loginError && (
          <div className="relative mb-4">
            <span className="text-red-500">{loginErrMsg}</span>
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
            <span className="text-red-500">{errors.emailAddress.message}</span>
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
        <div className="flex justify-center">
          <Button width="w-full">Sign In</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
