import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Auth, GetUser } from 'src/user/decorators';
import { User } from 'src/user/entities/user.entity';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) { }

  @Post()
  @Auth()
  create(
    @Body() createGoalDto: CreateGoalDto,
    @GetUser() user: User

  ) {
    return this.goalService.create(createGoalDto, user);
  }

  @Get()
  findAll() {
    return this.goalService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.goalService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalService.update(+id, updateGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalService.remove(+id);
  }
}
