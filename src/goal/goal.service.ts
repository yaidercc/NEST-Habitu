import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { handleException } from 'src/common/utils/handleErrors';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from "uuid"

@Injectable()
export class GoalService {
  private logger = new Logger("GoalService")
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>
  ) { }

  async create(createGoalDto: CreateGoalDto, user: User) {
    try {
      const goal = this.goalRepository.create({
        ...createGoalDto,
        user
      })

      await this.goalRepository.save(goal)
      return goal;
    } catch (error) {
      handleException(error, this.logger)
    }
  }

  findAll() {
    return `This action returns all goal`;
  }

  async findOne(term: string) {
    let goal: Goal | null = null;
    if (isUUID(term)) goal = await this.goalRepository.findOneBy({ id: term })
    else {
      const queryBuilder = this.goalRepository.createQueryBuilder();
      goal = await queryBuilder.where("description=:description", {
        description: term.toLowerCase()
      }).getOne()
    }
    if(!goal) throw new NotFoundException("Goal not found");
    
    return goal
  }

  update(id: number, updateGoalDto: UpdateGoalDto) {
    return `This action updates a #${id} goal`;
  }

  remove(id: number) {
    return `This action removes a #${id} goal`;
  }
}
