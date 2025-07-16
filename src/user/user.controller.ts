import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user';
import { Auth, GetUser } from './decorators';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get("check-auth-status")
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.userService.checkAuthStatus(user);
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto
  ) {
    return this.userService.update(id, user);
  }

}
