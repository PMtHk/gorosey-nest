import { InjectDiscordClient, On, Once } from '@discord-nestjs/core'
import { Injectable, Logger } from '@nestjs/common'
import {
  ChannelType,
  Client,
  Guild,
  GuildBasedChannel,
  TextChannel,
} from 'discord.js'
import { BotService, GuildCreateDto } from './bot.service'

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
    this.logger.log(
      `guildCreate event has been triggered for ${guildName}(ID: ${guildId}).`,
    )

    const textChannel: TextChannel = this.getGuildTextChannels(guild)[0]
    const guildCreateDto: GuildCreateDto = {
      guildId: guildId,
      guildName: guildName,
      textChannelId: textChannel.id,
      textChannelName: textChannel.name,
    }

    this.botService.handleGuildCreate(guildCreateDto)
  }

  @On('guildDelete')
  onGuildDelete(guild: Guild) {
    const { id: guildId, name: guildName } = guild
    this.logger.log(
      `guildDelete event has been triggered for ${guildName}(ID: ${guildId}).`,
    )

    const guildDeleteDto = {
      guildId: guildId,
      guildName: guildName,
    }

    this.botService.handleGuildDelete(guildDeleteDto)
  }

  private getGuildTextChannels(guild: Guild): Array<TextChannel> {
    return guild.channels.cache
      .filter(
        (channel: GuildBasedChannel) => channel.type === ChannelType.GuildText,
      )
      .map((channel: GuildBasedChannel) => channel as TextChannel)
  }
}
