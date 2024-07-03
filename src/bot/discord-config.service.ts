import {
  DiscordModuleOption,
  DiscordOptionsFactory,
} from '@discord-nestjs/core'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GatewayIntentBits } from 'discord.js'

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  constructor(private configService: ConfigService) {}

  createDiscordOptions(): DiscordModuleOption | Promise<DiscordModuleOption> {
    return {
      token: this.configService.get<string>('DISCORD_TOKEN'),
      discordClientOptions: {
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
        ],
      },
    }
  }
}
