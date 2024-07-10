import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type LeaugeDoucment = HydratedDocument<Leauge>

@Schema()
export class Leauge {
  @Prop({ required: true })
  leagueId: string

  @Prop({ required: true })
  queueType: string

  @Prop()
  tier: string

  @Prop()
  rank: string

  @Prop({ required: true })
  summonerId: string

  @Prop()
  leaguePoints: number

  @Prop()
  wins: number

  @Prop()
  losses: number
}

export const LeaugeSchema = SchemaFactory.createForClass(Leauge)

LeaugeSchema.index({ leagueId: 1, summonerId: 1 }, { unique: true })
