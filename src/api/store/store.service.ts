import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cache } from 'cache-manager';
import { CreateStoreItemDto } from './dto/create-store-item.dto';
import { UpdateStoreItemDto } from './dto/update-store-item.dto';
import { FilterStoreItemsDto } from './dto/filter-store-items.dto';

@Injectable()
export class StoreService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getItems(filter: FilterStoreItemsDto) {
    const { page = 1, limit = 10, ...whereFilters } = filter;
    const skip = (page - 1) * limit;

    const cacheKey = `store_items:${JSON.stringify(filter)}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const where: any = {};
    if (whereFilters.type) where.type = whereFilters.type;
    if (whereFilters.deliveryType) where.deliveryType = whereFilters.deliveryType;
    if (whereFilters.isConsumable !== undefined) where.isConsumable = whereFilters.isConsumable;
    if (whereFilters.minPrice || whereFilters.maxPrice) {
      where.price = {};
      if (whereFilters.minPrice !== undefined) where.price.gte = whereFilters.minPrice;
      if (whereFilters.maxPrice !== undefined) where.price.lte = whereFilters.maxPrice;
    }

    const [items, total] = await Promise.all([
      this.prisma.storeItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.storeItem.count({ where }),
    ]);

    const result = { items, total, page, limit };
    await this.cacheManager.set(cacheKey, result, 60);
    return result;
  }

  async getItemById(id: string) {
    const item = await this.prisma.storeItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Store item not found');
    return item;
  }

  async createItem(data: CreateStoreItemDto) {
    return this.prisma.storeItem.create({ data });
  }

  async updateItem(id: string, data: UpdateStoreItemDto) {
    return this.prisma.storeItem.update({ where: { id }, data });
  }

  async deleteItem(id: string) {
    return this.prisma.storeItem.delete({ where: { id } });
  }
}
