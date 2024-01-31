import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { httpClient } from "@/lib/base-http-client";
import { PaginationResponse } from "@/lib/pagination";
import { User, UserResponse, UserRole } from "@/types";

export const useUsers = (
  perPage: number,
  page: number,
  orderBy: string,
  query: string
) => {
  const queryFn = async () => {
    const params = new URLSearchParams({
      perPage: perPage.toString(),
      page: page.toString(),
      orderBy,
      query
    });

    const url = `/user?${params.toString()}`;

    const response = await httpClient.get<UserResponse>(url);

    return response.data;
  };

  return useQuery({
    queryKey: ["users", perPage, page, orderBy, query],
    queryFn: queryFn
  });
};

export const useInfiniteUser = (query: string, perPage: number = 10) => {
  return useInfiniteQuery<PaginationResponse<User>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.page != lastPage.meta.lastPage
        ? lastPage.meta.page + 1
        : lastPage.meta.lastPage,
    queryKey: ["infinite-users", perPage, query],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        perPage: perPage.toString(),
        orderBy: "-created_at",
        page: (pageParam as number).toString(),
        query
      });

      const url = `/user?${params.toString()}`;

      const response = await httpClient.get<PaginationResponse<User>>(url);

      return response.data;
    }
  });
};

export const useUpdateUserRole = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  const mutationFn = async (role: UserRole) => {
    const url = `/user/${userId}/role`;
    await httpClient.patch(url, { role });
  };

  const onSuccess = () => {
    toast.success("User updated!");
    queryClient.invalidateQueries({ queryKey: ["users"] });
    queryClient.invalidateQueries({ queryKey: [userId] });
  };

  const onError = () => {
    toast.error("Error occurred while updating user");
  };

  return useMutation({
    mutationFn: mutationFn,
    onSuccess,
    onError
  });
};
