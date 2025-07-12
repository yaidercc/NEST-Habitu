import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/update-user copy';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUser: LoginUserDto) {
    return this.userService.login(loginUser);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.userService.findOne(term);
  }

}
