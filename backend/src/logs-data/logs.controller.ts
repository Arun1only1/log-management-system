import { ROLE } from '@constants/enum/role.enum';
import Lang from '@constants/language';
import {
  Controller,
  Get,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { UserRole } from 'src/decorators/user-role.decorator';
import { BarChartInput } from './dto/input/bar-chart-input';
import { LogTableDataInput } from './dto/input/log-table-data.input';
import { SourceInput } from './dto/input/source.input';
import { ActiveIPResponse } from './dto/response/active-ip.response';
import { TotalEventsResponse } from './dto/response/total-events.response';
import { LogsService } from './service/logs.service';
import { SeedService } from './service/seed.service';

@Controller('logs')
export class LogsController {
  constructor(
    private readonly logsService: LogsService,
    private readonly seedService: SeedService,
  ) {}

  @Public()
  @Post('seed')
  async seedDB() {
    await this.seedService.seedDB();
    return { message: Lang.DB_SEED_SUCCESS };
  }

  // private function to validate role
  private validateRole(role: string, source: string): void {
    if (![ROLE.ADMIN, source].includes(role)) {
      throw new UnprocessableEntityException(Lang.PERMISSION_REQUIRED);
    }
  }

  @Get('total-events')
  async getTotalEvents(
    @Query() { source }: SourceInput,
    @UserRole() role: string,
  ): Promise<TotalEventsResponse> {
    this.validateRole(role, source);

    return await this.logsService.getTotalEvents({ source });
  }

  @Get('active-ip')
  async getMostActiveIP(
    @Query() { source }: SourceInput,
    @UserRole() role: string,
  ): Promise<ActiveIPResponse> {
    this.validateRole(role, source);

    return await this.logsService.getMostActiveIpAddress({ source });
  }

  @Get('common-method')
  async getMostCommonMethod(
    @Query() { source }: SourceInput,
    @UserRole() role: string,
  ) {
    this.validateRole(role, source);

    return await this.logsService.getMostCommonMethod({ source });
  }

  @Get('http-status-code')
  async getTopHttpStatusCode(
    @Query() { source }: SourceInput,
    @UserRole() role: string,
  ) {
    this.validateRole(role, source);

    return await this.logsService.getTopHttpStatusCode({ source });
  }

  @Get('response-size')
  async getMostCommonResponseSize(
    @Query() { source }: SourceInput,
    @UserRole() role: string,
  ) {
    this.validateRole(role, source);

    return await this.logsService.mostCommonResponseSize({ source });
  }

  @Get('user-agent')
  async getTopUserAgent(
    @Query() { source }: SourceInput,
    @UserRole() role: string,
  ) {
    this.validateRole(role, source);

    return await this.logsService.getTopUserAgent({ source });
  }

  @Get('stat')
  async getStat(@Query() { source }: SourceInput, @UserRole() role: string) {
    this.validateRole(role, source);

    return await this.logsService.getStat({ source });
  }

  @Get('bar-chart-data')
  async getBarChartData(
    @Query() { date_option, source }: BarChartInput,
    @UserRole() role: string,
  ) {
    this.validateRole(role, source);

    return await this.logsService.getBarChartData({
      source,
      dateOption: date_option,
    });
  }

  @Get('log-data')
  async getLogData(
    @Query() { source, ...logDataInput }: LogTableDataInput,
    @UserRole() role: string,
  ) {
    this.validateRole(role, source);

    return await this.logsService.getLogTableData({
      source,
      ...logDataInput,
    });
  }
}
