export class User {
  constructor(
    public userID: string,
    public email: string,
    private tokken: string,
    public roles: string[],
    private expireDate: Date
  ) {}
  get token() {
    if (!this.expireDate || this.expireDate < new Date()) {
      return null;
    }
    return this.tokken;
  }
}
