import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Schedule } from 'src/schemas/schedule.schema'

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
  ) {}

  async create(schedule: Schedule) {
    const createdSchedule = new this.scheduleModel(schedule)
    return createdSchedule.save()
  }

  async delete(guildId: string) {
    return this.scheduleModel.deleteMany({ guildId: guildId })
  }
}
