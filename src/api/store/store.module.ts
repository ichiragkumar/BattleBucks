import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    PrismaModule,
    CacheModule.register(),
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
