import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';  
import { AuthService } from './auth.service';
import { LoginDto } from './DTO/auth.dto';  
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login to the application' })  
  @ApiBody({ type: LoginDto })  
  @ApiResponse({ status: 201, description: 'Successfully logged in' })  
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }
}
