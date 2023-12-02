import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import VerificationForm from "@/components/Auth/Forms/verification";
import Separator from "@/components/Auth/separator";
import Button from "@/components/Button";
import SignInOAuthButton from "@/components/Button/sign-in-oauth";
import FieldInput from "@/components/FormFields/field-input";
import Logo from "@/components/UI/logoSvg";
import { useAuth } from "@/hooks/auth";

export interface RegisterFormValues {
  emailAddress: string;
  password: string;
  confirmPassword: string;
  code: string;
}

const googleIcon = <Logo name="Google" viewBox="0 0 24 24" fill="#FFFFFF" />;
const microsoftIcon = <Logo name="Microsoft" viewBox="0 0 24 24" fill="#FFFFFF" />;
const facebookIcon = <Logo name="Facebook" viewBox="0 0 24 24" fill="#FFFFFF" />;

const RegisterForm = () => {
  const { isLoaded, signUp } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [registerErrorMsg, setRegisterErrMsg] = useState("");
  const { isSignedIn } = useAuth();

  const router = useRouter();

  if (isSignedIn) router.push("/");

  const { control, handleSubmit, watch } = useForm<RegisterFormValues>();

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setRegisterError(true);
      setRegisterErrMsg(err.errors[0].longMessage);
    }
  };

  return (
    <div>
      {!pendingVerification && (
        <>
          <div className="relative flex justify-center align-center pt-5 pb-4">
            <div className="pr-4">
              <SignInOAuthButton strategy="oauth_google" icon={facebookIcon} />
            </div>

            <div className="pr-4">
              <SignInOAuthButton strategy="oauth_google" icon={googleIcon} />
            </div>

            <div>
              <SignInOAuthButton strategy="oauth_google" icon={microsoftIcon} />
            </div>
          </div>

          <Separator />

          <form onSubmit={handleSubmit(registerHandler)} noValidate>
            {registerError && (
              <div className="relative mb-4">
                <span className="text-red-500">{registerErrorMsg}</span>
              </div>
            )}
            <div className="flex flex-col gap-4 pt-4">
              <FieldInput
                name="emailAddress"
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
            </div>

            <div className="m-4 text-center">
              <Link href="/auth/login">
                <span className="text-xs text-gray-400 underline">
                  Already have an account? Sign in
                </span>
              </Link>
            </div>
            <div className="flex pt-2 pb-3 justify-center">
              <Button height="h-11" width="w-10/12">
                Sign Up
              </Button>
            </div>
          </form>
        </>
      )}
      {pendingVerification && <VerificationForm />}
    </div>
  );
};

export default RegisterForm;
