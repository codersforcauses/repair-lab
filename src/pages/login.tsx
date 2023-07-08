import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import CustomButton from "../components/custombutton-large";

interface LoginFormValues {
  username: string;
  password: string;
}

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    // TODO: Handle form submission
    console.log(data);

    // Reset the form
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
          <div className="border-t-2 border-dashed border-primary-600 flex-1"></div>
          <div className="text-primary-600 mx-4">or</div>
          <div className="border-t-2 border-dashed border-primary-600 flex-1"></div>
        </div>

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
              {...register("username", { required: true })}
              placeholder="Username"
              className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <span className="text-red-500">Username is required</span>
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
