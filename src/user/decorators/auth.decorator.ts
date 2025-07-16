import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function Auth(...roles: string[]) {
  return applyDecorators(
    UseGuards(AuthGuard())
  );
}