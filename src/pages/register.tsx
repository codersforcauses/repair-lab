import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import CustomButton from "../components/custombutton-large";

interface RegisterFormValues {
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
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
    } catch (err) {
      // TODO: Use an alert to show error
      console.log(JSON.stringify(err, null, 2));
    }

    console.log(data);
    // Reset the form
    reset();
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code
      });

      if (completeSignUp.status !== "complete") {
        // TODO: Use an alert to show error
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      // TODO: Use an alert to show error
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="grid gap-4 rounded-md bg-white p-8 shadow">
        <div className="flex items-center justify-center">
          <Image
            src="/images/repair_lab_logo.jpg"
            alt="logo"
            width={80}
            height={80}
          />
        </div>
        {!pendingVerification && (
          <>
            <div className="flex items-center justify-center">
              <h1 className="mb-4 text-2xl font-bold">Sign up</h1>
            </div>
            <CustomButton
              onClick={() => {
                // TODO: Handle Google login here
                console.log("Continue with Google...");
              }}
              text="Continue with Google"
            />
            <div className="mb-4 flex items-center">
              <div className="flex-1 border-t-2 border-dashed border-primary-600"></div>
              <div className="mx-4 text-primary-600">or</div>
              <div className="flex-1 border-t-2 border-dashed border-primary-600"></div>
            </div>
            {/* TODO: Add form logic */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mb-4">
                <label
                  htmlFor="username"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  <span className="text-red-500">*</span> Username
                </label>
                <input
                  id="username"
                  type="text"
                  {...register("emailAddress", { required: true })}
                  placeholder="Email Address"
                  className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
                    errors.emailAddress ? "border-red-500" : ""
                  }`}
                />
                {errors.emailAddress && (
                  <span className="text-red-500">
                    Email address is required
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
                  {...register("password", { required: true })}
                  placeholder="Password"
                  className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <span className="text-red-500">Password is required</span>
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
                  {...register("confirmPassword", { required: true })}
                  placeholder="Confirm Password"
                  className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    Confirm Password is required
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
                <CustomButton
                  onClick={() => {
                    handleSubmit;
                  }}
                  text="Sign up"
                ></CustomButton>
              </div>
            </form>
          </>
        )}
        {pendingVerification && (
          <div>
            <form
              className="mt-2 flex flex-col gap-2"
              onSubmit={(e) => onPressVerify(e)}
            >
              <div className="relative mb-4">
                <label
                  htmlFor="code"
                  className="absolute left-1 top-0 -mt-2 bg-white px-1 text-sm font-bold"
                >
                  <span style={{ color: "red" }}>*</span> Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  placeholder="Code"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <CustomButton
                onClick={() => {
                  return;
                }}
                text="Verify Email"
              ></CustomButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
