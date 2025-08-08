import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}


  @Get()
  @UseGuards(JwtAuthGuard)
  getAllItems(@CurrentUser() user: any) {
    return this.inventoryService.getUserInventory(user.userId);
  }

  @Get(':itemId')
  getItem(@Param('itemId') itemId: string, @CurrentUser() user: any) {
    return this.inventoryService.getInventoryItem(user.userId, itemId);
  }

  @Post('use/:itemId')
  useItem(@Param('itemId') itemId: string, @CurrentUser() user: any) {
    return this.inventoryService.useItem(user.userId, itemId);
  }
}
