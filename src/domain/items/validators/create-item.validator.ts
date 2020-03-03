import { IsString, IsNumber } from 'class-validator';
export class CreateItemValidator {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber({ maxDecimalPlaces: 0 })
    amount: number;
}