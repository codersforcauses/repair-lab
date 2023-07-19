import { useEffect, useState } from "react";
import t, { useToasterStore } from "react-hot-toast";

const useToast = () => {
  const { toasts } = useToasterStore();

  const [toastLimit, setToastLimit] = useState<number>(3);

  useEffect(() => {
    toasts
      .filter((tt) => tt.visible)
      .filter((_, i) => i >= toastLimit)
      .forEach((tt) => t.dismiss(tt.id));
  }, [toastLimit, toasts]);

  const toast = {
    ...t,
    setLimit: (l: number) => {
      if (l !== toastLimit) {
        setToastLimit(l);
      }
    }
  };

  return { toast };
};

export default useToast;
