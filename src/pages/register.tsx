import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import CustomButton from "../components/custombutton-large";

interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<RegisterFormValues>();

  const onSubmit = (data: RegisterFormValues) => {
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
              <span className="text-red-500">Confirm Password is required</span>
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
                // Handle button click
              }}
              text="Sign up"
            ></CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
