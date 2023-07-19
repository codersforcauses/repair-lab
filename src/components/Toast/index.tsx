import { toast, ToastBar, Toaster } from "react-hot-toast";
import { HiOutlineX } from "react-icons/hi";

import useToast from "@/hooks/toast-limit";

interface ToastProps extends React.ComponentProps<typeof Toaster> {
  limit?: number;
}

const Toast = ({ limit, ...props }: ToastProps) => {
  useToast(limit);
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
