/**
 * Model for the sign in response.
 */
export interface SignInResponse {
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    role: string;
  };
  token: string;
}
