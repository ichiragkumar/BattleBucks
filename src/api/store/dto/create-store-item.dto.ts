import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { DeliveryType, ItemType } from 'src/utils/enum';

export class CreateStoreItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(ItemType)
  type: ItemType;

  @IsEnum(DeliveryType)
  deliveryType: DeliveryType;

  @IsInt()
  price: number;

  @IsBoolean()
  @IsOptional()
  isConsumable?: boolean = false;
}
