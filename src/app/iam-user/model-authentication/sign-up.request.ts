/**
 * Model for sign up request
 */
export class SignUpRequest {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public academyName: string,
    public ruc: string
  ) {}
}

