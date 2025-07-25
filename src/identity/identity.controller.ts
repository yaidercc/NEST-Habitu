import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { CreateIdentityDto } from './dto/create-identity.dto';
import { UpdateIdentityDto } from './dto/update-identity.dto';
import { Auth, GetUser } from 'src/user/decorators';
import { User } from 'src/user/entities/user.entity';

@Auth()
@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) { }

  @Post()
  create(
    @Body() createIdentityDto: CreateIdentityDto,
    @GetUser() user: User
  ) {
    return this.identityService.create(createIdentityDto, user);
  }

  @Get()
  findAll() {
    return this.identityService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.identityService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdentityDto: UpdateIdentityDto) {
    return this.identityService.update(+id, updateIdentityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.identityService.remove(+id);
  }
}
