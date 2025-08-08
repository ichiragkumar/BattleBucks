import { Module } from '@nestjs/common';


import { WalletModule } from './wallet/wallet.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    WalletModule,
    StoreModule,
  ],
})
export class ApiModule {}
