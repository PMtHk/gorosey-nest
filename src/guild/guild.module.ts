import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Guild, GuildSchema } from 'src/schemas/guild.schema'
import { Schedule, ScheduleSchema } from 'src/schemas/schedule.schema'
import { Watchlist, WatchlistSchema } from 'src/schemas/watchlist.schema'
import { GuildService } from './guild.service'
import { ScheduleService } from './schedule.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Guild.name,
        schema: GuildSchema,
      },
      {
        name: Schedule.name,
        schema: ScheduleSchema,
      },
      {
        name: Watchlist.name,
        schema: WatchlistSchema,
      },
    ]),
  ],

  providers: [GuildService, ScheduleService],

  exports: [GuildService, ScheduleService],
})
export class GuildModule {}
