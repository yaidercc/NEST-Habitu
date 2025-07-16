import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitLogService } from './habit-log.service';
import { CreateHabitLogDto } from './dto/create-habit-log.dto';
import { UpdateHabitLogDto } from './dto/update-habit-log.dto';

@Controller('habit-log')
export class HabitLogController {
  constructor(private readonly habitLogService: HabitLogService) {}

  @Post()
  create(@Body() createHabitLogDto: CreateHabitLogDto) {
    return this.habitLogService.create(createHabitLogDto);
  }

  @Get()
  findAll() {
    return this.habitLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitLogService.findOne(+id);
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
