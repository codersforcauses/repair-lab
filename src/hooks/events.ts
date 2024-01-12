import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { httpClient } from "@/lib/base-http-client";
import {
  CreateEvent,
  EventResponse,
  RepairRequestResponse,
  UpdateEvent
} from "@/types";

export interface EventOption {
  id: string;
  name: string;
}

export const useEvent = (eventId: string | undefined) => {
  const queryFn = async () => {
    const url = `/event/${eventId}`;

    const response = await httpClient.get<EventResponse>(url);
    return response.data;
  };

  return useQuery({
    queryKey: [eventId],
    queryFn,
    enabled: eventId != undefined
  });
};

export const useEvents = (params: {
  sortKey: string;
  sortMethod: string;
  searchWord: string;
  minDate?: string;
  maxDate?: string;
  eventType?: string[];
  eventStatus?: string[];
  createdBy?: string[];
}) => {
  return useQuery<EventResponse[]>({
    queryKey: ["events", params],
    queryFn: async () => {
      const response = await httpClient.get("/event", {
        params,
        paramsSerializer: (params) => {
          // todo: maybe improve this
          const newParams = { ...params };
          // remove undefined value or empty array
          Object.keys(newParams).forEach(
            (key) =>
              (newParams[key] == undefined ||
                (Array.isArray(newParams[key]) &&
                  newParams[key].length === 0)) &&
              delete newParams[key]
          );
          return new URLSearchParams(newParams).toString();
        }
      });
      return response.data;
    }
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (data: CreateEvent) => {
    const url = "/event";
    await httpClient.post(url, data);
  };

  const onSuccess = () => {
    toast.success("Event created!");
    queryClient.invalidateQueries({ queryKey: ["events"] });
  };

  const onError = () => {
    toast.error(`Error occurred while creating event`);
  };

  return useMutation({
    mutationFn,
    onSuccess,
    onError
  });
};

export const useUpdateEvent = (eventId: string | undefined) => {
  const queryClient = useQueryClient();

  const mutationFn = async (data: UpdateEvent) => {
    const url = `/event/${eventId}`;
    await httpClient.patch(url, data);
  };

  const onSuccess = () => {
    toast.success("Event updated!");
    queryClient.invalidateQueries({ queryKey: ["events"] });
    queryClient.invalidateQueries({ queryKey: [eventId] });
  };

  const onError = () => {
    toast.error("Error occurred while updating event");
  };

  return useMutation({
    mutationFn: mutationFn,
    onSuccess,
    onError
  });
};

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

    const response = await httpClient.get<RepairRequestResponse[]>(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["repair-requests", eventId],
    queryFn,
    enabled: eventId != undefined
  });
};
