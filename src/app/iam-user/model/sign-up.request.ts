/**
 * Represents the data required to register a new user account.
 *
 * @summary
 * This model is used to send sign-up information to the backend, including user details
 * and associated academy information.
 */
export class SignUpRequest {
  /**
   * Creates a new instance of {@link SignUpRequest}.
   *
   * @param firstName - The user's first name
   * @param lastName - The user's last name
   * @param email - The user's email address
   * @param password - The user's plaintext password (to be hashed by the backend)
   * @param academyName - The name of the academy to associate with the user
   * @param ruc - The RUC (tax ID) of the academy
   */
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public academyName: string,
    public ruc: string
  ) {}
}

