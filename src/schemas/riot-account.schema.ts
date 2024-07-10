import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type RiotAccountDoucment = HydratedDocument<RiotAccount>

@Schema()
export class RiotAccount {
  @Prop({ required: true, unique: true })
  riotPuuid: string

  @Prop({ required: true })
  gameName: string

  @Prop({ required: true })
  tagLine: string

  constructor(riotPuuid: string, gameName: string, tagLine: string) {
    this.riotPuuid = riotPuuid
    this.gameName = gameName
    this.tagLine = tagLine
  }
}

export const RiotAccountSchema = SchemaFactory.createForClass(RiotAccount)
