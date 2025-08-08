import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreItemDto } from './dto/create-store-item.dto';
import { UpdateStoreItemDto } from './dto/update-store-item.dto';
import { FilterStoreItemsDto } from './dto/filter-store-items.dto';
import { AdminJwtAuthGuard } from 'src/auth/jwt/admin-jwt.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';



@Controller('store/items')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}


  @Get()
  @UseGuards(AdminJwtAuthGuard || JwtAuthGuard)
  getAll(@Query() filter: FilterStoreItemsDto) {
    return this.storeService.getItems(filter);
  }

  @Get(':id')
  @UseGuards(AdminJwtAuthGuard || JwtAuthGuard)
  getOne(@Param('id') id: string) {
    return this.storeService.getItemById(id);
  }

  @Post()
  @UseGuards(AdminJwtAuthGuard)
  create(@Body() dto: CreateStoreItemDto) {
    return this.storeService.createItem(dto);
  }

  @Patch(':id')
  @UseGuards(AdminJwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateStoreItemDto) {
    return this.storeService.updateItem(id, dto);
  }

  @Delete(':id')
  @UseGuards(AdminJwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.storeService.deleteItem(id);
  }
}
