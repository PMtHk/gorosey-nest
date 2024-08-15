import { Module } from '@nestjs/common'
import { RiotAccountService } from './riot-account.service'
// import { MongooseModule } from '@nestjs/mongoose'
// import { RiotAccountSchema } from 'src/schemas/riot-account.schema'
import { RiotApiModule } from 'src/riot-api/riot-api.module'

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: 'RiotAccount',
    //     schema: RiotAccountSchema,
    //   },
    // ]),
    RiotApiModule,
  ],
  providers: [RiotAccountService],
  exports: [RiotAccountService],
})
export class RiotAccountModule {}
