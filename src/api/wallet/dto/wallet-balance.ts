import { IsNumber, IsNotEmpty, Min } from "class-validator";

export class DtoWalletBalance {
  @IsNotEmpty({ message: "Amount is required." })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "Amount must be a valid number." },
  )
  @Min(0, { message: "Amount cannot be negative." })
  amount: number;
}