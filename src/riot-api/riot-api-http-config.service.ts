import { HttpModuleOptionsFactory } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class RiotApiHttpConfig implements HttpModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createHttpOptions() {
    return {
      timeout: 5000,
      headers: {
        'X-Riot-Token': this.configService.get<string>('RIOT_API_KEY'),
      },
    }
  }
}
