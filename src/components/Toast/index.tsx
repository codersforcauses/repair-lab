import { toast, Toaster, ToastBar } from "react-hot-toast";
import { HiOutlineX } from "react-icons/hi";

type ToastProps = {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
};

const Toast = ({ position, ...props }: ToastProps) => (
  <Toaster position={position} toastOptions={{ style: { minWidth: "200px" } }}>
    {(t) => (
      <ToastBar toast={t}>
        {({ icon, message }) => (
          <>
            {icon}
            {message}
            {t.type !== "loading" && (
              <button onClick={() => toast.dismiss(t.id)}>
                {<HiOutlineX />}
              </button>
            )}
          </>
        )}
      </ToastBar>
    )}
  </Toaster>
);

export default Toast;
