import { SlashCommandPipe } from '@discord-nestjs/common'
import { Command, Handler, IA } from '@discord-nestjs/core'
import { Injectable } from '@nestjs/common'
import { InteractionReplyOptions, EmbedBuilder } from 'discord.js'
import { SummonerDto } from './summoner.dto'
import { RiotApiService } from 'src/riot-api/riot-api.service'

@Command({
  name: 'summoner',
  nameLocalizations: {
    ko: '소환사',
  },
  description:
    'Retrieve the rank (solo/flex) information and recent records of the summoner.',
  descriptionLocalizations: {
    ko: '소환사의 랭크(솔로/자유) 정보 및 최근 전적을 조회합니다.',
  },
})
@Injectable()
export class SummonerCommand {
  constructor(private readonly riotApiService: RiotApiService) {}

  @Handler()
  async onSummoner(
    @IA(SlashCommandPipe) summonerDto: SummonerDto,
  ): Promise<InteractionReplyOptions> {
    const [_gameName, _tagLine = 'KR1'] = summonerDto.summoner.split('#')

    const {
      puuid: riotPuuid,
      gameName,
      tagLine,
    } = await this.riotApiService.getAccount(_gameName, _tagLine)

    const embed = new EmbedBuilder()
      .setTitle(`${gameName}#${tagLine}`)
      .setDescription(riotPuuid)

    return {
      embeds: [embed],
    }
  }
}
