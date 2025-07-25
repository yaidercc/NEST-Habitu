import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateHabitLogDto } from './dto/create-habit-log.dto';
import { UpdateHabitLogDto } from './dto/update-habit-log.dto';
import { handleException } from 'src/common/utils/handleErrors';
import { User } from 'src/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitLog } from './entities/habit-log.entity';
import { Habit } from 'src/habit/entities';
import { validate as isUUID } from "uuid"
import { UserService } from 'src/user/user.service';
import { HabitService } from 'src/habit/habit.service';

@Injectable()
export class HabitLogService {
  private readonly logger = new Logger("HabitLogService");

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(HabitLog)
    private readonly habitLogRepository: Repository<HabitLog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>
  ) { }

  async create(createHabitLogDto: CreateHabitLogDto, user: User) {
    const { habitId, ...restHabitLogInfo } = createHabitLogDto
    const queryRunner = this.dataSource.createQueryRunner()
    try {
      await queryRunner.connect();
      queryRunner.startTransaction();

      const habit = await queryRunner.manager.findOneBy(Habit, { id: habitId })

      if (!habit) throw new NotFoundException("Habit not found")

      this.validaHabitLogDate(restHabitLogInfo.date)

      const habitLog = await queryRunner.manager.save(HabitLog, {
        ...restHabitLogInfo,
        user,
        habit
      })

      await queryRunner.commitTransaction();

      return habitLog

    } catch (error) {
      await queryRunner.rollbackTransaction();
      handleException(error, this.logger)
    } finally {
      await queryRunner.release()
    }
  }

  findAll() {
    return `This action returns all habitLog`;
  }

  async findAllBy(id: string) {
  if (!isUUID(id)) throw new BadRequestException(`${id}, is not a valid id`);

  const user = await this.userRepository.findOne({ where: { id } });
  const habit = !user ? await this.habitRepository.findOne({ where: { id } }) : null;

  if (!user && !habit) {
    throw new NotFoundException(`Neither user nor habit were found with id: ${id}`);
  }

  const habitLogs = await this.habitLogRepository.find({
    where: user
      ? { user: { id: user.id } }
      : { habit: { id: habit?.id } },
    relations: ['user', 'habit'], // show the relations if it´s neccesary
  });

  return habitLogs;
}


  update(id: number, updateHabitLogDto: UpdateHabitLogDto) {
    return `This action updates a #${id} habitLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} habitLog`;
  }

  private validaHabitLogDate(habitLogDate: string) {
    const currentDate = new Date()
    const dateHabitLog = new Date(habitLogDate)

    currentDate.setHours(0, 0, 0, 0);
    dateHabitLog.setHours(0, 0, 0, 0);

    if (dateHabitLog > currentDate) {
      throw new BadRequestException("You cannot register a habit log for a future date.");
    }

  }


}
