import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
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

  constructor(private readonly httpService: HttpService) {}

  async getAccount(
    gameName: string,
    tagLine: string,
    region: AccountRegion = AccountRegion.ASIA,
  ): Promise<{
    puuid: string
    gameName: string
    tagLine: string
  } | null> {
    return await firstValueFrom(
      this.httpService
        .request({
          method: 'GET',
          url: `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
          validateStatus: (status: number) => status === 200,
        })
        .pipe(
          catchError((e) => {
            this.logger.error(e)
            this.logger.error(
              `Failed to getAccount. Target: ${gameName}#${tagLine} (region: ${region})`,
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

  async getSummoner(riotPuuid: string) {
    return await firstValueFrom(
      this.httpService
        .request({
          method: 'GET',
          url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${riotPuuid}`,
          validateStatus: (status: number) => status === 200,
        })
        .pipe(
          catchError((e) => {
            this.logger.error(e)
            this.logger.error(`Failed to getSummoner. Target: ${riotPuuid}`)
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
