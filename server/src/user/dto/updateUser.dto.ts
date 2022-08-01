import { Role } from '@prisma/client';

export class UpdateUserDto {
  readonly name: string;
  readonly surname: string;
  readonly username: string;
  readonly role: Role;
}
