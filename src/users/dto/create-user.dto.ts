export class CreateUserDto {
  name: string;
  password: string;
  readonly isAdmin: boolean;
}
