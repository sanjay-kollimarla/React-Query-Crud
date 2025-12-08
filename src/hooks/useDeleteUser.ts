import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUsersApi } from "../api/usersApi";
import type { UsersListResponse } from "../types/users";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { deleteUser } = useUsersApi();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteUser(id);
      if (!res.success) throw new Error("Delete failed");
      return id;
    },

    // ON SUCCESS → manually update ALL cached pages
    onSuccess: (deletedId: string) => {
      const allPages = queryClient.getQueriesData<UsersListResponse>({
        queryKey: ["users"],
      });

      allPages.forEach(([key, pageData]) => {
        if (!pageData) return;

        const updated = {
          ...pageData,
          data: pageData.data.filter((u) => u._id !== deletedId),
        };

        queryClient.setQueryData(key, updated);
      });
    },
  });
}
