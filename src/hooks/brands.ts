import { useQuery } from "react-query";

import { httpClient } from "@/lib/base-http-client";

export interface Brand {
  name: string;
}

export const useBrands = () => {
  const queryFn = async () => {
    const url = `/brand`;
    const response = await httpClient.get<Brand[]>(url);

    return response.data;
  };

  return useQuery({
    queryKey: ["brands"],
    queryFn: queryFn
  });
};
