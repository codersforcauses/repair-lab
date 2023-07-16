import { useState } from "react";
import { useRouter } from "next/router";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";

interface VerificationFormValues {
  code: string;
}

const VerificationForm = () => {
  const router = useRouter();

  const [verificationError, setVerificationError] = useState(false);
  const [verificationErrorMsg, setVerificationErrMsg] = useState("");
  const { isLoaded, signUp, setActive } = useSignUp();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<VerificationFormValues>();

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (data: VerificationFormValues) => {
    setVerificationError(false);
    const { code } = data;

    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      setVerificationError(true);
      setVerificationErrMsg(err.errors[0].longMessage);
    }
  };

  return (
    <div>
      <form
        className="mt-2 flex flex-col gap-2"
        onSubmit={handleSubmit(onPressVerify)}
      >
        {verificationError && (
          <div className="relative mb-4">
            <span className="text-red-500">{verificationErrorMsg}</span>
          </div>
        )}
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
            {...register("code", {
              required: "Code is required"
            })}
            placeholder="Code"
            className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
              errors.code ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="flex justify-center">
          <Button width="w-full">Verify Email</Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;
