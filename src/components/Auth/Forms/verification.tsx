import { useState } from "react";
import { useRouter } from "next/router";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import FieldInput from "@/components/FormFields/field-input";

interface VerificationFormValues {
  code: string;
}

const VerificationForm = () => {
  const router = useRouter();

  const [verificationError, setVerificationError] = useState(false);
  const [verificationErrorMsg, setVerificationErrMsg] = useState("");
  const { isLoaded, signUp, setActive } = useSignUp();

  const { control, handleSubmit } = useForm<VerificationFormValues>();

  // This verifies the user using email code that is delivered.
  const verifyHandler = async (data: VerificationFormValues) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setVerificationError(true);
      setVerificationErrMsg(err.errors[0].longMessage);
    }
  };

  return (
    <div>
      <form
        className="mt-2 flex flex-col gap-4"
        onSubmit={handleSubmit(verifyHandler)}
      >
        {verificationError && (
          <div className="relative mb-4">
            <span className="text-red-500">{verificationErrorMsg}</span>
          </div>
        )}
        <FieldInput
          name="code"
          control={control}
          rules={{
            required: "Code is required"
          }}
          placeholder="Enter code"
          label="Verfication Code"
          type="text"
        />

        <Button width="w-full">Verify Email</Button>
      </form>
    </div>
  );
};

export default VerificationForm;
