import { Injectable, Logger } from '@nestjs/common'
import { GuildService } from 'src/guild/guild.service'
import { ScheduleService } from 'src/guild/schedule.service'
import { Guild } from 'src/schemas/guild.schema'
import { Schedule } from 'src/schemas/schedule.schema'

export type GuildCreateDto = {
  guildId: string
  guildName: string
  textChannelId: string
  textChannelName: string
}

export type GuildDeleteDto = {
  guildId: string
  guildName: string
}

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name)

  constructor(
    private readonly guildService: GuildService,
    private readonly scheduleService: ScheduleService,
  ) {}

  async handleGuildCreate(guildCreateDto: GuildCreateDto) {
    await this.guildService.create(
      new Guild(
        guildCreateDto.guildId,
        guildCreateDto.guildName,
        guildCreateDto.textChannelId,
        guildCreateDto.textChannelName,
      ),
    )
    await this.scheduleService.create(new Schedule(guildCreateDto.guildId, 0))

    this.logger.log(
      `Guild ${guildCreateDto.guildName}(ID: ${guildCreateDto.guildId}) has been initiated.`,
    )
  }

  async handleGuildDelete(guildDeleteDto: GuildDeleteDto) {
    await this.guildService.delete(guildDeleteDto.guildId)
    await this.scheduleService.delete(guildDeleteDto.guildId)

    // TODO: delete watchlist

    this.logger.log(
      `Guild ${guildDeleteDto.guildName}(ID: ${guildDeleteDto.guildId}) has been deleted.`,
    )
  }

  createSlashCommands() {}
}
