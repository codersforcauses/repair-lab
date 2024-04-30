import RegisterForm from "@/components/Auth/Forms/register";
import Panel from "@/components/Auth/panel";
import PanelHeader from "@/components/Auth/panel-header";

export default function Register() {
  return (
    <div>
      <Panel>
        <PanelHeader title="Sign Up" />
        <RegisterForm />
      </Panel>
    </div>
  );
}
