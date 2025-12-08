import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUsersApi } from "../api/usersApi";
import type { UsersListResponse, UpdateUserPayload } from "../types/users";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { updateUser } = useUsersApi();

  return useMutation({
    mutationFn: async (params: { id: string; payload: UpdateUserPayload }) => {
      const res = await updateUser(params.id, params.payload);
      if (!res.success) throw new Error("Update failed");
      return params; // return what we need to update cache
    },

    // Cross-page cache patch
    onSuccess: ({ id, payload }) => {
      const allPages = queryClient.getQueriesData<UsersListResponse>({
        queryKey: ["users"],
      });

      allPages.forEach(([key, pageData]) => {
        if (!pageData) return;

        const updatedPage = {
          ...pageData,
          data: pageData.data.map((user) =>
            user._id === id ? { ...user, ...payload } : user
          ),
        };

        queryClient.setQueryData(key, updatedPage);
      });
    },
  });
}
