import { toast, ToastBar, Toaster } from "react-hot-toast";
import { HiOutlineX } from "react-icons/hi";

import useToast from "@/hooks/toast-limit";

type ToastProps = React.ComponentProps<typeof Toaster>;
const Toast = ({ ...props }: ToastProps) => {
  useToast();
  return (
    <Toaster toastOptions={{ style: { minWidth: "200px" } }} {...props}>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button onClick={() => toast.dismiss(t.id)}>
                  <HiOutlineX />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default Toast;
