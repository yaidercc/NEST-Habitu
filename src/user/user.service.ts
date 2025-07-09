import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/login-user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { LoginUserDto } from './dto/update-user copy';
import { JwtStrategy } from './strategies/jwt-strategies';
import { JwtService } from "@nestjs/jwt"
import { JWTpayload } from './strategies/interfaces/jwt-interfaces';

@Injectable()
export class UserService {
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
      throw new InternalServerErrorException(error)
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

    const token = this.generateJWT({ id: user.id })
    console.log(token)
    return {
      ...user,
      token
    }

  }

  private generateJWT(payload: JWTpayload) {
    return this.jwtService.sign(payload)
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
