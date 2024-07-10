import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AxiosRequestConfig } from 'axios'
import { catchError, firstValueFrom, map } from 'rxjs'

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
  ): Promise<{
    puuid: string
    gameName: string
    tagLine: string
  }> {
    const axiosConfig: AxiosRequestConfig = {
      method: 'GET',
      url: `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      headers: {
        'X-Riot-Token': this.configService.get<string>('RIOT_API_KEY'),
      },
      validateStatus: (status: number) => status === 200,
    }

    const accountDto: AccountDto = await firstValueFrom(
      this.httpService.request(axiosConfig).pipe(
        catchError((e) => {
          this.logger.error(e)
          throw new Error('external riot-api error')
        }),
        map((res) => res.data),
      ),
    )

    return {
      puuid: accountDto.puuid,
      gameName: accountDto.gameName,
      tagLine: accountDto.tagLine,
    }
  }
}

export type AccountDto = {
  puuid: string
  gameName: string
  tagLine: string
}
