import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { System } from './entities/system.entity';
import { Repository } from 'typeorm';
import { handleException } from 'src/common/utils/handleErrors';
import { validate as isUUID } from "uuid"

@Injectable()
export class SystemService {
  private readonly logger = new Logger("SystemService")
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>
  ) { }

  async create(createSystemDto: CreateSystemDto) {
    try {
      const createSystem = this.systemRepository.create(createSystemDto)
      await this.systemRepository.save(createSystem)

      return createSystem

    } catch (error) {
      handleException(error, this.logger)
    }
  }

  async findAll() {
    return await this.systemRepository.findBy({});
  }

  async findOne(term: string) {
    let system: System | null = null;
    if (isUUID(term)) system = await this.systemRepository.findOneBy({ id: term })
    else {
      const queryBuilder = this.systemRepository.createQueryBuilder();
      system = await queryBuilder.where("description=:description", {
        description: term.toLowerCase()
      }).getOne()
    }

    if (!system) {
      throw new NotFoundException("System not found")
    }

    return system;

  }

  update(id: number, updateSystemDto: UpdateSystemDto) {
    return `This action updates a #${id} system`;
  }

  remove(id: number) {
    return `This action removes a #${id} system`;
  }
}
