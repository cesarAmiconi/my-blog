export interface User {
  name: string;
  password: string;
  isAdmin: boolean;
}

export interface ValidatedUser {
  userId: string;
  username: string;
}
