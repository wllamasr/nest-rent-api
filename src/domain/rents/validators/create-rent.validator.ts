import { IsString, IsNumber, IsIn, IsOptional } from 'class-validator';
import { Rent } from 'src/infraestructure/adapters/models/rent.model';
export class CreateRentValidator {
    @IsNumber()
    @IsOptional()
    item_id: number;

    @IsNumber()
    @IsOptional()
    user_id: number;

    @IsString()
    @IsOptional()
    from_date: any;

    @IsString()
    @IsOptional()
    to_date: any;

    @IsIn([Rent.RENT, Rent.RETURNED])
    @IsOptional()
    status: string;
}