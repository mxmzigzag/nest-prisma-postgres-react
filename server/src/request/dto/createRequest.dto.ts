import { RequestTypes } from '@prisma/client';

export class CreateRequestDto {
  readonly userId: number;
  readonly type: RequestTypes;
}
