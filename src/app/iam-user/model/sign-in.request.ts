/**
 * Represents the request model for user sign-in.
 *
 * @summary
 * Contains the credentials required to authenticate a user.
 */
export class SignInRequest {
  /**
   * The email address used for sign-in.
   */
  public email: string;

  /**
   * The password associated with the user's account.
   */
  public password: string;

  /**
   * Creates a new instance of {@link SignInRequest}.
   *
   * @param email - The user's email address
   * @param password - The user's plaintext password
   */
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
