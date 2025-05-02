import MSG from '@constants/validation.message';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { dataSources } from '@constants/enum/source.enum';

export class SourceInput {
  @IsEnum(dataSources, { message: MSG.VALID_SOURCE_ENUM })
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  source: string;
}
