import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@constants/general.constants';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationInput {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  page: number = DEFAULT_PAGE;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  limit: number = DEFAULT_LIMIT;
}
