import { IsString, IsNumber, IsIn, IsOptional } from 'class-validator';
import { Rent } from '../../../infraestructure/adapters/models/rent.model';
export class CreateRentValidator {
    @IsNumber()
    @IsOptional()
    itemId: number;

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsString()
    @IsOptional()
    fromDate: any;

    @IsString()
    @IsOptional()
    toDate: any;

    @IsIn([Rent.RENT, Rent.RETURNED])
    @IsOptional()
    status: string;
}