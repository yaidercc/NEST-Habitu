import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit, System } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, System])],
  controllers: [HabitController],
  providers: [HabitService],
  exports: [TypeOrmModule]
})
export class HabitModule { }
