import { useQuery } from "react-query";

import { httpClient } from "@/lib/base-http-client";

export interface EventOption {
  id: string;
  name: string;
}

export const useEventOptions = () => {
  const queryFn = async () => {
    const url = `/event/options`;
    const response = await httpClient.get(url);

    return response.data;
  };

  return useQuery({
    queryKey: ["event-options"],
    queryFn: queryFn
  });
};

export const useRepairRequests = (eventId: string | undefined) => {
  const queryFn = async () => {
    const url = `event/${eventId}/repair-request`;

    const response = await httpClient.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["repair-requests", eventId],
    queryFn
  });
};
