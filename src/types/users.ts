// src/types/users.ts

export interface User {
  _id: string;
  name: string;
  email: string;
}

// API Response for GET /users
export interface UsersListResponse {
  success: boolean;
  data: User[];
  currentPage: number;
  totalPages: number;
}

// API Response for DELETE /user/:id or PATCH
export interface BasicSuccessResponse {
  success: boolean;
}

// Payload for PATCH /user/:id
export interface UpdateUserPayload {
  name?: string;
  email?: string;
}
