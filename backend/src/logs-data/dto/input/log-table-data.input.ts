import { dataSources } from '@constants/enum/source.enum';
import MSG from '@constants/validation.message';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxDate,
} from 'class-validator';
import * as dayjs from 'dayjs';
import { PaginationInput } from './pagination.input';

export class LogTableDataInput extends PaginationInput {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }: { value: string | undefined }) =>
    value ? dayjs(value).startOf('day').toDate() : undefined,
  )
  @IsDate()
  @MaxDate(dayjs().toDate(), { message: 'Start date cannot be future date.' })
  startDate?: Date;

  @IsOptional()
  @Transform(({ value }: { value: string | undefined }) =>
    value ? dayjs(value).endOf('day').toDate() : undefined,
  )
  @IsDate()
  @MaxDate(dayjs().toDate(), { message: 'End date cannot be future date.' })
  endDate?: Date;

  @IsEnum(dataSources, { message: MSG.VALID_SOURCE_ENUM })
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  source: string;
}
