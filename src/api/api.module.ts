import { Module } from '@nestjs/common';


import { WalletModule } from './wallet/wallet.module';
import { StoreModule } from './store/store.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    WalletModule,
    StoreModule,
    InventoryModule,
  ],
})
export class ApiModule {}
