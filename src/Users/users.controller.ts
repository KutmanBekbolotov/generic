import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './user.entity';
import { Roles } from '../Auth/roles.decorator';
import { RolesGuard } from '../Auth/roles.guard';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { CreateUserDto } from './DTO/createuser.dto';  

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async createUser(@Body() createUserDto: CreateUserDto) {  
    return this.usersService.create(createUserDto); 
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
