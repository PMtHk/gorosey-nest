import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { WatchlistDocument } from './watchlist.schema'

export type GuildDocument = HydratedDocument<
  Guild | (Guild & { watchlist: WatchlistDocument[] })
>

@Schema()
export class Guild {
  @Prop({ required: true, unique: true })
  guildId: string

  @Prop({ required: true })
  guildName: string

  @Prop()
  textChannelId: string

  @Prop()
  textChannelName: string

  @Prop()
  lastUpdatedAt: Date

  constructor(
    guildId: string,
    guildName: string,
    textChannelId: string,
    textChannelName: string,
  ) {
    this.guildId = guildId
    this.guildName = guildName
    this.textChannelId = textChannelId
    this.textChannelName = textChannelName
    this.lastUpdatedAt = new Date()
  }
}

export const GuildSchema = SchemaFactory.createForClass(Guild)

GuildSchema.virtual('watchlist', {
  ref: 'Watchlist',
  localField: 'guildId',
  foreignField: 'guildId',
})
