import { DATE_OPTION } from '@constants/enum/date-option.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { SourceInput } from './source.input';

export class BarChartInput extends SourceInput {
  @IsEnum(DATE_OPTION, {
    message: 'Date option must be either day or month or year.',
  })
  @IsNotEmpty()
  date_option: DATE_OPTION;
}
