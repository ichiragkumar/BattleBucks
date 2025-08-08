import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus, 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { AdminJwtAuthGuard } from './jwt/admin-jwt.guard';
import { USER_STATUS } from 'src/utils/enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) 
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) // Return 200 OK
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getCurrentUserProfile(@CurrentUser() user: any) {
    return this.authService.getUserProfile(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @HttpCode(HttpStatus.OK)
  updateCurrentUserProfile(@CurrentUser() user: any, @Body() dto: UpdateProfileDto) {
    return this.authService.updateProfile(user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile/deactivate')
  @HttpCode(HttpStatus.OK)
  deactivateCurrentUserAccount(@CurrentUser() user: any) {
    return this.authService.accountStatus(user.userId, USER_STATUS.INACTIVE);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile/delete') 
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCurrentUserAccount(@CurrentUser() user: any) {
    return this.authService.accountStatus(user.userId, USER_STATUS.DELETED);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('users')
  @HttpCode(HttpStatus.OK)
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: string) {
    return this.authService.getUserProfile(id);
  }

  
  @UseGuards(AdminJwtAuthGuard)
  @Post('users/:id/ban')
  @HttpCode(HttpStatus.OK)
  banUser(@Param('id') id: string) {
    return this.authService.accountStatus(id, USER_STATUS.BANNED);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Post('users/:id/activate')
  @HttpCode(HttpStatus.OK)
  activateUser(@Param('id') id: string) {
    return this.authService.accountStatus(id, USER_STATUS.ACTIVE);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Delete('users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  hardDeleteUserByAdmin(@Param('id') id: string) {
    return this.authService.accountStatus(id, USER_STATUS.DELETED);
  }
}