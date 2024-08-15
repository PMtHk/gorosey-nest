import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class KoreanDiscordListService {
  constructor(private configService: ConfigService) {}

  async updateKDLServerCount(newServerCount: number) {
    const DISCORD_APPLICATION_ID = this.configService.get<string>(
      'DISCORD_APPLICATION_ID',
    )

    const KDL_TOKEN = this.configService.get<string>(
      'KOERAN_DISCORD_LIST_TOKEN',
    )

    const headers = {
      Authorization: KDL_TOKEN,
      'Content-Type': 'application/json',
    }

    const body = JSON.stringify({
      servers: newServerCount,
    })

    return await fetch(
      `https://koreanbots.dev/api/v2/bots/${DISCORD_APPLICATION_ID}/stats`,
      {
        method: 'POST',
        headers,
        body,
      },
    )
  }
}
