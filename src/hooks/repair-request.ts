import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";

import { httpClient } from "@/lib/base-http-client";
import { CreateRepairRequest } from "@/types";

export const useCreateRepairRequest = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (data: CreateRepairRequest) => {
    const url = "/repair-request";
    await httpClient.post(url, data);
  };

  const onSuccess = () => {
    toast.success("Repair request submitted!");
    queryClient.invalidateQueries({ queryKey: ["repair-requests"] });
  };

  const onError = () => {
    toast.error(`Error occurred while submitting repair request`);
  };

  return useMutation({
    mutationFn,
    onSuccess,
    onError
  });
};

export const useUpdateRepairRequest = () => {};
