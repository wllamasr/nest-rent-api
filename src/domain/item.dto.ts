import { IsString, IsNumber } from 'class-validator';
export class ItemDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber({ maxDecimalPlaces: 0 })
    amount: number;
}