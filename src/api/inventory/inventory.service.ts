import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getUserInventory(userId: string) {
    return this.prisma.inventoryItem.findMany({
      where: { userId, isInventoryActive: true },
      include: { item: true },
    });
  }

  async getInventoryItem(userId: string, itemId: string) {
    const item = await this.prisma.inventoryItem.findUnique({
      where: { userId_itemId: { userId, itemId } },
      include: { item: true },
    });
    if (!item) throw new NotFoundException('Inventory item not found');
    return item;
  }

  async useItem(userId: string, itemId: string) {
    const inventory = await this.prisma.inventoryItem.findUnique({
      where: { userId_itemId: { userId, itemId } },
      include: { item: true },
    });

    if (!inventory || !inventory.isInventoryActive) {
      throw new NotFoundException('Item not found in inventory');
    }

    if (!inventory.item.isConsumable) {
      throw new ForbiddenException('This item is not consumable');
    }

    return this.prisma.inventoryItem.update({
      where: { userId_itemId: { userId, itemId } },
      data: { isInventoryActive: false },
    });
  }
}
