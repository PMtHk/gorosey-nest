import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name)

  initiateGuild() {
    // TODO: create a guild column.
    // TODO: create a base schedule for the guild.
  }

  createSlashCommands() {}
}
