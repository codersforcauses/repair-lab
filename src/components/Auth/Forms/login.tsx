import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import Separator from "@/components/Auth/separator";
import Button from "@/components/Button";
import SignInOAuthButton from "@/components/Button/sign-in-oauth";
import FieldInput from "@/components/FormFields/field-input";
import Logo from "@/components/UI/logoSvg";

interface LoginFormValues {
  emailAddress: string;
  password: string;
}

const googleIcon = <Logo name="Google" viewBox="0 0 24 24" />;
const microsoftIcon = <Logo name="Microsoft" viewBox="0 0 24 24" />;
const facebookIcon = <Logo name="Facebook" viewBox="0 0 24 24" />;

const LoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loginError, setLoginError] = useState(false);
  const [loginErrMsg, setLoginErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const show = (
    <MdOutlineVisibility
      className="hover:cursor-pointer"
      onClick={() => setShowPassword(!showPassword)}
      color="grey"
    />
  );
  const close = (
    <MdOutlineVisibilityOff
      className="hover:cursor-pointer"
      onClick={() => setShowPassword(!showPassword)}
      color="grey"
    />
  );

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
        <SignInOAuthButton
          ariaLabel="Click to sign in with Facebook"
          strategy="oauth_facebook"
          icon={facebookIcon}
        />
        <SignInOAuthButton
          ariaLabel="Click to sign in with Google"
          strategy="oauth_google"
          icon={googleIcon}
        />
        <SignInOAuthButton
          ariaLabel="Click to sign in with Microsoft Outlook"
          strategy="oauth_microsoft"
          icon={microsoftIcon}
        />
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
            placeholder="e.g. name@domain.com"
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
            placeholder="Enter Password"
            control={control}
            rules={{
              required: "This field is required"
            }}
            label="Password"
            icon={showPassword ? show : close}
            type={showPassword ? "text" : "password"}
          />
        </div>

        <div className="flex pt-5 pb-3 justify-center">
          <Button
            aria-label="Click to complete the sign in process"
            height="h-10"
          >
            Sign In
          </Button>
        </div>

        <div className="m-2 text-center">
          <div>
            <Link href="/auth/forgot-password">
              <span className="text-sm text-gray-400 underline">
                Forgot your password?
              </span>
            </Link>
          </div>
          <div>
            <Link href="/auth/register">
              <span className="text-sm text-gray-400 underline">
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
