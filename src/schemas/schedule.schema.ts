import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ScheduleDocument = HydratedDocument<Schedule>

@Schema()
export class Schedule {
  @Prop({ required: true })
  guildId: string

  @Prop({ required: true })
  time: number

  constructor(guildId: string, time: number) {
    this.guildId = guildId
    this.time = time
  }
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)
