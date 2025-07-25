import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { handleException } from 'src/common/utils/handleErrors';
import { DataSource, Repository } from 'typeorm';
import { System } from 'src/system/entities/system.entity';
import { Identity } from 'src/identity/entities/identity.entity';
import { Habit } from './entities';
import { validate as isUUID } from "uuid"
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class HabitService {
  private readonly logger = new Logger("HabitService")
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
    private readonly datasource: DataSource
  ) { }

  async create(createHabitDto: CreateHabitDto) {
    const { systemId, identityId, ...restHabitInfo } = createHabitDto
    const queryRunner = this.datasource.createQueryRunner();

    try {

      await queryRunner.connect();
      queryRunner.startTransaction();

      const system = await queryRunner.manager.findOneBy(System, { id: systemId })
      const identity = await queryRunner.manager.findOneBy(Identity, { id: identityId })

      if (!system) throw new NotFoundException("System not found")
      if (!identity) throw new NotFoundException("Identity not found")

      const habit = await queryRunner.manager.save(Habit, {
        ...restHabitInfo,
        system,
        identity
      })

      await queryRunner.commitTransaction();

      return habit

    } catch (error) {
      await queryRunner.rollbackTransaction();
      handleException(error, this.logger)

    } finally {
      await queryRunner.release()
    }
  }

  findAll() {
    return `This action returns all habit`;
  }

  async findOne(term: string) {
    let habit: Habit | null = null;
    if (isUUID(term)) habit = await this.habitRepository.findOneBy({ id: term })
    else {
      habit = await this.habitRepository.findOne({
        where: { description: term.toLowerCase() }
      });
    }
    if (!habit) throw new NotFoundException("habit not found")

    return habit;
  }

  update(id: number, updateHabitDto: UpdateHabitDto) {
    return `This action updates a #${id} habit`;
  }

  remove(id: number) {
    return `This action removes a #${id} habit`;
  }
}
