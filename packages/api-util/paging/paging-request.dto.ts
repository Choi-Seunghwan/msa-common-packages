import { IsNumber, IsOptional, Min } from "class-validator";

export class PagingRequestDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  size?: number = 10;
}
