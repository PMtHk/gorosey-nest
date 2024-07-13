import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AxiosRequestConfig } from 'axios'
import { catchError, firstValueFrom, map } from 'rxjs'

export enum AccountRegion {
  AMERICAS = 'americas',
  ASIA = 'asia',
  EUROPE = 'europe',
  ESPORTS = 'esports',
}

@Injectable()
export class RiotApiService {
  private readonly logger = new Logger(RiotApiService.name)

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAccount(
    gameName: string,
    tagLine: string,
    region: AccountRegion,
  ): Promise<{
    puuid: string
    gameName: string
    tagLine: string
  } | null> {
    const axiosConfig: AxiosRequestConfig = {
      method: 'GET',
      url: `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      validateStatus: (status: number) => status === 200,
    }

    return await firstValueFrom(
      this.httpService.request(axiosConfig).pipe(
        catchError((e) => {
          this.logger.error(e)
          this.logger.error(
            `gameName: ${gameName}, tagLine: ${tagLine}, region: ${region}`,
          )
          return [
            {
              data: null,
            },
          ]
        }),
        map((res) => res.data),
      ),
    )
  }
}
