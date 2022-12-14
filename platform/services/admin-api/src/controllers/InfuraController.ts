import { Controller, UseFilters, Get, Query } from '@nestjs/common'
import { NestJSPinoLogger } from '@consensys/observability'
import { ClientService } from '../services/ClientService'
import { AppToHttpFilter } from '@consensys/error-handler'
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { ClientGetAllResponse } from '../responses/ClientGetAllResponse'
import { ConfigConstants } from '../config/ConfigConstants'
import { Protected } from '@consensys/auth'

@ApiTags('Infura')
@ApiBearerAuth('access-token')
@Controller('infura')
@UseFilters(new AppToHttpFilter())
export class InfuraController {
  constructor(
    private readonly logger: NestJSPinoLogger,
    private readonly clientService: ClientService,
  ) {
    logger.setContext(InfuraController.name)
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all Infura clients' })
  @ApiQuery({ name: 'skip', required: false, description: 'Pagination offset' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Page limit',
  })
  @Protected(true, [])
  async getAllInfuraClients(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ): Promise<ClientGetAllResponse> {
    this.logger.info('Processing request to retrieve all infura clients')

    const result = await this.clientService.getAllClients(
      limit,
      skip,
      ConfigConstants.INFURA_CONNECTION_NAME,
    )

    const clientsWithoutSecret = result.map((client) => ({
      ...client,
      clientSecret: null,
    }))

    return {
      count: clientsWithoutSecret.length,
      items: clientsWithoutSecret,
      skip,
      limit,
    }
  }
}
