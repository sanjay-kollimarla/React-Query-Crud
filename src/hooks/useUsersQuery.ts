import { useQuery } from "@tanstack/react-query";
import { useUsersApi } from "../api/usersApi";

export function useUsersQuery(page: number) {
  const { getUsers } = useUsersApi(); // ← reuse API layer

  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
    staleTime: 4000,
    gcTime: 1000 * 60,
    retry: 1,
  });
}
