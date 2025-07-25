import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitLogService } from './habit-log.service';
import { CreateHabitLogDto } from './dto/create-habit-log.dto';
import { UpdateHabitLogDto } from './dto/update-habit-log.dto';
import { Auth, GetUser } from 'src/user/decorators';
import { User } from 'src/user/entities/user.entity';

@Auth()
@Controller('habit-log')
export class HabitLogController {
  constructor(private readonly habitLogService: HabitLogService) { }

  @Post()
  create(
    @Body() createHabitLogDto: CreateHabitLogDto,
    @GetUser() user: User
  ) {
    return this.habitLogService.create(createHabitLogDto, user);
  }

  @Get()
  findAll() {
    return this.habitLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitLogService.findAllBy(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitLogDto: UpdateHabitLogDto) {
    return this.habitLogService.update(+id, updateHabitLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitLogService.remove(+id);
  }
}
