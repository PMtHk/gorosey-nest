import { Module } from '@nestjs/common'
import { SummonerCommand } from './summoner.command'
import { ReflectMetadataProvider } from '@discord-nestjs/core'

@Module({
  providers: [SummonerCommand, ReflectMetadataProvider],
})
export class BotSlashCommandsModule {}
