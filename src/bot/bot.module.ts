import { DiscordModule } from '@discord-nestjs/core'
import { Module } from '@nestjs/common'
import { DiscordConfigService } from './discord-config.service'
import { BotGateway } from './bot.gateway'

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useClass: DiscordConfigService,
    }),
  ],
  providers: [BotGateway],
})
export class BotModule {}
