import { useQuery } from "react-query";

const useUsers = (
  perPage: number,
  page: number,
  orderBy: string,
  query: string
) => {
  const queryFn = async () => {
    const response = await fetch(
      `/api/user?perPage=${perPage}&page=${page}&orderBy=${orderBy}&query=${query}`,
      {
        method: "GET",
        headers: {
          accept: "application/json"
        }
      }
    );

    return await response.json();
  };

  return useQuery({
    queryKey: ["users", perPage, page, orderBy, query],
    queryFn: queryFn
  });
};

export default useUsers;
