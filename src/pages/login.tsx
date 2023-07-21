import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import LoginForm from "@/components/Auth/Forms/login";
import Panel from "@/components/Auth/panel";
import PanelHeader from "@/components/Auth/panel-header";

export default function Login() {
  const { isSignedIn } = useUser();

  const router = useRouter();

  if (isSignedIn) router.push("/");

  return (
    <Panel>
      <PanelHeader title="Sign In" />
      <LoginForm />
    </Panel>
  );
}
