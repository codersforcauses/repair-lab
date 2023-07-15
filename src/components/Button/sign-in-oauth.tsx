import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/dist/types/server";

import Button from "@/components/Button";

const SignInOAuthButton = () => {
  const { signIn } = useSignIn();

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/"
    });
  };

  // Render a button for each supported OAuth provider
  // you want to add to your app
  return (
    <div>
      <Button onClick={() => signInWith("oauth_google")}>
        Sign in with Google
      </Button>
    </div>
  );
};

export default SignInOAuthButton;
