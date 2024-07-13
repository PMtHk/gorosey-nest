import { Module } from '@nestjs/common'
import { RiotApiService } from './riot-api.service'
import { HttpModule } from '@nestjs/axios'
import { RiotApiHttpConfig } from './riot-api-http-config.service'

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: RiotApiHttpConfig,
    }),
  ],

  providers: [RiotApiService],
  exports: [RiotApiService],
})
export class RiotApiModule {}
