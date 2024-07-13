import { SlashCommandPipe } from '@discord-nestjs/common'
import { Command, Handler, IA } from '@discord-nestjs/core'
import { Injectable } from '@nestjs/common'
import {
  InteractionReplyOptions,
  EmbedBuilder,
  Colors,
  Locale,
  Interaction,
} from 'discord.js'
import { SummonerDto } from './summoner.dto'
import { AccountRegion, RiotApiService } from 'src/riot-api/riot-api.service'

const SummonerNotFoundEmbed = {
  kr: new EmbedBuilder()
    .setTitle('해당하는 소환사를 찾을 수 없습니다.')
    .setDescription('소환사명을 다시 확인해주세요.')
    .setColor(Colors.Orange),

  'en-US': new EmbedBuilder()
    .setTitle('Summoner not found.')
    .setDescription('Please check the summoner name again.')
    .setColor(Colors.Orange),
}

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
    @IA() interaction: Interaction,
  ): Promise<InteractionReplyOptions> {
    const locale = interaction.locale as Locale
    const [_gameName, _tagLine = 'KR1'] = summonerDto.summoner.split('#')

    const account = await this.riotApiService.getAccount(
      _gameName,
      _tagLine,
      AccountRegion.ASIA,
    )

    if (!account)
      return {
        embeds: [SummonerNotFoundEmbed[locale]],
      }

    const { puuid: riotPuuid, gameName, tagLine } = account

    const embed = new EmbedBuilder()
      .setTitle(`${gameName}#${tagLine}`)
      .setDescription(`PUUID: ${riotPuuid}`)

    return {
      embeds: [embed],
    }
  }
}
