import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { USER_STATUS } from 'src/utils/enum';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error('User already exists');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      });
      return this.generateTokens(user.id, user.email);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user.id, user.email);
  }

  generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_SECRET || 'refreshsecret',
      }),
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        displayName: dto.displayName,
        discordLink: dto.discordLink,
        twitterLink: dto.twitterLink,
      },
    });
  }

  async accountStatus (userId: string, status : USER_STATUS) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        status : status,
      },
    });
  }

  getUserProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        discordLink: true,
        twitterLink: true,
        status: true,
      },
    });
  }


  getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        displayName: true,
        discordLink: true,
        twitterLink: true,
        status: true,
      },
    });
  }


  async deleteAccount(userId: string) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
