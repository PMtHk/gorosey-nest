import { DiscordModule } from '@discord-nestjs/core'
import { Module } from '@nestjs/common'
import { DiscordConfigService } from './discord-config.service'
import { BotGateway } from './bot.gateway'
import { BotService } from './bot.service'
import { GuildModule } from 'src/guild/guild.module'

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useClass: DiscordConfigService,
    }),

    GuildModule,
  ],
  providers: [BotGateway, BotService],
})
export class BotModule {}
