export class CreateUserDto {
  readonly name: string;
  readonly password: string;
  readonly isAdmin: boolean;
}
