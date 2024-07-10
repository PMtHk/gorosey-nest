import { Module } from '@nestjs/common'
import { SummonerCommand } from './summoner.command'
import { ReflectMetadataProvider } from '@discord-nestjs/core'
import { RiotApiModule } from 'src/riot-api/riot-api.module'

@Module({
  imports: [RiotApiModule],

  providers: [SummonerCommand, ReflectMetadataProvider],
})
export class BotSlashCommandsModule {}
