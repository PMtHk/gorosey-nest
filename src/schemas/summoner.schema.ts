import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type SummonerDocument = HydratedDocument<Summoner>

@Schema()
export class Summoner {
  @Prop({ required: true, unique: true })
  riotPuuid: string

  @Prop({ required: true, unique: true })
  summonerId: string

  @Prop()
  gameName: string

  @Prop()
  tagLine: string

  @Prop()
  profileIconId: number

  @Prop()
  revisionDate: number

  @Prop()
  summonerLevel: number

  constructor(
    riotPuuid: string,
    summonerId: string,
    gameName: string,
    tagLine: string,
    profileIconId: number,
    revisionDate: number,
    summonerLevel: number,
  ) {
    this.riotPuuid = riotPuuid
    this.summonerId = summonerId
    this.gameName = gameName
    this.tagLine = tagLine
    this.profileIconId = profileIconId
    this.revisionDate = revisionDate
    this.summonerLevel = summonerLevel
  }
}

export const SummonerSchema = SchemaFactory.createForClass(Summoner)
