export class CreateUserDto {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
  readonly status: string;
  readonly otp: string;
  readonly createdOn: Date;
  readonly modifiedOn: Date;
}
