/**
 * Represents the response returned after a successful sign-up operation.
 *
 * @summary
 * Contains the created user's information and an optional authentication token.
 */
export interface SignUpResponse {
  /**
   * The user account information returned by the backend.
   */
  user: {
    /**
     * Unique identifier of the newly created user.
     */
    id: number;

    /**
     * First name of the user.
     */
    firstName: string;

    /**
     * Last name of the user.
     */
    lastName: string;

    /**
     * Email address associated with the user account.
     */
    email: string;

    /**
     * Role assigned to the user (e.g., ADMIN, TEACHER).
     */
    role: string;
  };
  /**
   * Optional JWT token assigned upon successful sign-up, used for authentication.
   *
   * @optional
   */
  token?: string;
}

