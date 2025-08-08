import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AdminJwtAuthGuard } from "src/auth/jwt/admin-jwt.guard";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { WalletService } from "./wallet.service";
import { DtoWalletBalance } from "./dto/wallet-balance";


@Controller('wallet')
export class WalletController {

    constructor(
        private readonly walletService: WalletService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('balance')
    getUserBalance(@CurrentUser() user: any) {
        return this.walletService.getUserBalance(user.userId);
    }

    @UseGuards(AdminJwtAuthGuard)
    @Get('wallet')
    getAllUserWallet() {
        return this.walletService.getAllUsersWallet();
    }

    @Get('wallet/:id')
    getUserWalletById(@Param('id') id: string) {
        return this.walletService.getUserWalletById(id);
    }

    @UseGuards(AdminJwtAuthGuard)
    @Get('wallet/:id/add')
    addBalanceToUserWallet(@Param('id') id: string, @Body() body: DtoWalletBalance) {
        return this.walletService.addBalanceToUserWallet(id,body.amount);
    }

    @UseGuards(AdminJwtAuthGuard)
    @Get('wallet/:id/remove')
    removeBalanceFromUserWallet(@Param('id') id: string, @Body() body : DtoWalletBalance) {
        return this.walletService.removeBalanceFromUserWallet(id, body.amount);
    }

    @UseGuards(AdminJwtAuthGuard || JwtAuthGuard)
    @Get('wallet/:id/transactions')
    getUserWalletBalanceHistory(@Param('id') id: string) {
        return this.walletService.getUserWalletBalanceHistory(id);
    }

}