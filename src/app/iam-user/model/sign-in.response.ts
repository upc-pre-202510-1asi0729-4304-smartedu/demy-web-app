/**
 * Represents the response returned after a successful sign-in operation.
 *
 * @summary
 * Contains authenticated user information along with a JWT token.
 */
export interface SignInResponse {
  /**
   * The authenticated user's information.
   */
  user: {
    /**
     * Unique identifier of the user.
     */
    id: number;

    /**
     * Username used to log in (could be derived or different from email).
     */
    username: string;

    /**
     * Email address associated with the user.
     */
    email: string;

    /**
     * Full name of the user.
     */
    fullName: string;

    /**
     * Role assigned to the user (e.g., ADMIN, TEACHER).
     */
    role: string;
  };

  /**
   * JWT token issued for the authenticated session.
   * Used for authorizing subsequent requests.
   */
  token: string;
}
