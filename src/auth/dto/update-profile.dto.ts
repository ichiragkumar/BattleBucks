import { IsOptional, IsString, IsBoolean, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsUrl()
  discordLink?: string;

  @IsOptional()
  @IsUrl()
  twitterLink?: string;
}
