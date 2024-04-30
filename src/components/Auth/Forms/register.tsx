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
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  code: string;
}

const googleIcon = <Logo name="Google" viewBox="0 0 24 24" />;
const microsoftIcon = <Logo name="Microsoft" viewBox="0 0 24 24" />;
const facebookIcon = <Logo name="Facebook" viewBox="0 0 24 24" />;

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
          <div className="relative flex justify-center pt-5 pb-4 gap-x-1">
            <SignInOAuthButton
              ariaLabel="Click to sign up with Facebook"
              strategy="oauth_facebook"
              icon={facebookIcon}
            />
            <SignInOAuthButton
              ariaLabel="Click to sign up with Google"
              strategy="oauth_google"
              icon={googleIcon}
            />
            <SignInOAuthButton
              ariaLabel="Click to sign up with Microsoft Outlook"
              strategy="oauth_microsoft"
              icon={microsoftIcon}
            />
          </div>

          <Separator />

          <form onSubmit={handleSubmit(registerHandler)} noValidate>
            {registerError && (
              <div className="relative mb-4">
                <span className="text-red-500">{registerErrorMsg}</span>
              </div>
            )}

            <div className="flex flex-col gap-4 pt-4">
              <div className="flex gap-x-6">
                <FieldInput
                  width="w-1/2"
                  name="firstName"
                  control={control}
                  rules={{
                    required: "This field is required"
                  }}
                  placeholder="e.g. John"
                  label="First Name"
                />
                <FieldInput
                  width="w-1/2"
                  name="lastName"
                  control={control}
                  rules={{
                    required: "This field is required"
                  }}
                  placeholder="e.g. Smith"
                  label="Last Name"
                />
              </div>

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
                placeholder="e.g. name@domain.com"
                label="Email Address"
              />

              <FieldInput
                name="password"
                control={control}
                rules={{
                  required: "This field is required"
                }}
                placeholder="Enter Password"
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
                placeholder="Confirm Password"
                label="Confirm Password"
                type="password"
              />
            </div>

            <div className="flex pt-5 pb-3 justify-center">
              <Button
                aria-label="Click to complete the Sign Up process"
                height="h-10"
              >
                Sign Up
              </Button>
            </div>

            <div className="m-1 text-center">
              <Link href="/auth/login">
                <span className="text-sm text-gray-400 underline">
                  Already have an account? Sign in
                </span>
              </Link>
            </div>
          </form>
        </>
      )}
      {pendingVerification && <VerificationForm />}
    </div>
  );
};

export default RegisterForm;
