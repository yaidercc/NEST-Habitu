import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateIdentityDto } from './dto/create-identity.dto';
import { UpdateIdentityDto } from './dto/update-identity.dto';
import { User } from 'src/user/entities/user.entity';
import { handleException } from 'src/common/utils/handleErrors';
import { InjectRepository } from '@nestjs/typeorm';
import { Identity } from './entities/identity.entity';
import { DataSource, Repository } from 'typeorm';
import { System } from 'src/system/entities/system.entity';
import { Goal } from 'src/goal/entities/goal.entity';
import { validate as isUUID } from "uuid"

@Injectable()
export class IdentityService {
  private readonly logger = new Logger("IdentityService")

  constructor(
    @InjectRepository(Identity)
    private readonly identityService: Repository<Identity>,
    private readonly dataSource: DataSource
  ) { }

  async create(createIdentityDto: CreateIdentityDto, user: User) {
    const { systemId, goalId, ...restIdentityInfo } = createIdentityDto
    const queryRunner = this.dataSource.createQueryRunner()
    try {
      await queryRunner.connect();
      queryRunner.startTransaction();

      const system = await queryRunner.manager.findOneBy(System, { id: systemId })
      const goal = await queryRunner.manager.findOneBy(Goal, { id: goalId })

      if (!system) throw new NotFoundException("System not found")
      if (!goal) throw new NotFoundException("Goal not found")

      const identity = await queryRunner.manager.save(Identity, {
        ...restIdentityInfo,
        user,
        goal,
        system
      })

      await queryRunner.commitTransaction();

      return identity

    } catch (error) {
      await queryRunner.rollbackTransaction();
      handleException(error, this.logger)
    } finally {
      await queryRunner.release()
    }
  }

  findAll() {
    return `This action returns all identity`;
  }

  async findOne(term: string) {
    let identity: Identity | null = null;
    if (isUUID(term)) identity = await this.identityService.findOneBy({ id: term })
    else {
      identity = await this.identityService.findOne({
        where: { description: term.toLowerCase() }
      });
    }
    if (!identity) throw new NotFoundException("identity not found")

    return identity;
  }

  update(id: number, updateIdentityDto: UpdateIdentityDto) {
    return `This action updates a #${id} identity`;
  }

  remove(id: number) {
    return `This action removes a #${id} identity`;
  }
}
