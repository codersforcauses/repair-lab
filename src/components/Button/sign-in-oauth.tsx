import { ReactNode } from "react";
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/dist/types/server";

import Button from "@/components/Button";

interface Props {
  strategy: OAuthStrategy;
  icon: ReactNode;
}

const SignInOAuthButton = ({ strategy, icon }: Props) => {
  const { signIn } = useSignIn();

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/auth/sso-callback",
      redirectUrlComplete: "/"
    });
  };

  return (
    <Button onClick={() => signInWith(strategy)} color="white" border="border-2" width="w-20" height="h-16" hover="white">
      <div className="relative flex items-center justify-center space-x-4">
        <div className="w-5">{icon}</div>
      </div>
    </Button>
  );
};

export default SignInOAuthButton;
