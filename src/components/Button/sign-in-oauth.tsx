import { ReactNode } from "react";
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/dist/types/server";

import Button from "@/components/Button";

interface Props {
  strategy: OAuthStrategy;
  label: string;
  icon: ReactNode;
}

const SignInOAuthButton = ({ strategy, label, icon }: Props) => {
  const { signIn } = useSignIn();

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/"
    });
  };

  return (
    <div className="flex justify-center">
      <Button onClick={() => signInWith(strategy)} width="w-full">
        <div className="relative flex items-center justify-center space-x-4">
          <div className="w-5">{icon}</div>
          <span className="">{label}</span>
        </div>
      </Button>
    </div>
  );
};

export default SignInOAuthButton;
