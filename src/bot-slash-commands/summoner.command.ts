import { SlashCommandPipe } from '@discord-nestjs/common'
import { Command, Handler, IA } from '@discord-nestjs/core'
import { Injectable } from '@nestjs/common'
import {
  InteractionReplyOptions,
  EmbedBuilder,
  CommandInteraction,
} from 'discord.js'
import { SummonerDto } from './summoner.dto'

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
  @Handler()
  onSummoner(
    @IA(SlashCommandPipe) summonerDto: SummonerDto,
    @IA() interaction: CommandInteraction,
  ): InteractionReplyOptions {
    let [gameName, tagLine = 'KR1'] = summonerDto.summoner.split('#')

    console.log(interaction)

    const embed = new EmbedBuilder().setTitle('test')

    return {
      embeds: [embed],
    }
  }
}
