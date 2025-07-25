import { Module } from '@nestjs/common';
import { HabitLogService } from './habit-log.service';
import { HabitLogController } from './habit-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitLog } from './entities/habit-log.entity';
import { UserModule } from 'src/user/user.module';
import { HabitModule } from 'src/habit/habit.module';

@Module({
  imports: [TypeOrmModule.forFeature([HabitLog]), UserModule, HabitModule],
  controllers: [HabitLogController],
  providers: [HabitLogService],
})
export class HabitLogModule {}
