export class CreateUserDto {
  readonly name: string;
  password: string;
  readonly isAdmin: boolean;
}
