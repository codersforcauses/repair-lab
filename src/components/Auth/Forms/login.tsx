import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import Separator from "@/components/Auth/separator";
import Button from "@/components/Button";
import SignInOAuthButton from "@/components/Button/sign-in-oauth";
import FieldInput from "@/components/FormFields/field-input";
import Logo from "@/components/UI/logoSvg";

interface LoginFormValues {
  emailAddress: string;
  password: string;
}

const googleIcon = <Logo name="Google" viewBox="0 0 24 24" fill="#FFFFFF" />;
const microsoftIcon = (
  <Logo name="Microsoft" viewBox="0 0 24 24" fill="#FFFFFF" />
);
const facebookIcon = (
  <Logo name="Facebook" viewBox="0 0 24 24" fill="#FFFFFF" />
);

const LoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loginError, setLoginError] = useState(false);
  const [loginErrMsg, setLoginErrMsg] = useState("");

  const router = useRouter();

  const { control, handleSubmit } = useForm<LoginFormValues>();

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
      <div className="relative flex justify-center pt-5 pb-4 gap-x-1">
        <SignInOAuthButton strategy="oauth_facebook" icon={facebookIcon} />
        <SignInOAuthButton strategy="oauth_google" icon={googleIcon} />
        <SignInOAuthButton strategy="oauth_microsoft" icon={microsoftIcon} />
      </div>

      <Separator />

      <form onSubmit={handleSubmit(loginHandler)} noValidate>
        {loginError && (
          <div className="relative mb-4">
            <span className="text-red-500">{loginErrMsg}</span>
          </div>
        )}

        <div className="flex flex-col gap-4 pt-4">
          <FieldInput
            name="emailAddress"
            placeholder="Enter email address"
            control={control}
            rules={{
              required: "This field is required",
              validate: {
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "Email address must be a valid address"
              }
            }}
            label="Email Address"
            icon="https://file.rendit.io/n/WO0yqXIkWlVzApILek8q.svg"
            type="email"
          />

          <FieldInput
            name="password"
            placeholder="Enter password"
            control={control}
            rules={{
              required: "This field is required"
            }}
            label="Password"
            type="password"
          />
        </div>

        <div className="flex pt-5 pb-3 justify-center">
          <Button height="h-11" width="w-9/12">
            Sign In
          </Button>
        </div>

        <div className="m-1 text-center">
          <div>
            <Link href="/auth/forgot-password">
              <span className="text-xs text-gray-400 underline">
                Forgot your password?
              </span>
            </Link>
          </div>
          <div>
            <Link href="/auth/register">
              <span className="text-xs text-gray-400 underline">
                Do not have an account? Sign up
              </span>
            </Link>
          </div>
        </div>

      </form>
    </div>
  );
};

export default LoginForm;
