import { InjectDiscordClient, On, Once } from '@discord-nestjs/core'
import { Injectable, Logger } from '@nestjs/common'
import {
  ChannelType,
  Client,
  Guild,
  GuildBasedChannel,
  TextChannel,
} from 'discord.js'
import { BotService } from './bot.service'

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name)

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly botService: BotService,
  ) {}

  @Once('ready')
  onReady() {
    const { tag: botName, id: botId } = this.client.user
    this.logger.log(`${botName}(ID: ${botId}) has started...`)
  }

  @On('guildCreate')
  onGuildCreate(guild: Guild) {
    const { id: guildId, name: guildName } = guild
    // const textChannels: Array<TextChannel> = this.getGuildTextChannels(guild)

    this.logger.log(`${guildName}(ID: ${guildId}) has been added to the bot.`)
  }

  @On('guildDelete')
  onGuildDelete(guild: Guild) {
    const { id: guildId, name: guildName } = guild

    this.logger.error(
      `${guildName}(ID: ${guildId}) has been removed from the bot.`,
    )
  }

  private getGuildTextChannels(guild: Guild): Array<TextChannel> {
    return guild.channels.cache
      .filter(
        (channel: GuildBasedChannel) => channel.type === ChannelType.GuildText,
      )
      .map((channel: GuildBasedChannel) => channel as TextChannel)
  }
}
