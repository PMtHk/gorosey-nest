import { SlashCommandPipe } from '@discord-nestjs/common'
import { Command, Handler, IA } from '@discord-nestjs/core'
import { Injectable } from '@nestjs/common'
import {
  InteractionReplyOptions,
  EmbedBuilder,
  Locale,
  Interaction,
} from 'discord.js'
import { SummonerDto } from './summoner.dto'
import { SummonerNotFoundEmbed } from './summoner.command.embeds'
import { RiotAccountService } from 'src/riot-account/riot-account.service'

const SummonerCommandOptions = {
  name: 'summoner',
  nameLocalizations: {
    ko: '소환사',
  },
  description:
    'Retrieve the rank (solo/flex) information and recent records of the summoner.',
  descriptionLocalizations: {
    ko: '소환사의 랭크(솔로/자유) 정보 및 최근 전적을 조회합니다.',
  },
}

@Command(SummonerCommandOptions)
@Injectable()
export class SummonerCommand {
  constructor(private readonly riotAccountService: RiotAccountService) {}

  @Handler()
  async onSummoner(
    @IA(SlashCommandPipe) summonerDto: SummonerDto,
    @IA() interaction: Interaction,
  ): Promise<InteractionReplyOptions> {
    const locale = interaction.locale as Locale
    const [rawGameName, rawTagLine = 'KR1'] = summonerDto.summoner.split('#')

    const account = await this.riotAccountService.getAccount(
      rawGameName,
      rawTagLine,
    )

    if (!account) {
      return {
        embeds: [SummonerNotFoundEmbed[locale]],
      }
    }

    const { puuid: riotPuuid, gameName, tagLine } = account

    // const summoner = await this.riotApiService.getSummoner(riotPuuid)

    // console.log(summoner)

    const embed = new EmbedBuilder()
      .setTitle(`${gameName}#${tagLine}`)
      .setDescription(`PUUID: ${riotPuuid}`)

    return {
      embeds: [embed],
    }
  }
}
