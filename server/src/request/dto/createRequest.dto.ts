import { RequestTypes } from '@prisma/client';

export class CreateRequestDto {
  readonly userId: string;
  readonly type: RequestTypes;
}
