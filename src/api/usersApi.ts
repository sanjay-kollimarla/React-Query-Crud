import { useHttpClient } from "../hooks/useHttpClient";
import type {
  UsersListResponse,
  BasicSuccessResponse,
  UpdateUserPayload,
} from "../types/users";

export function useUsersApi() {
  const http = useHttpClient();

  return {
    getUsers: async (page: number): Promise<UsersListResponse> => {
      const res = await http.get("/users", { params: { page } });
      return res.data;
    },

    deleteUser: async (id: string): Promise<BasicSuccessResponse> => {
      const res = await http.delete(`/user/${id}`);
      return res.data;
    },

    updateUser: async (
      id: string,
      payload: UpdateUserPayload
    ): Promise<BasicSuccessResponse> => {
      const res = await http.patch(`/user/${id}`, payload);
      return res.data;
    },
  };
}
