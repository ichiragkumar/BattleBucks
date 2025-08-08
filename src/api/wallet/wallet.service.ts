import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class WalletService {

    constructor(
        private readonly prisma: PrismaService,
    ) { }


    async getUserBalance(userId: string) {
        return await this.prisma.wallet.findUnique({
            where: {
                userId: userId
            },
            select: {
                gems: true
            }
        });
    }

    async getAllUsersWallet() {
        return await this.prisma.wallet.findMany();
    }

   
    async getUserWalletById(id: string) {
        return await this.prisma.wallet.findUnique({
            where: {
                id: id
            },
            select: {
                gems: true
            }
        });
    }

    async addBalanceToUserWallet(userId: string, amount: number) {
        return await this.prisma.wallet.update({
            where: {
                userId: userId
            },
            data: {
                gems: {
                    increment: +amount
                }
            }
        });
    }

    async removeBalanceFromUserWallet(userId: string, amount: number) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new BadRequestException(
        "Amount to remove must be a positive number.",
      );
    }
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
      select: { id: true, gems: true },
    });

    if (!wallet) {
      throw new NotFoundException(`Wallet not found for user ID: ${userId}`);
    }
    const newGems = wallet.gems - amount;
    const finalGems = Math.max(0, newGems);
    return await this.prisma.wallet.update({
      where: {
        userId: userId,
      },
      data: {
        gems: finalGems,
      },
    });
  }

    async getUserWalletBalanceHistory(userId: string) {
        return await this.prisma.wallet.findUnique({
            where: {
                userId: userId
            },
            select: {
                gems: true
            }
        });
    }
s
}