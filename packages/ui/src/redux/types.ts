export interface User {
  id: string;
  email: string;
  username: string | null;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  roles: string[];
}
export interface UserState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
