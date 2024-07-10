import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { RiotApiService } from './riot-api.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 3000,
      maxRedirects: 3,
    }),
  ],

  providers: [RiotApiService],
  exports: [RiotApiService],
})
export class RiotApiModule {}
