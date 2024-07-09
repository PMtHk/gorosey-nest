import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BotModule } from './bot/bot.module'
import { MongooseModule } from '@nestjs/mongoose'
import { MongooseConfigService } from './mongoose-config.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),

    BotModule,
  ],
})
export class AppModule {}
