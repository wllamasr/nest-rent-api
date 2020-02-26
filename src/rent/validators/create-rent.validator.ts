import { IsString, IsNumber, IsDate, MinDate, IsDateString } from 'class-validator';
export class CreateRentValidator {
    @IsNumber()
    item_id: number;

    @IsNumber()
    user_id: number;

    // @IsDateString()
    // @MinDate(new Date)
    from_date: any;

    // @IsDate()
    to_date: any;
}