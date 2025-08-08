// src/api/store/dto/filter-store-items.dto.ts

import { IsEnum, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { DeliveryType, ItemType } from 'src/utils/enum';


export class FilterStoreItemsDto {
  @IsEnum(ItemType)
  @IsOptional()
  type?: ItemType;

  @IsEnum(DeliveryType)
  @IsOptional()
  deliveryType?: DeliveryType;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isConsumable?: boolean;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  minPrice?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  maxPrice?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
}
