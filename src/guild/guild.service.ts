import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Guild } from 'src/schemas/guild.schema'

@Injectable()
export class GuildService {
  constructor(@InjectModel(Guild.name) private guildModel: Model<Guild>) {}

  async create(guild: Guild) {
    const createdGuild = new this.guildModel(guild)
    return createdGuild.save()
  }

  async delete(guildId: string) {
    return this.guildModel.deleteOne({ guildId: guildId })
  }
}
