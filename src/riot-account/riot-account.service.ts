import { Injectable } from '@nestjs/common'
// import { InjectModel } from '@nestjs/mongoose'
// import { Model } from 'mongoose'
import { AccountRegion, RiotApiService } from 'src/riot-api/riot-api.service'
// import { RiotAccount } from 'src/schemas/riot-account.schema'

@Injectable()
export class RiotAccountService {
  constructor(
    // @InjectModel(RiotAccount.name)
    // private riotAccountModel: Model<RiotAccount>,
    private readonly riotService: RiotApiService,
  ) {}

  async getAccount(
    rawGameName: string,
    rawTagLine: string,
    region: AccountRegion = AccountRegion.ASIA,
  ) {
    return await this.riotService.getAccount(rawGameName, rawTagLine, region)

    // 8/15
    // 매 사용자의 조회 요청에 정확한 gameName, tagLine을 받아서 저장해야 한다.
    // 결국 매번 API 호출을 진행해야 한다.
    // 따로 DB에 저장하더라도 사용할 경우가 적다.

    // 따라서, 지금은 gameName, tagLine은 API 호출해서 가져오고,
    // 저장은 실제 gameName과 tagLine을 필요로 하는 Summoner 테이블에 저장하도록 한다.
  }
}
