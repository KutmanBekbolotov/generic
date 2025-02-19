import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './user.entity';
import { Roles } from '../Auth/roles.decorator';
import { RolesGuard } from '../Auth/roles.guard';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async createUser(
    @Body() { email, password, role }: { email: string; password: string; role: UserRole },
  ) {
    return this.usersService.create(email, password, role);
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
