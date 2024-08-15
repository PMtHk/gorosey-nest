import { EmbedBuilder, Colors } from 'discord.js'

// 입력한 소환사명을 찾을 수 없을 경우 사용되는 Embed
export const SummonerNotFoundEmbed = {
  'en-US': new EmbedBuilder()
    .setTitle('Summoner not found.')
    .setDescription('Please check the summoner name again.')
    .setColor(Colors.Orange),

  ko: new EmbedBuilder()
    .setTitle('해당하는 소환사를 찾을 수 없습니다.')
    .setDescription('소환사명을 다시 확인해주세요.')
    .setColor(Colors.Orange),
}
