export class User {
  constructor(
  public email: string,
  public password: string,
  public userMessage: string,
  public userId: string,
  public sessionID: string,
  public userValidated: boolean,
  public userFirstName: string,
  public userLastName: string,
  public userTitle: string) {}
}

