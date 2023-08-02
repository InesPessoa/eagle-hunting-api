import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly walletAddress?: string;
}
