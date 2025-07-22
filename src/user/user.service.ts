import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { LoginUserDto } from './dto/login-user';
import { JwtService } from "@nestjs/jwt"
import { JWTpayload } from './strategies/interfaces/jwt-interfaces';
import { validate as isUUID } from "uuid"
import { handleException } from 'src/common/utils/handleErrors';

@Injectable()
export class UserService {
  private readonly logger = new Logger("UserService")
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { password, ...restUserInfo } = createUserDto

    try {
      const user = this.userRepository.create({
        ...restUserInfo,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync())
      })
      await this.userRepository.save(user)

      const { password: _, ...userWithoutPass } = user

      const token = this.generateJWT({ id: user.id })
      return {
        ...userWithoutPass,
        token
      }
    } catch (error) {
      handleException(error, this.logger)
    }
  }

  async login(loginUser: LoginUserDto) {
    const { email, password } = loginUser
    const user = await this.userRepository.findOne({
      where: {
        email
      },
      select: { email: true, password: true, id: true }
    })

    if (!user) throw new BadRequestException(`email or password are incorrect`)

    const validatePassword = bcrypt.compareSync(password, user.password)

    if (!validatePassword) throw new BadRequestException(`email or password are incorrect`)

    return {
      ...user,
      token: this.generateJWT({ id: user.id })
    }

  }

  private generateJWT(payload: JWTpayload) {
    return this.jwtService.sign(payload)
  }

  // TODO: Improve this, allow to look for little parts 
  async findOne(term: string) {
    let user: User | null = null;

    if (isUUID(term)) user = await this.userRepository.findOneBy({ id: term });
    else {
      const queryBuilder = this.userRepository.createQueryBuilder();
      user = await queryBuilder
        .where("name=:name or last_name=:last_name or email=:email", {
          name: term.toLowerCase().trim(),
          last_name: term.toLowerCase().trim(),
          email: term.trim()
        })
        .getOne()
    }

    if (!user) throw new NotFoundException(`user with id: ${term}, not found`)
    if (user.deletedAt) throw new BadRequestException(`user with id: ${term}, is not inactive.`)

    return user;
  }

  checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.generateJWT({ id: user.id })
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto
    })

    if(!user) throw new NotFoundException(`user with id: ${id} does not exits.`)

    await this.userRepository.save(user)

    return user
  }

}
