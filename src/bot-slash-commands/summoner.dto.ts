import { Param } from '@discord-nestjs/core'

export class SummonerDto {
  @Param({
    name: 'summoner',
    nameLocalizations: {
      ko: '소환사',
    },
    description: 'Please enter [SummonerName#TagLine] accurately.',
    descriptionLocalizations: {
      ko: '[소환사명#태그]를 정확히 입력해주세요.',
    },
    required: true,
  })
  summoner: string
}
