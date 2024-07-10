import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type MatchHistoryDocument = HydratedDocument<MatchHistory>

@Schema()
export class MatchHistory {
  @Prop({ required: true })
  matchId: string

  @Prop({ required: true })
  riotPuuid: string

  @Prop()
  gameType: string

  @Prop()
  gameEndTimestamp: number

  @Prop()
  win: boolean

  @Prop()
  championId: number

  @Prop()
  championName: string

  @Prop()
  kills: number

  @Prop()
  deaths: number

  @Prop()
  assists: number

  @Prop()
  position: string

  @Prop()
  totalMinionsKilled: number

  @Prop()
  visionScore: number

  constructor(
    matchId: string,
    riotPuuid: string,
    gameType: string,
    gameEndTimestamp: number,
    win: boolean,
    championId: number,
    championName: string,
    kills: number,
    deaths: number,
    assists: number,
    position: string,
    totalMinionsKilled: number,
    visionScore: number,
  ) {
    this.matchId = matchId
    this.riotPuuid = riotPuuid
    this.gameType = gameType
    this.gameEndTimestamp = gameEndTimestamp
    this.win = win
    this.championId = championId
    this.championName = championName
    this.kills = kills
    this.deaths = deaths
    this.assists = assists
    this.position = position
    this.totalMinionsKilled = totalMinionsKilled
    this.visionScore = visionScore
  }
}

export const MatchHistorySchema = SchemaFactory.createForClass(MatchHistory)

MatchHistorySchema.index({ matchId: 1, riotPuuid: 1 }, { unique: true })
