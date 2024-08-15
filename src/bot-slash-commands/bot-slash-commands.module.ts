import { Module } from '@nestjs/common'
import { SummonerCommand } from './summoner.command'
import { ReflectMetadataProvider } from '@discord-nestjs/core'
import { RiotAccountModule } from 'src/riot-account/riot-account.module'

@Module({
  imports: [RiotAccountModule],

  providers: [SummonerCommand, ReflectMetadataProvider],
})
export class BotSlashCommandsModule {}
