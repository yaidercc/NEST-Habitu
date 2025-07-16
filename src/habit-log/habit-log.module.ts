import { Module } from '@nestjs/common';
import { HabitLogService } from './habit-log.service';
import { HabitLogController } from './habit-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitLog } from './entities/habit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HabitLog])],
  controllers: [HabitLogController],
  providers: [HabitLogService],
})
export class HabitLogModule {}
