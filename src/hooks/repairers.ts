import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { httpClient } from "@/lib/base-http-client";
import { User } from "@/types";

export const useRepairers = (eventId: string) => {
  const queryFn = async () => {
    const url = `/event/${eventId}/repairers`;
    const response = await httpClient.get<User[]>(url);

    return response.data;
  };

  return useQuery({
    queryKey: ["repairers", eventId],
    queryFn
  });
};

export const useAddRepairerToEvent = (eventId: string) => {
  const mutationFn = async (userIds: string[]) => {
    const url = `/event/${eventId}/repairers`;
    await httpClient.post(url, {
      id: eventId,
      userId: userIds
    });
  };

  const onSuccess = () => {
    toast.success("Repairer added to event!");
  };

  const onError = () => {
    toast.error("Error occurred while adding repairer to event");
  };

  return useMutation({
    mutationFn: mutationFn,
    onSuccess,
    onError
  });
};

export const useRemoveRepairerFromEvent = (eventId: string) => {
  const mutationFn = async (userIds: string[]) => {
    const url = `/event/${eventId}/repairers`;
    await httpClient.delete(url, { params: { id: eventId, userId: userIds } });
  };

  const onSuccess = () => {
    toast.success("Repairer removed from event!");
  };

  const onError = () => {
    toast.error("Error occurred while removing repairer from event");
  };

  return useMutation({
    mutationFn: mutationFn,
    onSuccess,
    onError
  });
};
