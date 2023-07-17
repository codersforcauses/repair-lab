import ForgotPasswordForm from "@/components/Auth/Forms/forgot-password";
import Panel from "@/components/Auth/panel";
import PanelHeader from "@/components/Auth/panel-header";

export default function ForgotPassword() {
  return (
    <div>
      <Panel>
        <PanelHeader title="Forgot Password?" />
        <ForgotPasswordForm/>
      </Panel>
    </div>
  );
}
