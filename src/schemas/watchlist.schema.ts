import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type WatchlistDocument = HydratedDocument<Watchlist>

@Schema()
export class Watchlist {
  @Prop({ required: true })
  guildId: string

  @Prop({ required: true })
  riotPuuid: string
}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist)
