import { useRouter } from "next/navigation";

import LoginForm from "@/components/Auth/Forms/login";
import Panel from "@/components/Auth/panel";
import PanelHeader from "@/components/Auth/panel-header";
import { useAuth } from "@/hooks/auth";

export default function Login() {
  const { isSignedIn } = useAuth();

  const router = useRouter();

  if (isSignedIn) router.push("/");

  return (
    <Panel>
      <PanelHeader title="Sign In" />
      <LoginForm />
    </Panel>
  );
}
